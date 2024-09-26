import React from 'react';
import { Link } from 'react-router-dom';
import Sighting from '../../shared/Sighting/Sighting';
import sightingsData from '../../../helpers/data/sightingsData';

import './UserSightings.scss';

class UserSightings extends React.Component {
  state = {
    sightings: [],
  }

  getUserSightings = () => {
    const userId = this.props.match.params;
    sightingsData.getSightingsByUid(userId.userId)
      .then((response) => {
        this.setState({ sightings: response });
      })
      .catch((error) => console.error('err from get user sightings', error));
  }

  componentDidMount() {
    this.getUserSightings();
  }

  deleteSighting = (sightingId) => {
    sightingsData.deleteSighting(sightingId)
      .then(() => this.getUserSightings())
      .catch((error) => console.error('err from delete sighting', error));
  }

  render() {
    const userId = this.props.match.params;

    return (
      <div className="UserSightings">
        <h1>My Sightings</h1>
        <Link className="btn btn-dark m-2" to="/sightings/new">Report Sighting</Link>
        <div className="wrap d-flex row justify-content-center">
          {this.state.sightings.map((sighting) => <Sighting key={sighting.id} sighting={sighting} userId={userId.userId} deleteSighting={this.deleteSighting} />)}
        </div>
      </div>
    );
  }
}

export default UserSightings;
