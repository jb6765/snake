import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import snakelingsData from '../../../helpers/data/snakelingsData';
import sightingsData from '../../../helpers/data/sightingsData';
import Sighting from '../../shared/Sighting/Sighting';
import 'firebase/auth';

import './SingleSnake.scss';

class SingleSnake extends React.Component {
  state = {
    snake: {},
    authed: false,
    sightings: [],
  }

  getSightings = () => {
    const { snakeId } = this.props.match.params;
    sightingsData.getSightingsBySnakeId(snakeId)
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

  checkUser = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  forceLogin = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
    this.getSightings();
  }

  componentDidMount() {
    const { snakeId } = this.props.match.params;

    snakelingsData.getSingleSnake(snakeId)
      .then((response) => {
        this.setState({ snake: response.data });
      })
      .catch((error) => console.error('error from single snake', error));
    this.checkUser();
    this.getSightings();
  }

  render() {
    const { snake, authed, sightings } = this.state;
    const { snakeId } = this.props.match.params;

    return (
      <div className="SingleSnake container">
        <h1>{snake.commonName}</h1>
        <h2><em>{snake.scientificName}</em></h2>
        <div className="row d-flex justify-content-center snakeInfo m-0">
          <div className="col-sm-6 m-auto">          <img src={snake.imageUrl} className="singleSnakeImage" alt={snake.commonName} /></div>
          <div className="col-sm-6 m-auto">
            <h5>{snake.description}</h5>
          </div>
        </div>
        <div className="additionalInfo">
          <p><strong>Diet:</strong> {snake.diet}</p>
          <p className="mt-3"><strong>Size:</strong> {snake.size}</p>
          <p className="mt-3"><strong>Conservation Status:</strong> {snake.conservationStatus}</p>
          { snake.venomous
            ? (<p className="mt-3 venom"><strong>Venomous</strong></p>)
            : (<p className="mt-3 non-venom"><strong>Non-venomous</strong></p>)}
            {
              authed
                ? (<Link className="btn btn-dark" to={`/sightings/new/${snakeId}`}>Report A Sighting</Link>)
                : <Link className="btn btn-dark" to={`/sightings/new/${snakeId}`} onClick={this.forceLogin}>Report A Sighting</Link>
            }
          </div>
          { sightings.length > 0 ? (<h4 className="mt-5">Reported Sightings</h4>) : ('')}
          { sightings.length > 0 ? (sightings.map((sighting) => <Link to="/sightings" className="nav-link"><Sighting key={sighting.id} sighting={sighting} /></Link>))
            : ('')}
      </div>
    );
  }
}

export default SingleSnake;
