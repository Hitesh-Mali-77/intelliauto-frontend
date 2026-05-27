import React, { useState, useEffect } from "react";
import { _getAllUser } from "../../../services/userService";
import { _getAllCategory } from "../../../services/categoryService";
import { _getAllAccessory } from "../../../services/accessoryService";

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [accessoryCount, setAccessoryCount] = useState(0);

  useEffect(() => {
    _getAllUser().then((result) => setUserCount(result.data.length));
    _getAllCategory().then((result) => setCategoryCount(result.data.length));
    _getAllAccessory().then((result) => setAccessoryCount(result.data.length));
  }, []);

  const cardStyle = {
    borderRadius: "10px",
    padding: "30px",
    color: "white",
    textAlign: "center",
    marginBottom: "20px",
  };

  return (
    <div className="container mt-4">
      <h4>Admin Dashboard</h4>
      <hr />
      <div className="row">
        <div className="col-md-4">
          <div style={{ ...cardStyle, backgroundColor: "#1976d2" }}>
            <h2>{userCount}</h2>
            <h5>Total Users</h5>
          </div>
        </div>
        <div className="col-md-4">
          <div style={{ ...cardStyle, backgroundColor: "#2e7d32" }}>
            <h2>{categoryCount}</h2>
            <h5>Total Categories</h5>
          </div>
        </div>
        <div className="col-md-4">
          <div style={{ ...cardStyle, backgroundColor: "#ed6c02" }}>
            <h2>{accessoryCount}</h2>
            <h5>Total Accessories</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
