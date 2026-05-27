import axios from "axios";

// const devUrl = "http://localhost:8080/selling";
const devUrl = "https://intelliauto-backend-production.up.railway.app/selling";

export const _createSelling = (selling) => {
  return axios.post(devUrl + "/create", selling);
};

export const _getAllSelling = () => {
  return axios.get(devUrl + "/all");
};

export const _getSellingByEmployeeId = (id) => {
  return axios.get(devUrl + "/employee/" + id);
};

export const _getStockPrediction = async () => {
  return await axios.get(`${devUrl}/stock-prediction`);
};
export const _deleteStockPrediction = async (id) => {
  return await axios.delete(devUrl + "/stock-prediction/" + id);
};
