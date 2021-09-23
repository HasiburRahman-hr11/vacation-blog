import { Search, Close, MenuOpen } from '@material-ui/icons';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './navbar.css';
import SearchBox from './SearchBox';

const Navbar = ({ loggedIn, admin }) => {

    const [sticky, setSticky] = useState(false)
    const [searchFocuse, setSearchFocuse] = useState(false);
    const [isSearch, setIsSearch] = useState(false)
    const [opacity, setOpacity] = useState(0);
    const [display, setDisplay] = useState('none');
    const [isMobile, setIsMobile] = useState(false)


    const toggleSearch = () => {
        if (display === 'none') {
            setDisplay('block')
            setTimeout(() =>
                setOpacity(1), 100 // something very short
            )
            setIsSearch(true)
        }
        if (display === 'block') {
            setOpacity(0)
            setTimeout(() =>
                setDisplay('none'), 300 // same as transition time
            )
            setIsSearch(false)
        }
    }

    window.onscroll = (e) => {
        setSticky(window.pageYOffset > 200 ? true : false)
        return () => (window.onscroll = null)
    }


    return (
        <header className={sticky ? 'header sticky' : 'header'} id="header">
            <div className="header_wrapper">
                <div className="topbar">
                    <div className="container">
                        <div className="topbar_wrapper d-flex justify-content-between align-items-center">
                            <Link to="/" className="logo topbar_left">
                                <img src="/images/logo.svg" alt="" />
                            </Link>
                            <div className="topbar_right d-flex align-items-center">
                                <nav className={isMobile ? 'mobile_nav main_nav' : 'main_nav'}>
                                    <Close className="menu_close" onClick={() => setIsMobile(false)} />
                                    <ul className="main_menu">
                                        <li className="menu_item">
                                            <NavLink to="/blog" activeClassName='is-active'>Blog</NavLink>
                                        </li>
                                        <li className="menu_item">
                                            <NavLink to="/about" activeClassName='is-active'>About</NavLink>
                                        </li>
                                        <li className="menu_item">
                                            <NavLink to="/contact" activeClassName='is-active'>Contact</NavLink>
                                        </li>

                                        {!loggedIn ? (
                                            <li className="menu_item">
                                                <NavLink to="/login" activeClassName='is-active'>Login</NavLink>
                                            </li>
                                        ) : (
                                            <li className="menu_item">
                                                <NavLink to="/admin/dashboard" activeClassName='is-active'>Dashboard</NavLink>
                                            </li>
                                        )}
                                    </ul>
                                </nav>
                                <div className="search_open" onClick={() => toggleSearch()}>
                                    <Search className="search_icon" />
                                </div>
                                {/* Menu Toggler */}
                                <MenuOpen className="menu_open" onClick={() => setIsMobile(true)} />
                            </div>

                        </div>
                    </div>
                </div>


                <SearchBox 
                display={display} 
                opacity={opacity}
                searchFocuse={searchFocuse}
                setSearchFocuse={setSearchFocuse}
                toggleSearch={toggleSearch}
                />
                

            </div>
            <div className={isSearch ? 'search_overlay active' : 'search_overlay'} onClick={() => {toggleSearch();}}></div>
        </header>
    );
};

export default Navbar;