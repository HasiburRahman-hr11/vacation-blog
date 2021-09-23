import { Helmet } from 'react-helmet';
import '../createPost/create-post.css';
import Sidebar from '../../components/admin/sidebar/Sidebar';
import { Image } from '@material-ui/icons';
import { useHistory } from 'react-router';
import { useEffect, useState} from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Loading from '../../components/loading/Loading';
import { CircularProgress } from '@material-ui/core';



const EditPost = () => {

    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState({})
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [loadingEdit , setLoadingEdit] = useState(false)

    const params = useParams();
    const history = useHistory();
    useEffect(() => {

        const fetchPost = async () => {
            setLoading(true);
            const res = await axios.get(`/api/posts/edit/${params?.id}`)
            setPost(res.data)
            setTitle(res.data.title);
            setDescription(res.data.description);
            setCategories(res.data.categories.toString());
            setLoading(false);
        }
        fetchPost();
    }, [params.id]);



    const submitHandle = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('categories', categories);
        formData.append('thumbnail', thumbnail);

        setLoadingEdit(true);
        try {
            await axios.put(`/api/posts/update/${post._id}` , formData , { headers: { 'Content-Type': 'multipart/form-data' } });
            setLoadingEdit(false)
        } catch (error) {
            console.log(error);
            setLoadingEdit(false)
        }

        // clear form input
        setTitle('');
        setDescription('');
        setCategories('');
        setThumbnail('');
        history.push('/admin/dashboard/posts');

    }

    return (
        <>
            <Helmet>
                <title>Edit - {title} | Vacation MERN Application</title>
            </Helmet>
            {
                loading ? (
                    <div>
                        <Loading />
                    </div>
                ) : (
                    <div className="admin">
                        <Sidebar />
                        <div className="admin_content">
                            <div className="create_post_wrapper">
                                <div className="create_post_content text-center">
                                    <h3 className="create_post_title mb-4">Edit Post</h3>
                                    <form className="create_post_form" onSubmit={submitHandle}>
                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                name="title"
                                                placeholder="Post Title"
                                                className="post_input"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <textarea
                                                name="desc"
                                                className="post_input"
                                                placeholder="Post Description"
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
                                                onChange={(e) => setCategories(e.target.value)}
                                            />
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
                                                onChange={(e) => setThumbnail(e.target.files[0])}
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <button type="submit" className="button secondary_btn">
                                                {loadingEdit ? <CircularProgress className="loading_spin" /> : 'Update Post'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default EditPost;