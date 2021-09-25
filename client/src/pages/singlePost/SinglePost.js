import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser'
import './single-post.css';
import axios from 'axios';
import Loading from '../../components/loading/Loading';

const SinglePost = () => {
    const [loading, setLoading] = useState(false)
    const [post, setPost] = useState({})

    const params = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/api/posts/${params?.id}`)
                setPost(res.data)
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        fetchPost();
    }, [params.id])
    return (
        <>
            <Helmet>
                <title> {`${post?.title ? post.title : 'Post'}`}  | Vacation MERN Application</title>
            </Helmet>
            {loading ? (
                <div>
                    <Loading />
                </div>
            ) : (
                <div className="single_wrapper pb-5">
                    <div className="hero_top single_hero_top">
                        <div className="container">
                            <div className="single_hero_content text-center">
                                <h1 className="hero_title">{post?.title}</h1>

                                <div className="single_post_meta d-flex align-items-center justify-content-center">
                                    {post?.categories?.map(category => (
                                        <Link key={category} to={`/category/${category}`} className="tag">{category}</Link>
                                    ))}
                                    <div className="post_meta_item post_date">{new Date(post?.createdAt).toDateString()}</div>
                                    <div className="post_meta_divider">.</div>
                                    <div className="post_meta_item post_readTime">{post?.readTime}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hero_bottom single_hero_bottom">
                        <div className="container">
                            <div className="single_hero_image">
                                <img src={post?.thumbnail} alt="" />
                            </div>
                        </div>
                        <div className="hero_bg"></div>
                    </div>


                    <div className="single_content mt-5">
                        <div className="container">
                            <div className="single-content_wrapper">
                            { ReactHtmlParser(post?.description) }
                                {/* <p>{post?.description}</p> */}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SinglePost;