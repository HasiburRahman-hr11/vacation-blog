/* eslint-disable jsx-a11y/anchor-is-valid */
import './footer.css';
import {Facebook , Twitter , Instagram , YouTube} from '@material-ui/icons';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer" id="footer">
            <div className="footer_wrapper">
                <div className="footer_top">
                    <div className="container">
                        <div className="footer_top_content">
                            <h2 className="section_title footer_top_title">Want to receive emails?</h2>
                            <p className="footer_top_text">Sign up to get an email every time a new blog is published.</p>
                            <div className="footer_form_wrapper">
                                <form action="" className="footer_form d-flex align-items-center justify-content-center">
                                    <div className="footer_input_wrapper">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="footer_input"
                                            placeholder="Email Address"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="button primary_btn">Subscribe</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer_bottom">
                    <div className="container">
                        <div className="row g-sm-4">
                            <div className="col-md-6 col-sm-12">
                                <Link to="/" href="#" className="footer_logo">
                                    <img src="/images/logo.svg" alt="Logo" />
                                </Link>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="footer_social">
                                    <ul className="social_links d-flex align-items-center">
                                        <li>
                                            <a href="#">
                                                <Facebook className="footer_social_icon" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <Twitter className="footer_social_icon" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <Instagram className="footer_social_icon" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <YouTube className="footer_social_icon" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;