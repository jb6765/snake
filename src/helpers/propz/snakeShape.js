import PropTypes from 'prop-types';

const snakeShape = PropTypes.shape({
  id: PropTypes.string,
  commonName: PropTypes.string,
  scientificName: PropTypes.string,
  imageUrl: PropTypes.string,
  venomous: PropTypes.bool,
  diet: PropTypes.string,
  size: PropTypes.string,
  conservationStatus: PropTypes.string,
  description: PropTypes.string,
  headShape: PropTypes.string,
  bodyShape: PropTypes.string,
  tailShape: PropTypes.string,
  baseColor: PropTypes.string,
  markings: PropTypes.bool,
  markColor: PropTypes.string,
  markShape: PropTypes.string,
  scaleTexture: PropTypes.string,
  secondaryColor: PropTypes.string,
});

export default { snakeShape };
