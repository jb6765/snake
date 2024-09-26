import React from 'react';
import PropTypes, { arrayOf } from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import arrowHead from './images/arrowHead.gif';
import roundHead from './images/roundHead.gif';
import slender from './images/slender.PNG';
import medium from './images/medium.PNG';
import stocky from './images/Stocky.PNG';
import longTail from './images/longTail.PNG';
import shortTail from './images/shortTail.PNG';
import rattle from './images/rattle.PNG';

import './SnakeForm.scss';
import snakeShape from '../../../helpers/propz/snakeShape';

class SnakeForm extends React.Component {
  static propTypes = {
    setCloseForm: PropTypes.func,
    filterHeadShape: PropTypes.func,
    filterBodyShape: PropTypes.func,
    filterTailShape: PropTypes.func,
    filterBodyColor: PropTypes.func,
    snakes: arrayOf(snakeShape.snakeShape),
    showForm: PropTypes.bool,
  }

  state = {
    selectionHeadOption: 'null',
    selectedBodyOption: 'null',
    selectedTailOption: 'null',
    selectedBaseColor: 'null',
    selectedMarkingShape: 'null',
    selectedMarkingColor: 'null',
    selectedSecondaryColor: 'null',
    headShape: true,
    bodyShape: false,
    tailShape: false,
    baseColor: false,
    markings: false,
  }

  changeMarkingState = (e) => {
    const checkedValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({ markings: checkedValue });
  }


  headOptionChange = (e) => {
    this.setState({ selectionHeadOption: e.target.value });
  }

  bodyOptionChange = (e) => {
    this.setState({ selectedBodyOption: e.target.value });
  }

  tailOptionChange = (e) => {
    this.setState({ selectedTailOption: e.target.value });
  }

  baseColorChange = (e) => {
    e.preventDefault();
    this.setState({ selectedBaseColor: e.target.value });
  }

  secondaryColorChange = (e) => {
    e.preventDefault();
    this.setState({ selectedSecondaryColor: e.target.value });
  }

  markColorChange = (e) => {
    e.preventDefault();
    this.setState({ selectedMarkingColor: e.target.value });
  }

  markShapeChange = (e) => {
    e.preventDefault();
    this.setState({ selectedMarkingShape: e.target.value });
  }

  filterBodyColorEvent = (e) => {
    const {
      selectedBaseColor,
      selectedMarkingColor,
      selectedMarkingShape,
    } = this.state;
    e.preventDefault();
    this.props.filterBodyColor(selectedBaseColor, selectedMarkingShape, selectedMarkingColor);
    this.props.setCloseForm();
  }

  filterTailShapeEvent = () => {
    this.props.filterTailShape(this.state.selectedTailOption);
    this.setState({ tailShape: false });
    this.setState({ baseColor: true });
  }

  finishOnTailShape = () => {
    this.filterTailShapeEvent();
    this.props.setCloseForm();
  }

  filterBodyShapeEvent = () => {
    this.props.filterBodyShape(this.state.selectedBodyOption);
    this.setState({ bodyShape: false });
    this.setState({ tailShape: true });
  }

  finishOnBodyShape = () => {
    this.filterBodyShapeEvent();
    this.props.setCloseForm();
  }

  filterHeadShapeEvent = () => {
    this.props.filterHeadShape(this.state.selectionHeadOption);
    this.setState({ headShape: false });
    this.setState({ bodyShape: true });
  }

  finishOnHeadShape = () => {
    this.filterHeadShapeEvent();
    this.props.setCloseForm();
  }

  showBaseBodyColor = () => {
    const { snakes } = this.props;
    const snakeColors = [];
    const snakeMarkShapes = [];
    const snakeMarkColors = [];
    const { markings } = this.state;

    snakes.forEach((snake) => {
      snakeColors.push(snake.baseColor);
      if (snake.markShape !== '') {
        snakeMarkShapes.push(snake.markShape);
      }
      if (snake.markColor !== '') {
        snakeMarkColors.push(snake.markColor);
      }
    });

    const reducedBaseColors = [...new Set(snakeColors)];
    const reducedMarkShapes = [...new Set(snakeMarkShapes)];
    const reducedMarkColors = [...new Set(snakeMarkColors)];

    return (
    <div className="baseBody">
      <div className="form-inline d-flex justify-content-center">
          <div className="form-group row">
            <label htmlFor="base-color" className="col-form-label">Select Main Body Color</label>
              <select
                type="select"
                className="custom-select m-2"
                id="base-color"
                onChange={this.baseColorChange}
                >
                    <option value='null'>Unknown</option>
                  {reducedBaseColors.map((color) => (<option key={color} value={color}>{color}</option>))}
            </select>
          </div>
        </div>
        <div className="form-inline d-flex justify-content-center">
          <div className="form-check">
            <input type="checkbox"
            className="form-check-input m-2"
            id="has-markings"
            checked={markings}
            onChange={this.changeMarkingState}>
            </input>
            <label htmlFor="has-markings">Markings?</label>
          </div>
        </div>
        <div className="form-inline d-flex justify-content-center">
          <div className="form-group row">
            <label htmlFor="marking-shape" className="col-form-label">Select Marking Shape</label>
            <select
              type="select"
              className="custom-select m-2"
              id="marking-shape"
              onChange={this.markShapeChange}
              disabled={markings ? null : 'disabled'}
              >
                    <option value='null'>Unknown</option>
                  {reducedMarkShapes.map((shape) => (<option key={shape} value={shape}>{shape}</option>))}
            </select>
          </div>
        </div>
        <div className="form-inline d-flex justify-content-center">
          <div className="form-group row">
            <label htmlFor="marking-color" className="col-form-label">Select Marking Color</label>
            <select
              type="select"
              className="custom-select m-2"
              id="marking-color"
              onChange={this.markColorChange}
              disabled={markings ? null : 'disabled'}
              >
                    <option value='null'>Unknown</option>
                  {reducedMarkColors.map((color) => (<option key={color} value={color}>{color}</option>))}
            </select>
          </div>
        </div>
        <div className="row justify-content-around">
          <button className="btn btn-dark" onClick={this.filterBodyColorEvent}>Finish</button>
      </div>
    </div>
    );
  }

  showTailShape = () => (
    <div className="tailShape">
      <h5>Select a Tail Shape</h5>
      <div className="form-check form-check-inline m-5">
      <input
      className="form-check-input"
      type="radio"
      name="tailOptions"
      id="tailOption1"
      value="long"
      checked={ this.state.selectedTailOption === 'long'}
      onChange={this.tailOptionChange}></input>
      <label className="form-check-label" htmlFor="tailOption1"><img className="tailOptionImg" src={`${longTail}`} alt="long"/></label>
    </div>
    <div className="form-check form-check-inline m-5">
      <input
      className="form-check-input"
      type="radio"
      name="tailOptions"
      id="tailOption2"
      value="short"
      checked={ this.state.selectedTailOption === 'short'}
      onChange={this.tailOptionChange}></input>
      <label className="form-check-label" htmlFor="tailOption2"><img className="tailOptionImg" src={`${shortTail}`} alt="short"/></label>
    </div>
    <div className="form-check form-check-inline m-5">
      <input
      className="form-check-input"
      type="radio"
      name="tailOptions"
      id="tailOption3"
      value="rattle"
      checked={ this.state.selectedTailOption === 'rattle'}
      onChange={this.tailOptionChange}></input>
      <label className="form-check-label" htmlFor="tailOption3"><img className="tailOptionImg" src={`${rattle}`} alt="rattle"/></label>
    </div>
    <div className="form-check form-check-inline m-5">
      <input
      className="form-check-input"
      type="radio"
      name="tailOptions"
      id="tailOption4"
      value="null"
      checked={ this.state.selectedTailOption === 'null'}
      onChange={this.tailOptionChange}></input>
      <label className="form-check-label" htmlFor="tailOption4">Unknown</label>
    </div>
    <div className="row justify-content-around">
    <button className="btn btn-dark" onClick={this.finishOnTailShape}>Finish and Close</button>
    <button className="btn btn-dark" onClick={this.filterTailShapeEvent}>Next</button>
    </div>
    </div>
  )

  showBodyShape = () => (
    <div className="bodyShape">
      <h5>Select a Body Shape</h5>
      <div className="form-check form-check-inline m-5">
      <input
      className="form-check-input"
      type="radio"
      name="bodyOptions"
      id="bodyOption1"
      value="slender"
      checked={ this.state.selectedBodyOption === 'slender'}
      onChange={this.bodyOptionChange}></input>
      <label className="form-check-label" htmlFor="bodyOption1"><img className="bodyOptionImg" src={`${slender}`} alt="slender"/></label>
    </div>
    <div className="form-check form-check-inline m-5">
      <input
      className="form-check-input"
      type="radio"
      name="bodyOptions"
      id="bodyOption2"
      value="medium"
      checked={ this.state.selectedBodyOption === 'medium'}
      onChange={this.bodyOptionChange}></input>
      <label className="form-check-label" htmlFor="bodyOption2"><img className="bodyOptionImg" src={`${medium}`} alt="medium"/></label>
    </div>
    <div className="form-check form-check-inline m-5">
      <input
      className="form-check-input"
      type="radio"
      name="bodyOptions"
      id="bodyOption3"
      value="stocky"
      checked={ this.state.selectedBodyOption === 'stocky'}
      onChange={this.bodyOptionChange}></input>
      <label className="form-check-label" htmlFor="bodyOption3"><img className="bodyOptionImg" src={`${stocky}`} alt="stocky"/></label>
    </div>
    <div className="form-check form-check-inline m-5">
      <input
      className="form-check-input"
      type="radio"
      name="bodyOptions"
      id="bodyOption4"
      value="null"
      checked={ this.state.selectedBodyOption === 'null'}
      onChange={this.bodyOptionChange}></input>
      <label className="form-check-label" htmlFor="bodyOption4">Unknown</label>
    </div>
    <div className="row justify-content-around">
    <button className="btn btn-dark" onClick={this.finishOnBodyShape}>Finish and Close</button>
    <button className="btn btn-dark" onClick={this.filterBodyShapeEvent}>Next</button>
    </div>
    </div>
  )

  showHeadShape = () => (
  <div className="headShape">
    <h5>Select a Head Shape</h5>
    <div className="form-check form-check-inline m-5">
      <input
      className="form-check-input"
      type="radio"
      name="headOptions"
      id="headOption1"
      value="arrow"
      checked={ this.state.selectionHeadOption === 'arrow'}
      onChange={this.headOptionChange}></input>
      <label className="form-check-label" htmlFor="headOption1"><img src={`${arrowHead}`} alt="arrow"/></label>
    </div>
    <div className="form-check form-check-inline m-5">
      <input
      className="form-check-input"
      type="radio"
      name="headOptions"
      id="headOption2"
      value="round"
      checked={ this.state.selectionHeadOption === 'round'}
      onChange={this.headOptionChange}></input>
      <label className="form-check-label" htmlFor="headOption2"><img src={`${roundHead}`} alt="round"/></label>
    </div>
    <div className="form-check form-check-inline m-5">
      <input
      className="form-check-input"
      type="radio"
      name="headOptions"
      id="headOption3"
      value="null"
      checked={ this.state.selectionHeadOption === 'null'}
      onChange={this.headOptionChange}></input>
      <label className="form-check-label" htmlFor="headOption3">Unknown</label>
    </div>
    <div className="row justify-content-around">
    <button className="btn btn-dark" onClick={this.finishOnHeadShape}>Finish and Close</button>
    <button className="btn btn-dark" onClick={this.filterHeadShapeEvent}>Next</button>
    </div>
  </div>)


  render() {
    return (
      <div className="SnakeForm">
        <Modal show={this.props.showForm} onHide={this.props.setCloseForm} size="lg">
          <Modal.Header closeButton><h3 className="m-3">Select Snake Features</h3></Modal.Header>
           <Modal.Body>
            {this.state.headShape && this.showHeadShape()}
            {this.state.bodyShape && this.showBodyShape()}
            {this.state.tailShape && this.showTailShape()}
            {this.state.baseColor && this.showBaseBodyColor()}
          </Modal.Body>
      </Modal>
    </div>
    );
  }
}

export default SnakeForm;
