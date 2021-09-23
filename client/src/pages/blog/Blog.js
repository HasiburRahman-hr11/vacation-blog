import { Helmet } from 'react-helmet';

import './blog.css';
import Post from '../../components/post/Post';
import Pagination from '../../components/pagination/Pagination';
import Loading from '../../components/loading/Loading';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import Error from '../../components/error/Error';

const Blog = () => {
    const params = useParams();
    const pageNumber = params.pageNumber || 1;

    const [posts , setPosts] = useState([]);
    const [loading , setLoading] = useState(false);
    const [error , setError] = useState('');
    const [currentPage , setCurrentPage] = useState(pageNumber);
    const [totalPages , setTotalPages] = useState(1);
    const [limit , setLimit] = useState(12);

   
    

    useEffect(()=>{
        const fetchPosts = async()=>{
            try {
                setLoading(true)
                const {data} = await axios.get(`/api/posts?page=${currentPage}&limit=${limit}`);
                setPosts(data.posts.sort((a,b) => new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1))
                setTotalPages(data.totalPage);

                setLoading(false);
            } catch (error) {
                console.log(error);
                setError('An Error Occurred.')
                setLoading(false);
            }
        }
        fetchPosts();
    },[currentPage , limit]);

    return (
        <>
            <Helmet>
                <title>Blog | Vacation MERN Application</title>
            </Helmet>
            {loading ? (
                <div>
                    <Loading />
                </div>
            ) : error ? (
               <Error message={error} />
            ) : (
                <>
                    <div className="blog_hero">
                        <div className="blog_hero_wrapper">
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-12 blog_hero_left d-flex align-items-center justify-content-center">
                                    <h1 className="blog_hero_title big_title">Explore all Vacation blogs</h1>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 blog_hero_right">
                                    <div className="blog_hero_image">
                                        <img src="/images/blog-hero.jpg" alt="Hero Poster" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="blog_posts">
                        <div className="blog_posts_wrapper">
                            <div className="container">
                                <div className="section_header">
                                    <h2 className="section_title">Blog Posts</h2>
                                </div>
                                <div className="row gx-4 gy-5">
                                    {posts?.map(post => (
                                        <Post key={post._id} col="3" post={post} />
                                    ))}
                                </div>

                                {totalPages && totalPages > 1 && <Pagination total={totalPages} page={currentPage} changePage={setCurrentPage} />}

                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Blog;