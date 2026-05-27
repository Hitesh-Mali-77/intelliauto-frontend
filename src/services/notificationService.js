import axios from "axios";

// const devUrl = "http://localhost:8080/notification";
const devUrl =
  "https://intelliauto-backend-production.up.railway.app/notification";

export const _createNotification = (notification) => {
  return axios.post(devUrl + "/create", notification);
};

export const _getAllNotifications = () => {
  return axios.get(devUrl + "/all");
};

export const _markAsRead = (id) => {
  return axios.put(devUrl + "/read/" + id);
};

export const _getUnreadCount = () => {
  return axios.get(devUrl + "/unread");
};
