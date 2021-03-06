import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../utils/UserContext";
import API from '../../utils/API';
import './style.css';

function Nav() {
  const userState = useContext(UserContext);

  function handleLogout() {
    userState.setCurrUser({});
    API.logout().then(() => {
      window.location.reload(false);
    });

  }

  if (userState.currUser._id) {
    return (
      <nav className="navbarColor navbar navbar-expand-lg">
        <Link to="/posts">
          <h1 className="permanentMarkerFont paddingForLogoToPushStuffRight">
            Music Is For Me
        </h1>
        </Link>
        <Link to="/posts">
          <h3 className="navBarh3Tags nav-item">Posts</h3>
        </Link>
        <Link to="/createpost">
          <h3 className="navBarh3Tags nav-item">Create Post</h3>
        </Link>
        <h1>  </h1>
        <Link to={"/profile/" + userState.currUser._id}>
          <h3 className="navBarh3Tags nav-item">Profile</h3>
        </Link>
        <Link to={"/login"} onClick={() =>
          handleLogout()
        }>
          <h3 className="navBarh3Tags nav-item">Logout</h3>
        </Link>
      </nav>
    )
  };
  return (
    <nav className="navbarColor navbar navbar-expand-lg">
      <Link to="/posts">
        <h1 className="permanentMarkerFont paddingForLogoToPushStuffRight">
          Music Is For Me
      </h1>
      </Link>
      <Link to="/posts">
        <h3 className="navBarh3Tags nav-item">Posts</h3>
      </Link>
      <Link to="/createpost">
        <h3 className="navBarh3Tags nav-item">Create Post</h3>
      </Link>
      <h1>  </h1>
      <Link to={"/profile/" + userState.currUser._id}>
        <h3 className="navBarh3Tags nav-item">Profile</h3>
      </Link>
      <Link to={"/login"}>
        <h3 className="navBarh3Tags nav-item">Login</h3>
      </Link>
    </nav>
  );


}

export default Nav;