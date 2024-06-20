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

// Navigation component and links
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
  
    const auctionSaleIcon = (
        <NavLink
          className={styles.NavLink}
          activeClassName={styles.Active}
          to="/auctions/create"
        >
          <i className="fas fa-plus"></i> Add items
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
            to="/bookmark"
          >
            <i className="fas fa-heart"></i>Bookmark
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
            <Avatar src={currentUser?.auctioneer_image} text="Auctioneer" height={40}/>
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
          <Navbar.Brand className="mr-0">
            <img src={logo} alt="logo" height="45" />
            <div className={styles.Slogan}>
            <span>Welcome to Auctionghetto</span>
            </div>
          </Navbar.Brand>
        </NavLink>
        {currentUser && auctionSaleIcon }
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>
  );
};

export default NavBar;