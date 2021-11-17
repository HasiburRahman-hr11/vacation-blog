/* eslint-disable no-multi-str */
import { Helmet } from 'react-helmet';
import axios from 'axios';
import './create-post.css';
import Sidebar from '../../components/admin/sidebar/Sidebar';
import { Image } from '@material-ui/icons';
import { CircularProgress } from '@material-ui/core';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { Editor } from '@tinymce/tinymce-react';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [loading, setLoading] = useState(false)

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
            await axios.post('/api/posts/create', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }

        console.log(description)

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
                                    {/* <textarea
                                        name="description"
                                        className="post_input"
                                        placeholder="Post Description"
                                        required
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea> */}
                                    <Editor
                                        name="description"
                                        className="post_input"
                                        placeholder="Post Description"
                                        required
                                        value={description}
                                        onEditorChange={(content) => setDescription(content)}
                                        init={{
                                            height: 300,
                                            automatic_uploads: true,
                                            relative_urls: false,
                                            images_upload_url: '/uploads',
                                            plugins: [
                                                'advlist autolink lists link image charmap print preview anchor',
                                                'searchreplace visualblocks code fullscreen',
                                                'insertdatetime media table paste code help wordcount'
                                            ],
                                            toolbar:
                                                'undo redo | formatselect | bold italic backcolor | \
                      alignleft aligncenter alignright alignjustify | \
                      bullist numlist outdent indent | removeformat',
                                            file_picker_callback: function (callback, value, meta) {
                                                // Provide file and text for the link dialog
                                                if (meta.filetype === 'file') {
                                                    callback('mypage.html', { text: 'My text' });
                                                }

                                                // Provide image and alt text for the image dialog
                                                if (meta.filetype === 'image') {
                                                    callback('myimage.jpg', { alt: 'My alt text' });
                                                }

                                                // Provide alternative source and posted for the media dialog
                                                if (meta.filetype === 'media') {
                                                    callback('movie.mp4', { source2: 'alt.ogg', poster: 'image.jpg' });
                                                }
                                            },
                                            images_upload_handler: function (blobInfo, success, failure) {

                                                let headers = new Headers();

                                                headers.append('Accept', 'Application/JSON');

                                                let formData = new FormData()

                                                formData.append('post-image', blobInfo.blob(), blobInfo.filename());

                                                let req = new Request('/api/uploads/postimage', {
                                                    method: 'POST',
                                                    headers,
                                                    mode: 'cors',
                                                    body: formData
                                                })

                                                fetch(req)
                                                    .then(res => res.json())
                                                    .then(data => success(data.imgUrl))
                                                    .catch(() => failure('HTTP Error!'))
                                            },
                                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
                                        }}
                                    />
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
                                    <label className="file_label w-100" htmlFor="thumbnail"><Image /> {thumbnail ? thumbnail.name : 'Post Thumbnail'}</label>
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