import PropTypes from 'prop-types';

const sightingShape = PropTypes.shape({
  id: PropTypes.string,
  identified: PropTypes.bool,
  snakeId: PropTypes.string,
  stateId: PropTypes.string,
  county: PropTypes.string,
  imageUrl: PropTypes.string,
  uid: PropTypes.string,
  dateFound: PropTypes.string,
  description: PropTypes.string,
});

export default { sightingShape };
