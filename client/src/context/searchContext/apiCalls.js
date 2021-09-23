import axios from 'axios'
import { searchFailed, searchStart, searchSuccess } from "./searchActions"


export const getSearchResults = async (dispatch , term) =>{
    dispatch(searchStart())
    try {
        const res = await axios.get(`/api/search/posts?term=${term}`);

        dispatch(searchSuccess(res.data))
    } catch (error) {
        console.log(error);
        dispatch(searchFailed(error))
    }
}