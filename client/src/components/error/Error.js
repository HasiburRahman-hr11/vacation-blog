import React from 'react';

const Error = ({ message }) => {
    return (
        <div className="error_page d-flex align-items-center justify-content-center">
            <div className="py-5">
                <h2 >{message}</h2>
                <p className="text-center">
                    <span
                        className="button primary_btn link_btn"
                        onClick={() => window.location.reload()}
                    >Refresh</span>
                </p>
            </div>
        </div>
    );
};

export default Error;