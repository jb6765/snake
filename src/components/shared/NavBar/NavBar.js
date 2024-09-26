import React from 'react';
import './NavBar.scss';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link } from 'react-router-dom';

import Auth from '../../pages/Auth/Auth';
import snakeLogo from './images/SnakelingsLogo3.png';
import authData from '../../../helpers/data/authData';
import userProfilesData from '../../../helpers/data/userProfilesData';
import ProfileForm from '../../pages/ProfileForm/ProfileForm';

class NavBar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
  }

  state = {
    userId: '',
    noProfile: true,
    show: false,
  }

  checkUser = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ userId: user.uid });
        userProfilesData.getProfileByUid(this.state.userId)
          .then((response) => {
            if (response.length < 1) {
              this.setState({ noProfile: true });
              this.setState({ show: true });
            } else {
              this.setState({ noProfile: false });
            }
          })
          .catch((error) => console.error('err from check profile', error));
      }
    });
  }

   handleClose = () => this.setState({ show: false });

   componentDidMount() {
     this.checkUser();
   }

  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const { authed } = this.props;

    return (
  <div className="NavBar">
    <Navbar bg="dark" expand="lg" variant="dark" className="fixed-top">
      <Navbar.Brand><Link to="/"><img id="snakeLogo" src={snakeLogo} alt="snakelings logo" /></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
          <Link to="/snakes" className="nav-link">Snakes</Link>
            <Link to="/sightings" className="nav-link">Sightings</Link>
            {
              authed && this.state.noProfile
                ? <ProfileForm show={this.state.show} edit={false} handleClose={this.handleClose} />
                : ('')
            }
            { authed
              ? (<Link to={`/user/${authData.getUid()}`} className="nav-link">
              <i className="fas fa-user-circle userProfileIcon"></i>
              </Link>)
              : ('') }
            { authed
              ? (<Button variant="dark" onClick={this.logMeOut} className="logOutButton">Log Out</Button>)
              : (<Auth />) }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
    );
  }
}

export default NavBar;
