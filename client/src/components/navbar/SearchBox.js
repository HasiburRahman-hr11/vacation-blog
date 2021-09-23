import React, { useContext, useEffect, useState } from 'react';
import { Close } from '@material-ui/icons';
import { useHistory } from 'react-router';
import {Link} from 'react-router-dom';
import { getSearchResults } from '../../context/searchContext/apiCalls';
import { SearchContext } from '../../context/searchContext/searchContext';
import axios from 'axios';
const SearchBox = (props) => {
    const { dispatch } = useContext(SearchContext);
    const [term, setTerm] = useState('');
    const [posts, setPosts] = useState([]);
    const [suggetions, setSuggetions] = useState([]);
    const history = useHistory();


    const changeHandler = async (text) => {
        setTerm(text);

        // Show Live Results
        let matches = [];
        const regex = new RegExp(`${text}`, 'gi');
        if (text.length > 0) {

            // Search in title and description
            matches = posts.filter(post => {
                return post.title.match(regex) || post.description.match(regex)
            });
            // Search in categories
            posts.forEach(post =>{
                post.categories.forEach(cat =>{
                    if(cat.match(regex)){
                        if(!matches.includes(post)){
                            matches.push(post)
                        }
                    }
                })
            })

            setSuggetions(matches);
        }else{
            setSuggetions([]);
        }
    }

    const searchHandler = () => {

        getSearchResults(dispatch, term.toLowerCase());
        setTerm('');
        props.toggleSearch();
        props.setSearchFocuse(false);
        history.push(`/search/results`);
        setSuggetions([]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        searchHandler(); 
    }

    const handleKeyPress = (e) => {
        if (e.target.key === 'Enter') {
            searchHandler();
        }
    }

    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                const res = await axios.get('/api/posts/all');
                setPosts(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllPosts();
    }, []);


    return (
        <div className="search_wrapper" style={{ display: props.display, opacity: props.opacity }}>
            <div className="container">
                <div className="search_box">
                    <form action="" className="search_form d-flex">
                        <div className="search_input_wrapper d-flex align-items-center" style={props.searchFocuse ? { borderColor: '#333' } : { borderColor: '#ccc' }}>
                            <input
                                type="text"
                                className="search_input"
                                placeholder="Search Here..."
                                value={term}
                                onChange={(e) => changeHandler(e.target.value)}
                                onClick={() => props.setSearchFocuse(true)}
                                onKeyPress={handleKeyPress}
                            />
                            <Close className="search_close_icon" onClick={() => { props.toggleSearch(); props.setSearchFocuse(false); setTerm(''); setSuggetions([]) }} />
                        </div>
                        <button onClick={handleSubmit} className="search_submit primary_btn button">Submit</button>
                    </form>
                </div>

                {suggetions.length > 0 && (
                    <div className="search_regults mt-4">
                        {suggetions.map(post => (
                            <Link 
                            key={post._id} 
                            to={`/post/${post._id}`} className="search_regults_item d-flex align-items-center d-block"
                            onClick={() => { props.toggleSearch(); props.setSearchFocuse(false); setTerm(''); setSuggetions([]) }}
                            >
                            {post.thumbnail && (
                                <img 
                                src={post.thumbnail} 
                                alt="Post Thumbnail" 
                                className="sr_post_thumbnail" />
                            )}
                            <h4 className="sr_post_title">{post.title}</h4>
                            </Link>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default SearchBox;