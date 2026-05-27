import axios from "axios";

// const devUrl = 'http://localhost:8080/accessory'
const devUrl =
  "https://intelliauto-backend-production.up.railway.app/accessory";
// const devUrl = process.env

const { REACT_APP_URL, REACT_APP_ENV_NAME } = process.env;
// const devUrl = REACT_APP_URL + '/' + 'accessory'

console.log(REACT_APP_URL);
console.log(REACT_APP_ENV_NAME);

export const _getAllAccessory = () => {
  return axios.get(devUrl + "/" + "all");
};

export const _getAllActiveAccessory = () => {
  return axios.get(devUrl + "/" + "active" + "/" + "all");
};

export const _createAccessory = (accessory) => {
  return axios.post(devUrl + "/" + "create", accessory);
};

export const _getCurrentAccessoryById = (id) => {
  return axios.get(devUrl + "/" + "current" + "/" + id);
};

export const _updateAccessory = (accessory) => {
  return axios.put(devUrl + "/" + "update", accessory);
};

export const _deleteAccessory = (id) => {
  return axios.delete(devUrl + "/" + "delete" + "/" + id);
};
