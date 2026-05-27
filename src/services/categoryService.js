import axios from "axios";

// const devUrl = 'http://localhost:8080/category'
const devUrl = "https://intelliauto-backend-production.up.railway.app/category";

const { REACT_APP_URL, REACT_APP_ENV_NAME } = process.env;
// const devUrl = REACT_APP_URL + '/' + 'category'

console.log(REACT_APP_URL);
console.log(REACT_APP_ENV_NAME);

export const _getAllCategory = () => {
  return axios.get(devUrl + "/" + "all");
};

export const _createCategory = (category) => {
  return axios.post(devUrl + "/" + "create", category);
};

export const _getCurrentCategoryById = (id) => {
  return axios.get(devUrl + "/" + "current" + "/" + id);
};

export const _updateCategory = (category) => {
  return axios.put(devUrl + "/" + "update", category);
};

export const _deleteCategory = (id) => {
  return axios.delete(devUrl + "/" + "delete" + "/" + id);
};
