import React from 'react';
import USAMap from 'react-usa-map';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';

import './StateMap.scss';

class SnakeForm extends React.Component {
  static propTypes = {
    closeMap: PropTypes.func,
    setMapState: PropTypes.func,
    showMap: PropTypes.bool,
  }

  mapHandler = (e) => {
    this.props.setMapState(e.target.dataset.name);
  }


  render() {
    return (
      <div className="StateMap">
        <Modal show={this.props.showMap} size="xl" onHide={this.props.closeMap}>
        <Modal.Header closeButton>
          <Modal.Title>Select A State</Modal.Title>
        </Modal.Header>
          <div className="d-flex justify-content-center">
            <USAMap onClick={this.mapHandler} width="90%"/>
          </div>
        </Modal>
      </div>
    );
  }
}

export default SnakeForm;
