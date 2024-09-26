import PropTypes from 'prop-types';

const profileShape = PropTypes.shape({
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  location: PropTypes.string,
  imageUrl: PropTypes.string,
  userName: PropTypes.string,
  uid: PropTypes.string,
  id: PropTypes.string,
});

export default { profileShape };
