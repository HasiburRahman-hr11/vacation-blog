import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';


import AboutSection from '../../components/aboutSection/AboutSection';
import Categories from '../../components/categories/Categories';
import Feature from '../../components/feature/Feature';
import RecentPosts from '../../components/recentPosts/RecentPosts';
import Trending from '../../components/trending/Trending';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';

const Home = () => {
    const [featurePost, setFeaturePost] = useState({});
    const [trendPosts, setTrendPosts] = useState([]);
    const [recentPosts, setRecentPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error , setError] = useState('')


    useEffect(() => {
        const fetchFeaturePost = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get('/api/posts/feature');
                setFeaturePost(data[0]);
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false)
                setError('An Error Occurred.')
            }
        }
        fetchFeaturePost();


        const fetchTrendingPosts = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get('/api/posts/trending');
                setTrendPosts(data);
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false)
                setError('An Error Occurred.')
            }
        }
        fetchTrendingPosts();


        const fetchRecentPosts = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get('/api/posts/recent');
                setRecentPosts(data);
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false)
                setError('An Error Occurred.')
            }
        }
        fetchRecentPosts();
    }, []);


    return (
        <>
            <Helmet>
                <title>Home | Vacation MERN Application</title>
            </Helmet>

            {loading ? (
                <Loading />
            ): error ? (
                <Error message="An Error Occurred." />
             ) : (
                <>
                    <Feature post={featurePost} />
                    <Trending posts={trendPosts} />
                    <AboutSection />
                    <Categories />
                    <RecentPosts posts={recentPosts} />
                </>
            )}
        </>
    );
};

export default Home;