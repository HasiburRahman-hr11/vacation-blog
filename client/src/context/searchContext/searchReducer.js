const { SEARCH_START, SEARCH_SUCCESS, SEARCH_FAILED } = require("../../constants/searchConstants");


const searchReducer = (state, action) => {
    switch (action.type) {
        case SEARCH_START:
            return {
                posts: [],
                isFetching: true,
                error: false
            }
            break;
        case SEARCH_SUCCESS:
            return {
                posts: action.payload,
                isFetching: false,
                error: false
            }
            break;
        case SEARCH_FAILED:
            return {
                posts: [],
                isFetching: false,
                error: action.payload
            }
            break;

        default:
            return state;
            break;
    }
}

export default searchReducer;