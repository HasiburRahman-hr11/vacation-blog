import Post from '../../components/post/Post';
import './search.css';
import '../blog/blog.css';
import { useContext } from 'react';
import { SearchContext } from '../../context/searchContext/searchContext';
import Loading from '../../components/loading/Loading';
import { Helmet } from 'react-helmet';

const Search = () => {
    const { posts, isFetching } = useContext(SearchContext)

    return (
        <>
            <Helmet>
                <title>Search | Vacation MERN Application</title>
            </Helmet>

            {isFetching ? (
                <Loading />
            ) : (
                <div className="blog_posts">
                    <div className="blog_posts_wrapper">
                        <div className="container">
                            <div className="search_header mb-5">
                                <h3 className="search_title text-center">
                                    {posts.length === 0 && 'No result found'}
                                    {posts.length === 1 && posts.length + ' result found'}
                                    {posts.length > 1 && posts.length + ' results found'}
                                </h3>
                            </div>
                            <div className="row gx-4 gy-5">
                                {posts?.map(post => (
                                    <Post key={post._id} col="3" post={post} />
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>

    );
};

export default Search;