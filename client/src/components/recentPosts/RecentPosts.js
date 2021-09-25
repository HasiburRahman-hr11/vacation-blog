import './recent-posts.css';
import Post from '../post/Post';
import { Link } from 'react-router-dom';
import Slide from 'react-reveal/Slide';

const RecentPosts = ({ posts }) => {
    return (
        <div className="home_section recent_posts_section">
            <div className="recent_posts_wrapper">
                <div className="container">
                    <div className="section_header d-flex justify-content-between align-items-center">
                        <Slide left>
                            <h2 className="section_title">Recent Posts</h2>
                        </Slide>

                        <div className="section_link">
                            <Slide right>
                                <Link to="/blog" className="button secondary_btn link_btn">View All Posts</Link>
                            </Slide>
                        </div>
                    </div>
                    <div className="row gx-3 g-xl-5 g-md-5 g-sm-5">
                        {posts.slice(0, 3).map(post => (
                            <Post key={post._id} col="3" post={post} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecentPosts;