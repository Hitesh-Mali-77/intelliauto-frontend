import axios from "axios";

// const devUrl = "http://localhost:8080/user";
const devUrl = "https://intelliauto-backend-production.up.railway.app/user";

const { REACT_APP_URL, REACT_APP_ENV_NAME } = process.env;
// const devUrl = REACT_APP_URL + '/' + 'user'

console.log(REACT_APP_URL);
console.log(REACT_APP_ENV_NAME);

export const _getAllUser = () => {
  return axios.get(devUrl + "/" + "all");
};

export const _getCurrentUserById = (id) => {
  return axios.get(devUrl + "/" + "current" + "/" + id);
};

export const _createUser = (currentUser) => {
  return axios.post(devUrl + "/" + "create", currentUser);
};

export const _getDeleteUserById = (id) => {
  return axios.delete(devUrl + "/" + "delete" + "/" + id);
};

export const _getEmployeeEmailIdById = (id) => {
  return axios.get(devUrl + "/" + id).then((result) => {
    return result.data.emailId;
  });
};

export const _checkCurrentLoginUser = (loginUser) => {
  return axios.post(devUrl + "/" + "checkLogin", loginUser);
};

export const _updateUser = (user) => {
  return axios.put(devUrl + "/" + "update", user);
};
export const _changePassword = (data) => {
  return axios.put(devUrl + "/changePassword", data);
};
