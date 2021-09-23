/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';
import './post.css';

const Post = ({ post, col }) => {
    return (
        <div className={col === '3' ? 'post_col_sm post_item col-lg-4 col-md-6 col-sm-12' : 'post_item post_col_lg col-lg-6 col-md-6 col-sm-12'}>
            <div className="post_item_wrapper">
                {post?.thumbnail && (
                    <Link to={`/post/${post._id}`} className="post_image">
                        <img src={post.thumbnail} alt="Post Thumbnail" className="post_thumbnail" />
                    </Link>
                )}
                <div className="post_tag">
                    {post.categories.map(category => (
                        <Link key={category} to={`/category/${category}`} className="tag">{category}</Link>
                    ))}
                </div>
                <Link to={`/post/${post._id}`} className="post_title">
                    <h2 >{post.title}</h2>
                </Link>
                <div className="post_meta d-flex align-items-center">
                    <div className="post_meta_item post_date">{new Date(post.createdAt).toDateString()}</div>
                    <div className="post_meta_divider">.</div>
                    <div className="post_meta_item post_readTime">{post?.readTime}</div>
                </div>
            </div>
        </div>
    );
};

export default Post;