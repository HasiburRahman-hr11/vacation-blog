import { EDIT_PROFILE_FAILURE, EDIT_PROFILE_START, EDIT_PROFILE_SUCCESS, LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS } from "../constants/authConstants";

const authReducer = (state, action) => {
    switch (action.type) {
        case LOGIN_START:
            return {
                user: {},
                isFetching: true,
                error: null
            }
        case LOGIN_SUCCESS:
            return {
                user: action.payload,
                isFetching: false,
                error: null
            }
        case LOGIN_FAILURE:
            return {
                user: {},
                isFetching: false,
                error: action.payload
            }


        case EDIT_PROFILE_START:
            return {
                user: state.user,
                isFetching: true,
                error: null
            }
        case EDIT_PROFILE_SUCCESS:
            return {
                user: {
                    id:state.user.id,
                    token: state.user.token,
                    isAdmin: state.user.isAdmin,
                    email: state.user.email,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    address: action.payload.address,
                    birthDate: action.payload.birthDate,
                    profilePic: action.payload.profilePic,
                    phone: action.payload.phone
                },
                isFetching: false,
                error: null
            }
        case EDIT_PROFILE_FAILURE:
            return {
                user: state.user,
                isFetching: false,
                error: action.payload
            }

        default:
            return state;
    }
}

export default authReducer;