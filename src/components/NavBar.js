import React from "react";
import {Navbar, Container, Nav} from "react-bootstrap";
import logo from '../assets/logo.png';
import styles from '../styles/NavBar.module.css';
import { NavLink } from 'react-router-dom';
import { removeTokenTimestamp } from "../utils/utils";
import axios from 'axios';
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from './Avatar';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';


/* Navigation component and links */
const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post('dj-rest-auth/logout/');
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      //console.log(err);
    }
  };
  
  const addItemsIcon = (
    <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/auctions/create"
    >
        <i className="fas fa-plus"></i> Add Item
    </NavLink>
    );

    const loggedInIcons = (
      <>
          <NavLink
            className={styles.NavLink}
            activeClassName={styles.Active}
            to="/feed"
          >
            <i className="fas fa-stream"></i>Feed
          </NavLink>
          <NavLink
            className={styles.NavLink}
            activeClassName={styles.Active}
            to="/bookmarks"
          >
            <i className="fas fa-bookmark"></i>Bookmark
          </NavLink>
          <NavLink 
          className={styles.NavLink} 
          to="/" onClick={handleSignOut}>
            <i className="fas fa-sign-out-alt"></i>Sign out
          </NavLink>
          <NavLink
            className={styles.NavLink}
            to={`/auctioneers/${currentUser?.auctioneer_id}`}
          >
            <Avatar src={currentUser?.auctioneer_image} text="Auctioneer" height={42}/>
            <i className="fas fa-user"></i>
          </NavLink>
      </>
    );

    const loggedOutIcons = (
      <>
        <NavLink
          className={styles.NavLink}
          activeClassName={styles.Active}
          to="/signin"
        >
        <i className="fas fa-sign-in-alt"></i>Sign in
        </NavLink>
        <NavLink
          to="/signup"
          className={styles.NavLink}
          activeClassName={styles.Active}
        >
          <i className="fas fa-user-plus"></i>Sign up
        </NavLink>
      </>
    );
      
    return (
      <Navbar
        expanded={expanded}
        className={styles.NavBar}
        expand="md"
        fixed="top"
      >
        <Container>
          <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="35" />
            <div className={styles.Slogan}>
            <span>Welcome to Auctionghetto</span>
            </div>
          </Navbar.Brand>
          </NavLink>
          {currentUser && addItemsIcon}
          <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-right">

            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>
      );
};

export default NavBar;