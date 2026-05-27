import axios from "axios";

// const devUrl = "http://localhost:8080/order";
const devUrl = "https://intelliauto-backend-production.up.railway.app/user";

export const _createOrder = (order) => {
  return axios.post(devUrl + "/create", order);
};

export const _getAllPendingOrders = () => {
  return axios.get(devUrl + "/pending");
};

export const _getOrdersByCustomerEmail = (email) => {
  return axios.get(devUrl + "/customer/" + email);
};

export const _sellOrder = (data) => {
  return axios.post(devUrl + "/sell", data);
};

export const _getInvoicesByCustomerEmail = (email) => {
  return axios.get(devUrl + "/invoice/" + email);
};

export const _searchCustomers = (search) => {
  return axios.get(
    "https://intelliauto-backend-production.up.railway.app" + search,
  );
};
