import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllStates = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/states.json`)
    .then((result) => {
      const allStatesObj = result.data;
      const states = [];
      if (allStatesObj != null) {
        Object.keys(allStatesObj).forEach((stateId) => {
          const newState = allStatesObj[stateId];
          newState.id = stateId;
          states.push(newState);
        });
      }
      resolve(states);
    })
    .catch((err) => {
      reject(err);
    });
});

const getStateById = (stateId) => axios.get(`${baseUrl}/states/${stateId}.json`);

export default { getStateById, getAllStates };
