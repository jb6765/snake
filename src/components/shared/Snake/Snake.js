import React from 'react';
import { Link } from 'react-router-dom';
import snakeShape from '../../../helpers/propz/snakeShape';
import './Snake.scss';

class Snake extends React.Component {
  static propTypes = {
    snake: snakeShape.snakeShape,
  }

  render() {
    const { snake } = this.props;

    return (
      <div className="Snake col-4 mb-2">
        <div className="card h-100">
          <div className="card-body">
            <img className="card-img-top snakeImage" src={snake.imageUrl} alt={snake.commonName} />
            <h5 className="card-title">{snake.commonName}</h5>
            <h6><em>{snake.scientificName}</em></h6>
          </div>
          <div className="card-footer">
            <Link className="btn btn-dark" to={`/snakes/${snake.id}`}>Learn More</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Snake;
