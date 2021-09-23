import { Helmet } from 'react-helmet';
import ContactForm from '../../components/contactForm/ContactForm';
import './contact.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

const Contact = () => {
    const { user } = useContext(AuthContext);
    return (
        <>
            <Helmet>
                <title>Contact | Vacation MERN Application</title>
            </Helmet>
            <div className="contact_wrapper">
                <div className="hero_top contact_section">
                    <div className="container">
                        <div className="hero_content">
                            <h1 className="hero_title big_title">I'm looking forward to finally meet you</h1>
                            <p className="hero_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.</p>
                        </div>
                    </div>
                </div>
                <div className="hero_bottom contact_section">
                    <div className="container">
                        <div className="contact_hero_image">
                            <img src="/images/contact.jpg" alt="" />
                        </div>
                    </div>
                    <div className="hero_bg"></div>
                </div>

                <div className="contact_info contact_section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12 contact_info_left">
                                <div className="contact_info_content">
                                    <h2 className="section_title contact_info_title">Let's get in touch</h2>
                                    <p className="contact_info_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.</p>

                                    <div className="contact_info_links">
                                        {user?.phone && (
                                            <p className="contact_link_item">
                                                Phone: <span>{user?.phone}</span>
                                            </p>
                                        )}
                                        {user?.email && (
                                            <p className="contact_link_item">
                                                Email: <a href="mailto:exmple@gmail.com" >{user?.email}</a>
                                            </p>
                                        )}


                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 contact_info_right">
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;