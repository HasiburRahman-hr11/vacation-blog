import { createContext, useReducer } from "react";
import searchReducer from './searchReducer';

const INITIAL_STATE = {
    posts: [],
    isFetching: false,
    error: null
}

export const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(searchReducer, INITIAL_STATE);

    return (
        <SearchContext.Provider
            value={{
                posts: state.posts,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}
        >
            {children}
        </SearchContext.Provider>
    )
}