import { SEARCH_FAILED, SEARCH_START, SEARCH_SUCCESS } from "../../constants/searchConstants";

export const searchStart = () => ({type:SEARCH_START});
export const searchSuccess = (posts) => ({type:SEARCH_SUCCESS , payload:posts});
export const searchFailed = (error) => ({type:SEARCH_FAILED , payload:error});