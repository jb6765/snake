import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllSightings = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/sightings.json`)
    .then((result) => {
      const allSightingsObj = result.data;
      const sightings = [];
      if (allSightingsObj != null) {
        Object.keys(allSightingsObj).forEach((sightingId) => {
          const newSighting = allSightingsObj[sightingId];
          newSighting.id = sightingId;
          sightings.push(newSighting);
        });
      }
      resolve(sightings);
    })
    .catch((error) => reject(error));
});

const getSightingsBySnakeId = (snakeId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/sightings.json?orderBy="snakeId"&equalTo="${snakeId}"`)
    .then((result) => {
      const allSightingsObj = result.data;
      const sightings = [];
      if (allSightingsObj != null) {
        Object.keys(allSightingsObj).forEach((sightingId) => {
          const newSighting = allSightingsObj[sightingId];
          newSighting.id = sightingId;
          sightings.push(newSighting);
        });
      }
      resolve(sightings);
    })
    .catch((err) => {
      reject(err);
    });
});

const getSightingsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/sightings.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const allSightingsObj = result.data;
      const sightings = [];
      if (allSightingsObj != null) {
        Object.keys(allSightingsObj).forEach((sightingId) => {
          const newSighting = allSightingsObj[sightingId];
          newSighting.id = sightingId;
          sightings.push(newSighting);
        });
      }
      resolve(sightings);
    })
    .catch((err) => {
      reject(err);
    });
});

const getSingleSighting = (sightingId) => axios.get(`${baseUrl}/sightings/${sightingId}.json`);

const saveSighting = (sightingInfo) => axios.post(`${baseUrl}/sightings.json`, sightingInfo);

const updateSighting = (sightingId, newSightingInfo) => axios.put(`${baseUrl}/sightings/${sightingId}.json`, newSightingInfo);

const deleteSighting = (sightingId) => axios.delete(`${baseUrl}/sightings/${sightingId}.json`);

export default {
  getAllSightings,
  getSightingsByUid,
  saveSighting,
  getSingleSighting,
  updateSighting,
  deleteSighting,
  getSightingsBySnakeId,
};
