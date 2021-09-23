import { EDIT_PROFILE_FAILURE, EDIT_PROFILE_START, EDIT_PROFILE_SUCCESS, LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, LOGOUT } from "../constants/authConstants";


export const loginStart = () => ({type:LOGIN_START});
export const loginSuccess = (user) =>({type:LOGIN_SUCCESS , payload:user});
export const loginFailed = (error) =>({type:LOGIN_FAILURE , payload:error});


export const editProfileStart = () => ({type:EDIT_PROFILE_START});
export const editProfileSuccess = (user) =>({type:EDIT_PROFILE_SUCCESS , payload:user});
export const editProfileFailed = (error) =>({type:EDIT_PROFILE_FAILURE , payload:error});

export const logout = () => ({type:LOGOUT});