import React from 'react';
import { Link } from 'react-router-dom';
import userProfilesData from '../../../helpers/data/userProfilesData';
import authData from '../../../helpers/data/authData';
import sightingsData from '../../../helpers/data/sightingsData';
import ProfileForm from '../ProfileForm/ProfileForm';

import './UserProfile.scss';

class UserProfile extends React.Component {
  state = {
    userProfile: {},
    sightings: [],
    show: false,
  }

  handleClose = () => this.setState({ show: false });

  openForm = (e) => {
    e.preventDefault();
    this.setState({ show: true });
  }

  pageRefresh = () => {
    this.getProfileData();
  }

  getProfileData = () => {
    const uid = authData.getUid();
    userProfilesData.getProfileByUid(uid)
      .then((response) => {
        this.setState({ userProfile: response[0] });
      })
      .catch((error) => console.error('error from user profile', error));
  }

  getSightingsData = () => {
    const uid = authData.getUid();
    sightingsData.getSightingsByUid(uid)
      .then((response) => this.setState({ sightings: response }))
      .catch((error) => console.error('error from get sightings in profile', error));
  }

  componentDidMount() {
    this.getProfileData();
    this.getSightingsData();
  }

  render() {
    const { userProfile, sightings } = this.state;
    const uid = authData.getUid();

    return (
      <div className="UserProfile">
        <h1>Welcome {userProfile.firstName} {userProfile.lastName}!</h1>
        <div className="row d-flex justify-content-center">
         <div id="profileContainer">
            <div className="card mb-3 userProfileCard">
            <div className="row no-gutters d-flex justify-content-center">
              <div className="col-6" id="profileData">
                <div className="card-body">
                  <h5><strong>User Name: </strong>{userProfile.userName}</h5>
                  <p className="card-text"><strong>Home Town:</strong> {userProfile.location}</p>
                  <p className="card-text"><strong>Reported Sightings: {sightings.length}</strong></p>
                  <div className="row justify-content-around sightingButtons">
                    <Link className="btn btn-dark m-2" to={`/sightings/user/${uid}`}>Manage Sightings</Link>
                    <Link className="btn btn-dark m-2" to="/sightings/new">Report Sighting</Link>
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <img src={userProfile.imageUrl} className="card-img" alt={userProfile.firstName} />
              </div>
            </div>
            <div className="card-footer profileEdit"><button className="btn btn-dark" id="editProfile" onClick={this.openForm}>Edit Profile</button>
            {this.state.show && <ProfileForm show={this.state.show} handleClose={this.handleClose} edit={true} pageRefresh={this.pageRefresh} />}
            </div>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
