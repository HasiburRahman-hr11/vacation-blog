import { Helmet } from 'react-helmet';
import './admin-posts.css';
import { useEffect } from 'react';
import Sidebar from '../../components/admin/sidebar/Sidebar';
import Post from '../../components/admin/post/Post';
import Loading from '../../components/loading/Loading';
import { useParams } from 'react-router';
import { useState } from 'react';
import axios from 'axios';
import Pagination from '../../components/pagination/Pagination';
import Error from '../../components/error/Error';

const AdminPosts = ({ reRender }) => {
    const params = useParams();
    const pageNumber = params.pageNumber || 1;

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(pageNumber);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(12);

    const sortAlphabetically  = (a, b) => {
        let textA = a.title.toUpperCase();
        let textB = b.title.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    }


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get(`/api/posts?page=${currentPage}&limit=${limit}`);
                setPosts(data.posts.sort(sortAlphabetically))
                setTotalPages(data.totalPage);


                setLoading(false);
            } catch (error) {
                console.log(error);
                setError('An Error Occurred.')
                setLoading(false);
            }
        }
        fetchPosts();
        reRender();
    }, [currentPage, limit, reRender]);

    return (
        <>
            <Helmet>
                <title>All Posts | Vacation MERN Application</title>
            </Helmet>
            {error ? (
                <Error message={error} />
            ) : (
                <div className="admin">
                    <Sidebar />
                    {loading ? (
                        <Loading />
                    ) : (
                        <div className="admin_posts">
                            <ul className="admin_posts_wrapper">
                                {posts.map(post => (
                                    <Post key={post._id} post={post} reRender={reRender} />
                                ))}
                            </ul>

                            {totalPages && totalPages > 1 && <Pagination total={totalPages} page={currentPage} changePage={setCurrentPage} />}

                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default AdminPosts;