import './trending.css';
import Post from '../post/Post';
import { Link } from 'react-router-dom';
import Slide from 'react-reveal/Slide';


const Trending = ({ posts }) => {


    return (
        <div className="home_section trend_posts_section">
            <div className="trend_posts_wrapper">
                <div className="container">
                    <div className="section_header d-flex justify-content-between align-items-center">
                        <Slide left>
                            <h2 className="section_title">Trending Posts</h2>
                        </Slide>
                        <div className="section_link">
                            <Slide right>
                                <Link to="/blog" className="button secondary_btn link_btn">View All Posts</Link>
                            </Slide>
                        </div>
                    </div>
                    <div className="row g-lg-5">
                        {posts.map(post => (
                            <Post key={post._id} col="2" post={post} />
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Trending;