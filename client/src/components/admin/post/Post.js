import './post.css'
import { Edit, Delete } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle';
import axios from 'axios';

const Post = ({ post, reRender }) => {


    const handleDelete = async () => {
        try {
            await axios.delete(`/api/posts/delete/${post._id}`);
        } catch (error) {
            console.log(error);
        }

        reRender();
    }
    return (
        <li key={post._id} className="admin_post_item d-flex align-items-center mb-3">
            {post?.thumbnail && (
                <div className="admin_post_img me-3">
                    <Link to={`/post/${post._id}`}>
                        <img src={post?.thumbnail} alt="" />
                    </Link>
                </div>
            )}
            <div className="admin_post_details">
                <Link to={`/post/${post._id}`}>
                    <h5 className="admin_post_title">{post?.title}</h5>
                </Link>
                <p className="admin_post_meta mb-0">{new Date(post?.createdAt).toDateString()}</p>
            </div>
            <div className="admin_post_action ms-auto d-flex align-items-center">
                <Link to={`/admin/dashboard/post/edit/${post._id}`}>
                    <Edit className="admin_post_icon" />
                </Link>
                <span data-bs-toggle="modal" data-bs-target="#deleteModal">
                    < Delete className="admin_post_icon" />
                </span>
            </div>


            {/*  Modal  */}
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-center">
                            <h3>Confirm Delete?</h3>
                        </div>
                        <div className="modal-footer justify-content-center">
                            <button type="button" className="button primary_btn" data-bs-dismiss="modal" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default Post;