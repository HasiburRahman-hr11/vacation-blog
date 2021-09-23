import { Helmet } from 'react-helmet';
import '../blog/blog.css';
import Post from '../../components/post/Post';
// import Pagination from '../../components/pagination/Pagination';
import Loading from '../../components/loading/Loading';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CatPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const params = useParams();


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true)

                const { data } = await axios.get(`/api/posts/category/${params?.catName}`);
                setPosts(data.sort((a, b) => new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1));

                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        }
        fetchPosts();
    }, [params.catName]);
    return (
        <>
            <Helmet>
                <title>{params?.catName} | Vacation MERN Application</title>
            </Helmet>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <div className="blog_hero">
                        <div className="blog_hero_wrapper">
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-12 blog_hero_left d-flex align-items-center justify-content-center">
                                    <h1 className="blog_hero_title big_title">Explore <span>{params?.catName}</span> blogs</h1>
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
                                    <h2 className="section_title">{params.catName}</h2>
                                </div>
                                <div className="row gx-4 gy-5">
                                    {posts?.map(post => (
                                        <Post key={post._id} col="3" post={post} />
                                    ))}
                                </div>

                                {/* <Pagination /> */}

                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default CatPosts;