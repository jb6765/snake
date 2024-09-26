import React from 'react';
import { Link } from 'react-router-dom';
import './SightingForm.scss';
import S3 from 'react-aws-s3';
import authData from '../../../helpers/data/authData';
import snakelingsData from '../../../helpers/data/snakelingsData';
import statesData from '../../../helpers/data/statesData';
import sightingsData from '../../../helpers/data/sightingsData';
import apiKeys from '../../../helpers/apiKeys.json';

const config = apiKeys.awsKeys;

const ReactS3Client = new S3(config);

class SightingForm extends React.Component {
  state = {
    dateFound: '',
    stateId: '',
    county: '',
    identified: false,
    snakeId: '',
    imageUrl: '',
    description: '',
    snakes: [],
    states: [],
    singleSnake: {},
    singleState: {},
    selectedFile: null,
  }

uploadImage = () => {
  ReactS3Client
    .uploadFile(this.state.selectedFile)
    .then((data) => {
      this.setState({ imageUrl: data.location });
      this.saveSightingEvent();
    })
    .catch((err) => console.error(err));
};


  singleFileChangedHandler = (e) => {
    e.preventDefault();
    this.setState({ selectedFile: e.target.files[0] });
  }

  saveSightingEvent = () => {
    const newSighting = {
      identified: this.state.identified,
      snakeId: this.state.snakeId,
      stateId: this.state.stateId,
      county: this.state.county,
      imageUrl: this.state.imageUrl,
      uid: authData.getUid(),
      dateFound: this.state.dateFound,
      description: this.state.description,
    };
    sightingsData.saveSighting(newSighting)
      .then(() => this.props.history.push('/sightings'))
      .catch((error) => console.error('err from save sighting', error));
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

  getSnakes = () => {
    snakelingsData.getAllSnakes()
      .then((snakes) => {
        snakes.sort((a, b) => {
          if (a.commonName < b.commonName) return -1;
          if (a.commonName > b.commonName) return 1;
          return 0;
        });
        this.setState({ snakes });
      })
      .catch((error) => console.error('error from get snakes', error));
  }


  componentDidMount() {
    const { snakeId } = this.props.match.params;
    const { sightingId } = this.props.match.params;
    this.getStates();
    if (snakeId) {
      snakelingsData.getSingleSnake(snakeId)
        .then((response) => {
          this.setState({ singleSnake: response.data });
          this.setState({ identified: true });
          this.setState({ snakeId });
        })
        .catch((error) => console.error('err from snakeForm', error));
    } else {
      this.getSnakes();
    }

    if (sightingId) {
      sightingsData.getSingleSighting(sightingId)
        .then((request) => {
          const sighting = request.data;
          this.setState({ identified: sighting.identified });
          this.setState({ snakeId: sighting.snakeId });
          this.setState({ stateId: sighting.stateId });
          this.setState({ county: sighting.county });
          this.setState({ imageUrl: sighting.imageUrl });
          this.setState({ dateFound: sighting.dateFound });
          this.setState({ description: sighting.description });
          snakelingsData.getSingleSnake(this.state.snakeId)
            .then((response) => {
              this.setState({ singleSnake: response.data });
              statesData.getStateById(this.state.stateId)
                .then((singleState) => {
                  this.setState({ singleState: singleState.data });
                });
            });
        })
        .catch((error) => console.error('err from edit mode', error));
    }
  }

  dateChange = (e) => {
    e.preventDefault();
    this.setState({ dateFound: e.target.value });
  }

  stateChange = (e) => {
    e.preventDefault();
    this.setState({ stateId: e.target.value });
  }

  snakeChange = (e) => {
    e.preventDefault();
    this.setState({ snakeId: e.target.value });
  }

  countyChange = (e) => {
    e.preventDefault();
    this.setState({ county: e.target.value });
  }

  changeIdentified = (e) => {
    const checkedValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({ identified: checkedValue });
  }

  changeNewImage = (e) => {
    const checkedValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({ newImage: checkedValue });
  }

  descriptionChange = (e) => {
    e.preventDefault();
    this.setState({ description: e.target.value });
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

  sightingEditEvent = () => {
    const { sightingId } = this.props.match.params;
    const userId = authData.getUid();
    if (this.state.selectedFile !== null) {
      this.deletePrevImage();
      ReactS3Client
        .uploadFile(this.state.selectedFile)
        .then((data) => {
          this.setState({ imageUrl: data.location });
          const updatedSighting = {
            identified: this.state.identified,
            snakeId: this.state.snakeId,
            stateId: this.state.stateId,
            county: this.state.county,
            imageUrl: this.state.imageUrl,
            uid: userId,
            dateFound: this.state.dateFound,
            description: this.state.description,
          };
          sightingsData.updateSighting(sightingId, updatedSighting)
            .then(() => this.props.history.push(`/sightings/user/${userId}`));
        })
        .catch((error) => console.error('err from sighting edit', error));
    } else {
      const updatedSighting = {
        identified: this.state.identified,
        snakeId: this.state.snakeId,
        stateId: this.state.stateId,
        county: this.state.county,
        imageUrl: this.state.imageUrl,
        uid: userId,
        dateFound: this.state.dateFound,
        description: this.state.description,
      };
      sightingsData.updateSighting(sightingId, updatedSighting)
        .then(() => this.props.history.push(`/sightings/user/${userId}`))
        .catch((error) => console.error('err from sighting edit', error));
    }
  }

  checkEditOrCreate = (e) => {
    e.preventDefault();
    const { sightingId } = this.props.match.params;
    if (sightingId) {
      this.sightingEditEvent();
    } else {
      this.uploadImage();
    }
  }

  render() {
    const {
      dateFound,
      county,
      identified,
      description,
      snakes,
      states,
      singleSnake,
      singleState,
    } = this.state;

    const { snakeId, sightingId } = this.props.match.params;
    const userId = authData.getUid();

    return (
      <div className="SightingForm">
        <form className="formContainer" onSubmit={this.checkEditOrCreate}>
           <div className="form-inline d-flex justify-content-center">
            <div className="form-group row justify-content-center">
              <label htmlFor="date-found" className="col-form-label">Date Found</label>
              <input
                type="date"
                className="form-control m-2"
                id="date-found"
                value={dateFound}
                onChange={this.dateChange}
                placeholder={this.dateFound}
                required
                >
              </input>
           </div>
          </div>
        <div className="form-inline d-flex justify-content-center">
          <div className="form-group row">
            <label htmlFor="state-name" className="col-form-label">Select State</label>
              <select
                type="select"
                className="custom-select m-2"
                id="state-name"
                onChange={this.stateChange}
                required
                >
                  {
                    sightingId
                      ? (<option value={singleState.id}>{singleState.name}</option>)
                      : (<option value=''>Select...</option>)
                  }
                    <option value=''>Select...</option>
                  {states.map((newState) => (<option key={newState.id} value={newState.id}>{newState.name}</option>))}
            </select>
          </div>
        </div>
        <div className="form-inline d-flex justify-content-center">
          <div className="form-group row">
            <label htmlFor="county-name" className="col-form-label">County</label>
            <input
            type="text"
            className="form-control m-2"
            id="county-name"
            placeholder="Enter County"
            value={county}
            onChange={this.countyChange}
            required
            >
            </input>
          </div>
        </div>
        <div className="form-inline d-flex justify-content-center">
          <div className="form-check">
            <input type="checkbox"
            className="form-check-input m-2"
            id="is-identified"
            checked={identified}
            onChange={this.changeIdentified}>
            </input>
            <label htmlFor="is-identified">Identified?</label>
          </div>
        </div>
        <div className="form-inline d-flex justify-content-center">
          <div className="form-group row">
            <label htmlFor="snake-name" className="col-form-label">Select Snake Species</label>
            <select
              type="select"
              className="custom-select m-2"
              id="snake-name"
              onChange={this.snakeChange}
              disabled={identified ? null : 'disabled'}
              >
                {
                  snakeId || sightingId
                    ? (<option value={snakeId}>{singleSnake.commonName}</option>)
                    : (<option value=''>Select...</option>)
                }
                {snakes.map((snake) => (<option key={snake.id} value={snake.id}>{snake.commonName}</option>))}
            </select>
          </div>
        </div>
        <div className="form-inline d-flex justify-content-center">
          <div className="form-group row">
            <label htmlFor="snake-image" className="col-form-label">Snake Image: </label>
            <input type="file" onChange={this.singleFileChangedHandler}/>
          </div>
        </div>
        <div className="form-inline d-flex justify-content-center">
          <div className="form-group row">
            <label htmlFor="sighting-description" className="col-form-label">Description of incident:</label>
            <textarea
            type="text"
            className="form-control m-2 col-12"
            id="sighting-description"
            placeholder="Enter description of events"
            value={description}
            onChange={this.descriptionChange}
            rows="3"
            required
            >
            </textarea>
          </div>
        </div>
        {
          sightingId
            ? (<div className="row justify-content-around">
              <Link className="btn btn-dark" to={`/sightings/user/${userId}`}>Cancel</Link>
              <button type="submit" className="btn btn-dark">Save Changes</button>
              </div>)
            : (<button className="btn btn-dark" type="submit">Make Report</button>)
        }
        </form>
      </div>
    );
  }
}

export default SightingForm;
