import { Helmet } from 'react-helmet';
import './profile.css';
import Sidebar from '../../components/admin/sidebar/Sidebar';
import { Edit } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext/authContext';
import { Avatar } from '@material-ui/core';
import Loading from '../../components/loading/Loading';

const Profile = () => {
    const { user, isFetching } = useContext(AuthContext);
    return (
        <>
            <Helmet>
                <title>Admin | Vacation MERN Application</title>
            </Helmet>
            {isFetching ? (
                <Loading />
            ) : (
                <div className="admin">
                    <Sidebar />
                    <div className="admin_content ">
                        <div className="profile_wrapper">
                            <div className="profile_content">
                                <Link to="/admin/profile/edit" className="edit_profile_link">
                                    <Edit className="edit_profile_icon" />
                                </Link>
                                <div className="profile_avatar">
                                    {user?.profilePic ? (
                                        <img className="admin_pic" src={user?.profilePic} alt="Admin" />
                                    ) : <Avatar className="admin_pic" />}
                                </div>
                                <div className="profile_details mt-4">
                                    <h4 className="admin_name">Name: <span>{user?.firstName + ' ' + user?.lastName}</span></h4>

                                    <p className="profile_info">Email: <span>{user?.email}</span></p>
                                    {user?.phone && (
                                        <p className="profile_info">Phone: <span>{user?.phone}</span></p>
                                    )}
                                    {user?.address && (
                                        <p className="profile_info">Address: <span>{user?.address}</span></p>
                                    )}

                                    {user?.birthDate && (
                                        <p className="profile_info">Date of Birth: <span>{new Date(user?.birthDate).toDateString()}</span></p>
                                    )}


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    );
};

export default Profile;