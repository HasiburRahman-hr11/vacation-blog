import { ArrowBackIos, Person, LibraryBooks, PostAdd, ExitToApp, Settings } from '@material-ui/icons';
import { useContext } from 'react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';
import './sidebar.css';
import { Avatar } from '@material-ui/core';

const Sidebar = () => {
    const [active, setActive] = useState(false);

    const { user } = useContext(AuthContext)

    const handleLogout = () => {
        localStorage.removeItem('vacation_user');
        window.location.reload();
    }
    return (
        <div className={active ? 'admin_sidebar active' : 'admin_sidebar'}>
            <div className="sidebar_wrapper">
                <span className={active ? 'admin_sidebar_toggler rotate' : 'admin_sidebar_toggler'} onClick={() => setActive(!active)}>
                    <ArrowBackIos className="sidebar_toggle_icon" />
                </span>
                <div className="sidebar_admin_title d-flex align-items-center">
                    {user?.profilePic ? (<img className="admin_pic" src={user?.profilePic} alt="Admin" />) : (<Avatar className="admin_pic" />)}

                    <span> {user?.firstName}</span>
                </div>
                <ul className="sidebar_nav">
                    <li className="sidebar_nav_item" title="Profile">
                        <NavLink exact={true} to="/admin/dashboard" className="d-flex align-items-center" activeClassName="is-active">
                            <Person className="sidebar_nav_icon" />
                            <span>Profile</span>
                        </NavLink>
                    </li>
                    {user?.isAdmin && (
                        <>
                            <li className="sidebar_nav_item" title="Posts">
                                <NavLink exact={true} to="/admin/dashboard/posts" className="d-flex align-items-center" activeClassName="is-active">
                                    <LibraryBooks className="sidebar_nav_icon" />
                                    <span>All Posts</span>
                                </NavLink>
                            </li>
                            <li className="sidebar_nav_item" title="Create Post">
                                <NavLink exact={true} to="/admin/dashboard/posts/create" className="d-flex align-items-center" activeClassName="is-active">
                                    <PostAdd className="sidebar_nav_icon" />
                                    <span>Create Post</span>
                                </NavLink>
                            </li>
                            <li className="sidebar_nav_item" title="Create Post">
                                <NavLink exact={true} to="/admin/dashboard/settings" className="d-flex align-items-center" activeClassName="is-active">
                                    <Settings className="sidebar_nav_icon" />
                                    <span>Site Settings</span>
                                </NavLink>
                            </li>
                        </>
                    )}



                    <li className="sidebar_nav_item" title="Logout" onClick={handleLogout}>
                        <Link to="#" className="d-flex align-items-center">
                            <ExitToApp className="sidebar_nav_icon" />
                            <span>Logout</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;