import { Helmet } from 'react-helmet';
import './error.css';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <>
            <Helmet>
                <title>Page Not Found | Vacation MERN Application</title>
            </Helmet>
            <div className="error_page d-flex align-items-center justify-content-center">
                <div className="error_content text-center">
                    <h2 className="error_title section_title mb-3">Page Not Found!</h2>
                    <p>The page you are looking for doesn't exist or has been moved </p>
                    <Link to="/" className="w-100 d-block mt-4 button primary_btn link_btn">Go Back To Home </Link>
                </div>
            </div>
        </>
    );
};

export default Error;