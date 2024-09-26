import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

import './App.scss';

import NavBar from '../components/shared/NavBar/NavBar';
import firebaseConnection from '../helpers/data/connection';
import Home from '../components/pages/Home/Home';
import SightingForm from '../components/pages/SightingForm/SightingForm';
import SingleSnake from '../components/pages/SingleSnake/SingleSnake';
import UserSightings from '../components/pages/UserSightings/UserSightings';
import Sightings from '../components/pages/Sightings/Sightings';
import Snakes from '../components/pages/Snakes/Snakes';
import UserProfile from '../components/pages/UserProfile/UserProfile';


const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

firebaseConnection();

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <Router>
          <NavBar authed={authed}/>
            <Switch>
              <Route path="/" exact component={Home} authed={authed}/>
              <Route path="/snakes" exact component={Snakes} authed={authed}/>
              <Route path="/snakes/:snakeId" exact component={SingleSnake} authed={authed} />
              <Route path="/sightings" exact component={Sightings} authed={authed} />
              <PrivateRoute path="/sightings/user/:userId" exact component={UserSightings} authed={authed} />
              <PrivateRoute path="/user/:userId" exact component={UserProfile} authed={authed} />
              <PrivateRoute path="/sightings/new" exact component={SightingForm} authed={authed} />
              <PrivateRoute path="/sightings/new/:snakeId" exact component={SightingForm} authed={authed} />
              <PrivateRoute path="/sightings/:sightingId/edit" exact component={SightingForm} authed={authed}/>
            </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
