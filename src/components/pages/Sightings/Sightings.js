import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import Sighting from '../../shared/Sighting/Sighting';
import sightingsData from '../../../helpers/data/sightingsData';
import statesData from '../../../helpers/data/statesData';
import 'firebase/auth';

import './Sightings.scss';

class Sightings extends React.Component {
  state = {
    sightings: [],
    authed: false,
    userId: '',
    states: [],
  }

  getStates = () => {
    statesData.getAllStates()
      .then((states) => {
        states.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        this.setState({ states });
      })
      .catch((error) => console.error('error from get states', error));
  }

  getSightings = () => {
    sightingsData.getAllSightings()
      .then((sightings) => {
        sightings.sort((a, b) => {
          if (a.stateId < b.stateId) return -1;
          if (a.stateId > b.stateId) return 1;
          return 0;
        });
        this.setState({ sightings });
      })
      .catch((error) => console.error('error from sightings', error));
  }

  componentDidMount() {
    this.getSightings();
    this.checkUser();
    this.getStates();
  }

  stateChange = (e) => {
    const stateId = e.target.value;
    const sightingsByState = [];
    sightingsData.getAllSightings()
      .then((sightings) => {
        sightings.sort((a, b) => {
          if (a.stateId < b.stateId) return -1;
          if (a.stateId > b.stateId) return 1;
          return 0;
        });
        const allSightings = sightings;
        if (stateId === 'all') {
          this.getSightings();
        } else {
          for (let i = 0; i < allSightings.length; i += 1) {
            if (allSightings[i].stateId === stateId) {
              sightingsByState.push(allSightings[i]);
            }
          }
        }
        this.setState({ sightings: sightingsByState });
      })
      .catch((error) => console.error('error from sightings', error));
  }

  checkUser = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
        this.setState({ userId: user.uid });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  forceLogin = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  render() {
    const { authed, userId, states } = this.state;
    return (
      <div className="Sightings">
        <h1>Reported Sightings</h1>
        {
          authed
            ? (<Link className="btn btn-dark m-2" to={`/sightings/user/${userId}`}>Manage My Sightings</Link>)
            : ('')
        }
        {
          authed
            ? (<Link className="btn btn-dark m-2" to="/sightings/new">Report Sighting</Link>)
            : (<Link className="btn btn-dark m-2" to="/sightings/new" onClick={this.forceLogin}>Report Sighting</Link>)
        }
        <div className="form-inline d-flex justify-content-center">
          <div className="form-group row">
            <label htmlFor="state-name" className="col-form-label">Filter By  State</label>
              <select
                type="select"
                className="custom-select m-2"
                id="state-name"
                onChange={this.stateChange}
                >
                <option value='all'>All States</option>
                  {states.map((newState) => (<option key={newState.id} value={newState.id}>{newState.name}</option>))}
            </select>
          </div>
        </div>
        <div className="wrap d-flex row justify-content-center">
          {this.state.sightings.length === 0 ? (<h4>There are no sightings reported for your selected state.</h4>)
            : ('')}
          {this.state.sightings.map((sighting) => <Sighting key={sighting.id} sighting={sighting} />)}
        </div>
      </div>
    );
  }
}

export default Sightings;
