import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getSnakesByState = (stateId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/stateSnakes.json?orderBy="stateId"&equalTo="${stateId}"`)
    .then((result) => {
      const allStateSnakeObj = result.data;
      const stateSnakes = [];
      if (allStateSnakeObj != null) {
        Object.keys(allStateSnakeObj).forEach((stateSnakeId) => {
          const newStateSnake = allStateSnakeObj[stateSnakeId];
          newStateSnake.id = stateSnakeId;
          stateSnakes.push(newStateSnake);
        });
        resolve(stateSnakes);
      }
    })
    .catch((err) => {
      reject(err);
    });
});

export default { getSnakesByState };
