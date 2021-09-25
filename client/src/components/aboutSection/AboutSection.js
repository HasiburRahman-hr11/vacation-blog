/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';
import './about-section.css';
import RubberBand from 'react-reveal/RubberBand';
import Slide from 'react-reveal/Slide';

const AboutSection = () => {
    return (
        <div className="home_section home_about">
            <div className="about_section_wrapper">
                <div className="container">
                    <Slide bottom>
                        <div className="row">
                            <div className="col-lg-6 col-md-12 about_clm_left">
                                <div className="about_sec_content d-flex">
                                    <RubberBand>
                                        <h2 className="about_title section_title">A few words about me</h2>
                                    </RubberBand>
                                    <p className="about_desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam.</p>
                                    <Link to="/about" className="button link_btn secondary_btn">Read More</Link>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12 about_clm_right">
                                <img src="/images/about-big.jpg" alt="About Poster" />
                            </div>
                        </div>
                    </Slide>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;