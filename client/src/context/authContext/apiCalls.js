import axios from 'axios';
import { editProfileStart, editProfileSuccess, editProfileFailed, loginFailed, loginStart, loginSuccess } from './authActions';


export const login = async (dispatch, formData , setLoginFailed) => {
    dispatch(loginStart());
    try {
        const res = await axios.post('/api/auth/login', formData)
        dispatch(loginSuccess(res.data));
        localStorage.setItem('vacation_user', JSON.stringify(res.data));
        setLoginFailed(false);
        window.location.reload();
    } catch (error) {
        dispatch(loginFailed(error.response.data));
        setLoginFailed(true);
    }
}


export const editProfile = async(dispatch , id , formData , setUpdateMessage)=>{
    dispatch(editProfileStart)
    try {
        const res = await axios.post(`/api/auth/profile/edit/${id}` , formData);

        const oldUserData = JSON.parse(localStorage.getItem('vacation_user'));

        localStorage.setItem('vacation_user', JSON.stringify({
            token:oldUserData.token,
            id:oldUserData.id,
            isAdmin:oldUserData.isAdmin,
            email:oldUserData.email,
            firstName:res.data.firstName,
            lastName:res.data.lastName,
            birthDate:res.data.birthDate,
            address:res.data.address,
            phone:res.data.phone,
            profilePic:res.data.profilePic,
        }));

        dispatch(editProfileSuccess(res.data));

        setUpdateMessage('Profile Updated Successfully.');
    } catch (error) {
        console.log(error)
        dispatch(editProfileFailed(error));
        setUpdateMessage('Update failed. Try again later.s');
    }
}