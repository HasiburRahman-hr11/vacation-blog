import { createContext, useReducer } from "react";
import authReducer from './authReducer';

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem('vacation_user')) || {},
    isFetching: false,
    error: null
}

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching:state.isFetching,
                error: state.error,
                dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}