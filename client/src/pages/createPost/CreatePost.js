import { Helmet } from 'react-helmet';
import axios from 'axios';
import './create-post.css';
import Sidebar from '../../components/admin/sidebar/Sidebar';
import { Image } from '@material-ui/icons';
import { CircularProgress } from '@material-ui/core';
import { useState } from 'react';
import { useHistory } from 'react-router';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [loading , setLoading] = useState(false)

    const history = useHistory()

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('categories', categories);
    formData.append('thumbnail', thumbnail);

    const submitHandle = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            await axios.post('/api/posts/create' , formData , { headers: { 'Content-Type': 'multipart/form-data' } });
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }

        setTitle('');
        setDescription('');
        setCategories('');
        setThumbnail('');
        history.push('/admin/dashboard/posts');

    }
    return (
        <>
            <Helmet>
                <title>Add New Post | Vacation MERN Application</title>
            </Helmet>

            <div className="admin">
                <Sidebar />
                <div className="admin_content">
                    <div className="create_post_wrapper">
                        <div className="create_post_content text-center">
                            <h3 className="create_post_title mb-4">Create New Post</h3>
                            <form className="create_post_form" onSubmit={submitHandle}>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Post Title"
                                        className="post_input"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <textarea
                                        name="description"
                                        className="post_input"
                                        placeholder="Post Description"
                                        required
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        name="category"
                                        placeholder="Category"
                                        className="post_input"
                                        value={categories}
                                        onChange={(e) => setCategories(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="file_label w-100" htmlFor="thumbnail"><Image /> Post Thumbnail</label>
                                    <input
                                        type="file"
                                        name="thumbnail"
                                        id="thumbnail"
                                        hidden
                                        placeholder="Post Thumbnail"
                                        className="post_input"
                                        onChange={(e) => setThumbnail(e.target.files[0])} />
                                </div>
                                <div className="mt-4">
                                    <button type="submit" className="button secondary_btn" disabled={!title || !description}>
                                        {loading ? <CircularProgress className="loading_spin" /> : 'Create Post'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreatePost;