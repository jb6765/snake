import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import Button from 'react-bootstrap/Button';
import googleLogo from './images/GoogleLogo.png';


class Auth extends React.Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  render() {
    return (
      <div className="Auth">
        <Button variant="dark" onClick={this.loginClickEvent}><img src={googleLogo} id="googleLogo" alt="Google Logo" /> Log In</Button>
      </div>
    );
  }
}

export default Auth;
