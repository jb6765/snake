import React from 'react';
import './ProfileForm.scss';
import S3 from 'react-aws-s3';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import userProfilesData from '../../../helpers/data/userProfilesData';
import authData from '../../../helpers/data/authData';
import apiKeys from '../../../helpers/apiKeys.json';

const config = apiKeys.awsKeys;

const ReactS3Client = new S3(config);

class ProfileForm extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    location: '',
    imageUrl: '',
    userName: '',
    userNameExists: false,
    profileId: '',
    selectedFile: null,
  }

  static propTypes = {
    show: PropTypes.bool,
    handleClose: PropTypes.func,
    edit: PropTypes.bool,
    pageRefresh: PropTypes.func,
  }

  singleFileChangedHandler = (e) => {
    e.preventDefault();
    this.setState({ selectedFile: e.target.files[0] });
  }

  uploadImage = () => {
    ReactS3Client
      .uploadFile(this.state.selectedFile)
      .then((data) => {
        this.setState({ imageUrl: data.location });
        this.saveUserProfileEvent();
      })
      .catch((err) => console.error(err));
  };

  componentDidMount() {
    this.setEditMode();
  }

  setEditMode = () => {
    const { edit } = this.props;
    if (edit) {
      userProfilesData.getProfileByUid(authData.getUid())
        .then((response) => {
          const profile = response[0];
          this.setState({ firstName: profile.firstName });
          this.setState({ lastName: profile.lastName });
          this.setState({ location: profile.location });
          this.setState({ imageUrl: profile.imageUrl });
          this.setState({ userName: profile.userName });
          this.setState({ profileId: profile.id });
        })
        .catch((error) => console.error('err from set edit mode', error));
    }
  }

  checkExistingUsername = (e) => {
    e.preventDefault();
    const { userName } = this.state;
    userProfilesData.getProfileByUserName(userName)
      .then((response) => {
        if (response.length > 0) {
          this.setState({ userNameExists: true });
        } else {
          this.uploadImage();
        }
      })
      .catch((error) => console.error('err from check username', error));
  }

  saveUserProfileEvent = () => {
    const newProfile = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      location: this.state.location,
      imageUrl: this.state.imageUrl,
      userName: this.state.userName,
      uid: authData.getUid(),
    };
    userProfilesData.saveProfile(newProfile)
      .then(() => this.props.handleClose())
      .catch((error) => console.error('err from save profile', error));
  }

  deletePrevImage = () => {
    const fileToDelete = this.state.imageUrl.split('snakes/');
    ReactS3Client
      .deleteFile(fileToDelete[1])
      .then((response) => {
        console.error(response);
      })
      .catch((err) => console.error(err, 'error from deleteSightingEvent'));
  }

  saveUpdatedProfileEvent = () => {
    const userId = this.state.profileId;
    if (this.state.selectedFile !== null) {
      this.deletePrevImage();
      ReactS3Client
        .uploadFile(this.state.selectedFile)
        .then((data) => {
          this.setState({ imageUrl: data.location });
          const newProfileInfo = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            location: this.state.location,
            imageUrl: this.state.imageUrl,
            userName: this.state.userName,
            uid: authData.getUid(),
          };
          userProfilesData.updateProfile(userId, newProfileInfo)
            .then(() => {
              this.props.handleClose();
              this.props.pageRefresh();
            })
            .catch((error) => console.error('err from save profile', error));
        });
    } else {
      const newProfileInfo = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        location: this.state.location,
        imageUrl: this.state.imageUrl,
        userName: this.state.userName,
        uid: authData.getUid(),
      };
      userProfilesData.updateProfile(userId, newProfileInfo)
        .then(() => {
          this.props.handleClose();
          this.props.pageRefresh();
        })
        .catch((error) => console.error('err from save profile', error));
    }
  }

  firstNameChange = (e) => {
    e.preventDefault();
    this.setState({ firstName: e.target.value });
  }

  lastNameChange = (e) => {
    e.preventDefault();
    this.setState({ lastName: e.target.value });
  }

  locationChange = (e) => {
    e.preventDefault();
    this.setState({ location: e.target.value });
  }

  urlChange = (e) => {
    e.preventDefault();
    this.setState({ imageUrl: e.target.value });
  }

  userNameChange = (e) => {
    e.preventDefault();
    this.setState({ userName: e.target.value });
  }

  render() {
    const { show, handleClose, edit } = this.props;
    const {
      firstName,
      lastName,
      location,
      userName,
      userNameExists,
    } = this.state;

    return (
      <div className="ProfileForm">
        <Modal show={show} onHide={handleClose} backdrop="static">
        <form className="formContainer" onSubmit={this.checkExistingUsername}>
          <Modal.Header closeButton>
            {
              edit
                ? (<Modal.Title>Edit Profile</Modal.Title>)
                : (<Modal.Title>Create Profile</Modal.Title>)
            }
          </Modal.Header>
          <Modal.Body className="formModal">
              <div className="form-inline d-flex justify-content-center">
                <div className="form-group row justify-content-center">
                  <label htmlFor="first-name" className="col-form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control m-2"
                    id="first-name"
                    value={firstName}
                    onChange={this.firstNameChange}
                    placeholder="Enter First Name"
                    required>
                    </input>
                </div>
              </div>
              <div className="form-inline d-flex justify-content-center">
                <div className="form-group row justify-content-center">
                  <label htmlFor="last-name" className="col-form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control m-2"
                    id="last-name"
                    value={lastName}
                    onChange={this.lastNameChange}
                    placeholder="Enter Last Name"
                    required>
                    </input>
                </div>
              </div>
              <div className="form-inline d-flex justify-content-center">
                <div className="form-group row justify-content-center">
                  <label htmlFor="location" className="col-form-label">City and State</label>
                  <input
                    type="text"
                    className="form-control m-2"
                    id="location"
                    value={location}
                    onChange={this.locationChange}
                    placeholder="Enter City and State"
                    required>
                    </input>
                </div>
              </div>
              <div className="form-inline d-flex justify-content-center">
                <div className="form-group row justify-content-center">
                  <label htmlFor="image-url" className="col-form-label">Upload Image: </label>
                  <input type="file" onChange={this.singleFileChangedHandler}/>
                </div>
              </div>
              <div className="form-inline d-flex justify-content-center">
                <div className="form-group row justify-content-center">
                  <label htmlFor="user-name" className="col-form-label">User Name</label>
                  <input
                    type="text"
                    className="form-control m-2"
                    id="uesr-name"
                    value={userName}
                    onChange={this.userNameChange}
                    placeholder="Create a User Name"
                    required>
                    </input>
                    {
                    userNameExists
                      ? (<label htmlFor="user-name" className="col-form-label existingName">Username Unavailable!</label>)
                      : ('')
                  }
                </div>
              </div>
          </Modal.Body>
          <Modal.Footer>
            {
              edit
                ? (<div className="editButtons">
                  <Button variant="dark" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="dark" className="ml-3" onClick={this.saveUpdatedProfileEvent}>
                  Save Changes
                </Button>
                </div>)
                : (<Button variant="dark" type="submit">
                Save
              </Button>)
            }
          </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }
}

export default ProfileForm;
