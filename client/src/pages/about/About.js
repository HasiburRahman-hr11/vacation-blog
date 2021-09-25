import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Slide';

import RecentPosts from '../../components/recentPosts/RecentPosts';
import './about.css';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';


const About = () => {
    const [recentPosts, setRecentPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')


    useEffect(() => {
        const fetchRecentPosts = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get('/api/posts/recent');
                setRecentPosts(data);
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false)
                setError('An Error Occurred.')
            }
        }
        fetchRecentPosts();
    }, [])

    return (
        <>
            {loading ? (
                <Loading />
            ) : error ? (
                <Error message={error} />
            ) : (
                <>
                    <Helmet>
                        <title>About | Vacation MERN Application</title>
                    </Helmet>
                    <div className="about_wrapper">
                        <div className="hero_top about_section">
                            <div className="container">
                                <Fade top>
                                    <div className="hero_content">
                                        <h1 className="hero_title big_title">A few words about me</h1>
                                        <p className="hero_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.</p>
                                    </div>
                                </Fade>
                            </div>
                        </div>

                        <div className="hero_bottom about_section">
                            <div className="about_hero_images">
                                <div className="container">
                                    <div className="row g-4">
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <Slide left>
                                                <img src="/images/about-1.jpg" alt="About Me" className="about_hero_img" />
                                            </Slide>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <Slide right>
                                                <img src="/images/about-2.jpg" className="about_hero_img" alt="About Me" />
                                            </Slide>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="hero_bg"></div>
                        </div>

                        <div className="about_info about_section">
                            <div className="container">
                                <div className="about_info_wrapper">
                                    <Fade bottom>
                                        <div className="about_info_content">
                                            <h2 className="about_info_title section_title">Traveling is my passion</h2>
                                            <div className="about_info_desc">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.</p>
                                                <br />
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.</p>
                                            </div>
                                        </div>
                                    </Fade>
                                </div>
                            </div>
                        </div>

                        <div className="about_image about_section">
                            <div className="container">
                                <Fade bottom>
                                    <img src="/images/about-big.jpg" alt="About" className="about_big_img" />
                                </Fade>
                            </div>
                        </div>

                        <div className="about_info about_section">
                            <div className="container">
                                <div className="about_info_wrapper">
                                    <Fade bottom>
                                        <div className="about_info_content">
                                            <h2 className="about_info_title section_title">Traveling is my passion</h2>
                                            <div className="about_info_desc">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.</p>
                                                <br />
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.</p>
                                            </div>
                                        </div>
                                    </Fade>
                                </div>
                            </div>
                        </div>

                        <RecentPosts posts={recentPosts} />
                    </div>
                </>
            )}

        </>
    );
};

export default About;