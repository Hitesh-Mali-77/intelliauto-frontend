// import React, { useState, useEffect } from "react";
// import { _getAllAccessory } from "../../../services/accessoryService";

// const EmployeeDashboard = () => {
//   const [myAccessories, setMyAccessories] = useState([]);
//   const currentUser = JSON.parse(sessionStorage.getItem("user"));

//   useEffect(() => {
//     _getAllAccessory().then((result) => {
//       const myItems = result.data.filter(
//         (item) => item.emailId === currentUser.emailId,
//       );
//       setMyAccessories(myItems);
//     });
//   }, []);

//   const cardStyle = {
//     borderRadius: "10px",
//     padding: "30px",
//     color: "white",
//     textAlign: "center",
//     marginBottom: "20px",
//   };

//   return (
//     <div className="container mt-4">
//       <h4>Employee Dashboard</h4>
//       <hr />
//       <div className="row">
//         <div className="col-md-4">
//           <div style={{ ...cardStyle, backgroundColor: "#1976d2" }}>
//             <h2>{myAccessories.length}</h2>
//             <h5>My Total Accessories</h5>
//           </div>
//         </div>
//         <div className="col-md-4">
//           <div style={{ ...cardStyle, backgroundColor: "#2e7d32" }}>
//             <h2>{myAccessories.filter((a) => a.status === "Y").length}</h2>
//             <h5>Active Accessories</h5>
//           </div>
//         </div>
//         <div className="col-md-4">
//           <div style={{ ...cardStyle, backgroundColor: "#ed6c02" }}>
//             <h2>{myAccessories.filter((a) => a.status === "N").length}</h2>
//             <h5>Inactive Accessories</h5>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeDashboard;

import React, { useState, useEffect } from "react";
import { _getAllAccessory } from "../../../services/accessoryService";
import {
  _getAllNotifications,
  _markAsRead,
} from "../../../services/notificationService";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { Button } from "@mui/material";

const EmployeeDashboard = () => {
  const [myAccessories, setMyAccessories] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const currentUser = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    _getAllAccessory().then((result) => {
      const myItems = result.data.filter(
        (item) => item.emailId === currentUser.emailId,
      );
      setMyAccessories(myItems);
    });
    getAllNotifications();
  }, []);

  const getAllNotifications = () => {
    _getAllNotifications().then((result) => {
      setNotifications(result.data);
    });
  };

  const markAsRead = (id) => {
    _markAsRead(id).then(() => {
      getAllNotifications();
    });
  };

  const cardStyle = {
    borderRadius: "10px",
    padding: "30px",
    color: "white",
    textAlign: "center",
    marginBottom: "20px",
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="container mt-4">
      <h4>Employee Dashboard</h4>
      <hr />

      {/* Stats Cards */}
      <div className="row">
        <div className="col-md-4">
          <div style={{ ...cardStyle, backgroundColor: "#1976d2" }}>
            <h2>{myAccessories.length}</h2>
            <h5>My Total Accessories</h5>
          </div>
        </div>
        <div className="col-md-4">
          <div style={{ ...cardStyle, backgroundColor: "#2e7d32" }}>
            <h2>{myAccessories.filter((a) => a.quantity > 0).length}</h2>
            <h5>Active Accessories</h5>
          </div>
        </div>
        <div className="col-md-4">
          <div style={{ ...cardStyle, backgroundColor: "#ed6c02" }}>
            <h2>{myAccessories.filter((a) => a.quantity <= 0).length}</h2>
            <h5>Out of Stock</h5>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="mt-4">
        <h5>
          <NotificationsActiveIcon color="warning" />
          &nbsp; Manager Notifications
          {unreadCount > 0 && (
            <span
              style={{
                background: "red",
                color: "white",
                borderRadius: "50%",
                padding: "2px 8px",
                fontSize: "13px",
                marginLeft: "8px",
              }}
            >
              {unreadCount}
            </span>
          )}
        </h5>
        <hr />

        {notifications.length === 0 ? (
          <p style={{ color: "gray" }}>There are no notifications.</p>
        ) : (
          notifications.map((notification, index) => (
            <div
              key={index}
              style={{
                background: notification.isRead ? "#f5f5f5" : "#fff3e0",
                border: notification.isRead
                  ? "1px solid #ddd"
                  : "1px solid #ff9800",
                borderRadius: "8px",
                padding: "12px 16px",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <p
                  style={{
                    margin: 0,
                    fontWeight: notification.isRead ? "normal" : "bold",
                  }}
                >
                  {notification.message}
                </p>
                <p
                  style={{ margin: "4px 0 0", fontSize: "12px", color: "gray" }}
                >
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </div>
              {!notification.isRead && (
                <Button
                  variant="outlined"
                  color="success"
                  size="small"
                  onClick={() => markAsRead(notification.id)}
                >
                  <DoneAllIcon fontSize="small" /> &nbsp; Mark as Read
                </Button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
