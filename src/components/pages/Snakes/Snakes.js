import React from 'react';
import Snake from '../../shared/Snake/Snake';
import StateMap from '../StateMap/StateMap';
import SnakeForm from '../SnakeForm/SnakeForm';
import './Snakes.scss';
import snakelingsData from '../../../helpers/data/snakelingsData';
import stateSnakesData from '../../../helpers/data/stateSnakesData';


class Snakes extends React.Component {
  state = {
    snakes: [],
    showMap: false,
    showForm: false,
    stateId: '',
  }

  setShowForm = (e) => {
    e.preventDefault();
    this.setState({ showForm: true });
  }

  setCloseForm = () => {
    this.setState({ showForm: false });
  }

  getSnakes = () => {
    snakelingsData.getAllSnakes()
      .then((snakeArray) => {
        snakeArray.sort((a, b) => {
          if (a.commonName < b.commonName) return -1;
          if (a.commonName > b.commonName) return 1;
          return 0;
        });
        this.setState({ snakes: snakeArray });
      })
      .catch((error) => console.error('error from snakes', error));
    this.setState({ stateId: '' });
  }

  getVenomousSnakes = () => {
    const { snakes } = this.state;
    const venomousSnakes = [];
    for (let i = 0; i < snakes.length; i += 1) {
      if (snakes[i].venomous === true) {
        venomousSnakes.push(snakes[i]);
      }
    }
    this.setState({ snakes: venomousSnakes });
  }

  componentDidMount() {
    this.getSnakes();
  }

  setShowMap = (e) => {
    e.preventDefault();
    this.getSnakes();
    this.setState({ showMap: true });
  }

  closeMap = (e) => {
    this.setState({ showMap: false });
  }


  setMapState = (stateId) => {
    const { snakes } = this.state;
    const snakesByState = [];
    this.setState({ stateId });
    stateSnakesData.getSnakesByState(stateId)
      .then((response) => {
        response.forEach((state) => {
          for (let i = 0; i < snakes.length; i += 1) {
            if (snakes[i].id === state.snakeId) {
              snakesByState.push(snakes[i]);
            }
          }
        });
        snakesByState.sort((a, b) => {
          if (a.commonName < b.commonName) return -1;
          if (a.commonName > b.commonName) return 1;
          return 0;
        });
        this.setState({ snakes: snakesByState });
        this.setState({ showMap: false });
      })
      .catch((error) => console.error('from set map state', error));
  }

  filterHeadShape = (selectedHeadOption) => {
    const { snakes } = this.state;
    const filteredSnakes = [];
    if (selectedHeadOption !== 'null') {
      for (let i = 0; i < snakes.length; i += 1) {
        if (snakes[i].headShape === selectedHeadOption) {
          filteredSnakes.push(snakes[i]);
        }
      }
      this.setState({ snakes: filteredSnakes });
    }
  }

  filterBodyShape = (selectedBodyOption) => {
    const { snakes } = this.state;
    const filteredSnakes = [];
    if (selectedBodyOption !== 'null') {
      for (let i = 0; i < snakes.length; i += 1) {
        if (snakes[i].bodyShape === selectedBodyOption) {
          filteredSnakes.push(snakes[i]);
        }
      }
      this.setState({ snakes: filteredSnakes });
    }
  }

  filterTailShape = (selectedTailOption) => {
    const { snakes } = this.state;
    const filteredSnakes = [];
    if (selectedTailOption !== 'null') {
      for (let i = 0; i < snakes.length; i += 1) {
        if (snakes[i].tailShape === selectedTailOption) {
          filteredSnakes.push(snakes[i]);
        }
      }
      this.setState({ snakes: filteredSnakes });
    }
  }

  filterBodyColor = (bodyColor, markShape, markColor) => {
    const { snakes } = this.state;
    let filteredSnakes = [];
    const markShapeFilter = [];
    const markColorFilter = [];
    if (bodyColor !== 'null') {
      if (bodyColor.includes(',')) {
        const colors = bodyColor.split(', ');
        for (let j = 0; j < colors.length; j += 1) {
          for (let i = 0; i < snakes.length; i += 1) {
            if (snakes[i].baseColor.includes(colors[j])) {
              filteredSnakes.push(snakes[i]);
            }
          }
        }
      } else {
        for (let k = 0; k < snakes.length; k += 1) {
          if (snakes[k].baseColor.includes(bodyColor)) {
            filteredSnakes.push(snakes[k]);
          }
        }
      }
      const reducedSnakes = [...new Set(filteredSnakes)];
      this.setState({ snakes: reducedSnakes });
    }
    if (markShape !== 'null' && bodyColor === 'null') {
      for (let l = 0; l < snakes.length; l += 1) {
        if (snakes[l].markShape === markShape) {
          filteredSnakes.push(snakes[l]);
        }
      }
    } else if (markShape !== 'null' && bodyColor !== 'null') {
      for (let m = 0; m < filteredSnakes.length; m += 1) {
        if (filteredSnakes[m].markShape === markShape) {
          markShapeFilter.push(filteredSnakes[m]);
          filteredSnakes = markShapeFilter;
        }
      }
      const reducedSnakes = [...new Set(filteredSnakes)];
      this.setState({ snakes: reducedSnakes });
    }
    if (markColor !== 'null' && bodyColor === 'null' && markShape === 'null') {
      for (let l = 0; l < snakes.length; l += 1) {
        if (snakes[l].markColor === markColor) {
          filteredSnakes.push(snakes[l]);
        }
      }
    } else if (markColor !== 'null' && bodyColor !== 'null') {
      for (let m = 0; m < filteredSnakes.length; m += 1) {
        if (filteredSnakes[m].markColor === markColor) {
          markColorFilter.push(filteredSnakes[m]);
          filteredSnakes = markColorFilter;
        }
      }
    } else if (markColor !== 'null' && markShape !== 'null') {
      for (let m = 0; m < filteredSnakes.length; m += 1) {
        if (filteredSnakes[m].markColor === markColor) {
          markColorFilter.push(filteredSnakes[m]);
          filteredSnakes = markColorFilter;
        }
      }
      const reducedSnakes = [...new Set(filteredSnakes)];
      this.setState({ snakes: reducedSnakes });
    }
  }


  render() {
    return (
      <div className="Snakes">
        <h1>Snakes of North America</h1>
        {/* <div className="container">
          <form className="row justify-content-center">
            <div className="form-group">
              <div className="form-inline">
                <input
                type="text"
                className="form-control m-1"
                id="search-bar"
                placeholder="Search...">
                </input>
                <label htmlFor="search-bar" className="col-form-label"><button className="btn btn-outline-secondary searchButton"><i className="fas fa-search"></i></button></label>
              </div>
            </div>
          </form>
        </div> */}
        { this.state.stateId !== '' ? (<h4>Currently viewing snakes of {this.state.stateId}</h4>) : ('')}
        <button className="btn btn-dark mb-3 mr-3 mt-0" onClick={this.getSnakes}>View All / Reset Filter</button>
        <button className="btn btn-dark mb-3 mr-3 mt-0" onClick={this.getVenomousSnakes}>View Venomous</button>
        <button className="btn btn-dark mb-3 mt-0" onClick={this.setShowMap}>Filter By State</button>
        { this.state.showMap && <StateMap closeMap={this.closeMap} setMapState={this.setMapState} showMap={this.state.showMap} />}
        <button className="btn btn-dark mb-3 ml-3 mt-0" onClick={this.setShowForm}>Filter By Appearance</button>
        { this.state.showForm && <SnakeForm
        showForm={this.state.showForm}
        setCloseForm={this.setCloseForm}
        filterHeadShape={this.filterHeadShape}
        filterBodyShape={this.filterBodyShape}
        filterTailShape={this.filterTailShape}
        snakes={this.state.snakes}
        filterBodyColor={this.filterBodyColor}
        />}
        <div className="snakeContainer container d-flex flex-wrap">
          {this.state.snakes.map((snake) => <Snake key={snake.id} snake={snake} />)}
        </div>
      </div>
    );
  }
}

export default Snakes;
