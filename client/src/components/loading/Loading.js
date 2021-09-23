import './loading.css';

const Loading = () => {
    return (
        <div className="loading d-flex align-items-center justify-content-center">
            <div className="loading_wrapper">
                <div className="loading_content">
                    <h3 className="loaging_text">Loading...</h3>
                </div>
            </div>
        </div>
    );
};

export default Loading;