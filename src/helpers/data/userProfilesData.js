import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getProfileByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/userProfiles.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const profileObj = result.data;
      const profile = [];
      if (profileObj != null) {
        Object.keys(profileObj).forEach((profileId) => {
          const newProfile = profileObj[profileId];
          newProfile.id = profileId;
          profile.push(newProfile);
        });
      }
      resolve(profile);
    })
    .catch((err) => {
      reject(err);
    });
});

const getProfileByUserName = (userName) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/userProfiles.json?orderBy="userName"&equalTo="${userName}"`)
    .then((result) => {
      const profileObj = result.data;
      const profile = [];
      if (profileObj != null) {
        Object.keys(profileObj).forEach((profileId) => {
          const newProfile = profileObj[profileId];
          newProfile.id = profileId;
          profile.push(newProfile);
        });
      }
      resolve(profile);
    })
    .catch((err) => {
      reject(err);
    });
});

const saveProfile = (profileInfo) => axios.post(`${baseUrl}/userProfiles.json`, profileInfo);

const updateProfile = (profileId, newProfileInfo) => axios.put(`${baseUrl}/userProfiles/${profileId}.json`, newProfileInfo);

export default {
  getProfileByUid, getProfileByUserName, saveProfile, updateProfile,
};
