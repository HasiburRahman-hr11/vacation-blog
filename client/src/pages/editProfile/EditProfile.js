import { Helmet } from 'react-helmet';
import { CameraAlt } from '@material-ui/icons';
import Sidebar from '../../components/admin/sidebar/Sidebar';
import './edit-profile.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { Avatar, CircularProgress } from '@material-ui/core';
import { useState } from 'react';
import { editProfile } from '../../context/apiCalls';

const EditProfile = () => {
    const { dispatch ,user } = useContext(AuthContext);

    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [phone, setPhone] = useState(user?.phone);
    const [address, setAddress] = useState(user?.address);
    const [birthDate, setBirthDate] = useState(user?.birthDate);
    const [profilePic, setProfilePic] = useState(user?.profilePic);
    const [loading , setLoading] = useState(false);
    const [updateMessage , setUpdateMessage] = useState('')


    const submitHandler = async(e)=>{
        e.preventDefault();
        setLoading(true)
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('address', address);
        formData.append('phone', phone);
        formData.append('birthDate', birthDate);
        formData.append('profilePic', profilePic);

        editProfile(dispatch , user?.id , formData , setUpdateMessage);
        setLoading(false)
    }

    return (
        <>
            <Helmet>
                <title>Edit Profile | Vacation MERN Application</title>
            </Helmet>
            <div className="admin">
                <Sidebar />
                <div className="admin_content ">
                    <div className="edit_profile_wrapper">
                        <div className="profile_content">
                            <h3 className="text-center mb-3">Edit Profile</h3>
                            <form className="edit_profile_form" onSubmit={submitHandler}>
                                <div className="profile_avatar mb-5">
                                    {user?.profilePic ? (
                                        <img className="admin_pic" src={user?.profilePic} alt="Admin" />
                                    ) : <Avatar className="admin_pic" />}

                                    <div className="profile_file_wrapper">
                                        <label htmlFor="profilePic">
                                            <CameraAlt className="profile_pic_icon" />
                                        </label>
                                        <input 
                                        type="file" 
                                        name="profilePic" 
                                        id="profilePic"
                                        onChange={(e)=>setProfilePic(e.target.files[0])}
                                        hidden 
                                        />
                                    </div>
                                </div>

                                <div className="input_wrapper d-flex">
                                    <div className="input_half">
                                        <input
                                            type="text"
                                            className="edit_profile_input mb-3"
                                            placeholder="First Name"
                                            name="firstName"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className="input_half">
                                        <input
                                            type="text"
                                            className="edit_profile_input mb-3"
                                            placeholder="Last Name"
                                            name="lastName"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="input_wrapper d-flex">
                                    <div className="input_half">
                                        <input
                                            type="text"
                                            className="edit_profile_input mb-3"
                                            placeholder="Phone Number"
                                            name="phone"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                    <div className="input_half">
                                        <input
                                            type="date"
                                            className="edit_profile_input mb-3"
                                            placeholder="Birth Date"
                                            name="birthDay"
                                            value={birthDate}
                                            onChange={(e) => setBirthDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="input_wrapper">
                                    <input
                                        type="text"
                                        className="edit_profile_input"
                                        placeholder="Address"
                                        name="address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="button primary_btn">
                                    {loading ? <CircularProgress className="loading_spin" /> : 'Update'}
                                </button>
                                {updateMessage && (
                                    <p className="update_info mt-2 text-center">{updateMessage}</p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditProfile;