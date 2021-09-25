import { Link } from 'react-router-dom';
import './feature.css';
import Fade from 'react-reveal/Fade';

const Feature = ({ post }) => {

    return (
        <div className="feature">
            <div className="feature_wrapper">
                <div className="container">
                    <div className="row featured_row">
                        <div className="col-lg-6 col-md-12 featured_left">
                            <div className="feature_content">
                                <div className="feature_tagline">Featured Post</div>
                                <Fade top>
                                    <h1 className="feature_title big_title">{post?.title}</h1>
                                </Fade>
                                <p className="featured_desc">{post?.description?.substr(0, 200)}</p>

                                <Link to={`/post/${post?._id}`} className="button primary_btn link_btn">Read More</Link>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 featured_right">
                            <div className="feature_right">
                                <div className="feature_image_wrapper">
                                    <img src={post?.thumbnail} alt="Feature" className="feature_image" />
                                </div>
                                <div className="feature_badge">
                                    <Fade bottom>
                                        <img src="/images/badge.svg" alt="Vacation Badge" />
                                    </Fade>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <img
                src="/images/pattern-left.svg"
                alt="Pattern"
                className="feature_pattern pattern_left"
            />
            <img
                src="/images/pattern-right.svg"
                alt="Pattern"
                className="feature_pattern pattern_right"
            />
        </div>
    );
};

export default Feature;