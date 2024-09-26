import React from 'react';
import './Home.scss';
import timberRattler from './images/timberRattler.png';

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <div className="container">
          <h1>Welcome to Snakelings</h1>
          <h1>identification and tracking resource!</h1>
          <img src={timberRattler} alt="timber rattler" id="homePic" className="m-3"/>
          <h4>Use our site to identify your local fauna, report or view sightings of snakes, or learn more about species, habitat, and conservation!</h4>
        </div>
      </div>
    );
  }
}

export default Home;
