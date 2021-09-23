import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useCallback } from 'react';


import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Blog from './pages/blog/Blog';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import Error from './pages/error/Error';
import SinglePost from './pages/singlePost/SinglePost';
import ScrollToTop from './components/scrollToTop/ScrollToTop';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import AdminPosts from './pages/adminPosts/AdminPosts';
import CreatePost from './pages/createPost/CreatePost';
import EditPost from './pages/editPost/EditPost';
import EditProfile from './pages/editProfile/EditProfile';
import Footer from './components/footer/Footer';
import CatPosts from './pages/catPosts/CatPosts';
import { AuthContext } from './context/authContext';
import Search from './pages/search/Search';



function App() {

  const { user } = useContext(AuthContext);

  let [reRender, setReRender] = useState(0);

  const reRenderHandler = useCallback(() => {
    setReRender(reRender++)
  }, [reRender]);


  return (
    <Router>
      <ScrollToTop />
      <Navbar loggedIn={user?.token} admin={user?.isAdmin} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          {user?.token ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route exact path="/admin/dashboard">
          {!user?.token ? <Redirect to="/login" /> : <Profile />}
        </Route>
        <Route exact path="/admin/profile/edit">
          {!user?.token ? <Redirect to="/login" /> : <EditProfile />}
        </Route>
        <Route exact path="/admin/dashboard/posts">
          {!user?.isAdmin ? <Redirect to="/login" /> : <AdminPosts reRender={reRenderHandler} />}
        </Route>
        <Route exact path="/admin/dashboard/posts/create">
          {!user?.isAdmin ? <Redirect to="/login" /> : <CreatePost />}

        </Route>
        <Route exact path="/admin/dashboard/post/edit/:id">
          {!user?.isAdmin ? <Redirect to="/login" /> : <EditPost />}
        </Route>
        <Route exact path="/blog/page/:pageNumber">
          <Blog />
        </Route>
        <Route exact path="/blog">
          <Blog />
        </Route>
        <Route path="/category/:catName">
          <CatPosts />
        </Route>
        <Route path="/search/results">
          <Search />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/post/:id">
          <SinglePost />
        </Route>
        <Route>
          <Error />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
