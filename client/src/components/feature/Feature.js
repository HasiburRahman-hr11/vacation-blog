import { Link } from 'react-router-dom';
import './feature.css';
import Slide from 'react-reveal/Slide'
import ReactHtmlParser from 'react-html-parser'

const Feature = ({ post }) => {

    return (
        <div className="feature">
            <div className="feature_wrapper">
                <div className="container">
                    <div className="row featured_row">
                        <div className="col-lg-6 col-md-12 featured_left">
                            <div className="feature_content">
                                <div className="feature_tagline">Featured Post</div>
                                <Slide top>
                                    <h1 className="feature_title big_title elipsis">{post?.title}</h1>
                                </Slide>
                                <div className="featured_desc elipsis">{ReactHtmlParser(post?.description?.substr(0, 200))}</div>

                                <Link to={`/post/${post?._id}`} className="button primary_btn link_btn">Read More</Link>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 featured_right">
                            <div className="feature_right">
                                <div className="feature_image_wrapper">
                                    <img src={post?.thumbnail} alt="Feature" className="feature_image" />
                                </div>
                                <div className="feature_badge">
                                    <Slide bottom>
                                        <img src="/images/badge.svg" alt="Vacation Badge" />
                                    </Slide>
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