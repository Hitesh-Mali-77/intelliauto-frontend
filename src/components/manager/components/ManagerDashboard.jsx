import React, { useState, useEffect } from "react";
import { _getAllAccessory } from "../../../services/accessoryService";
import { _getAllCategory } from "../../../services/categoryService";
// import { _getStockPrediction } from "../../../services/sellingService";
import {
  _getStockPrediction,
  _deleteStockPrediction,
} from "../../../services/sellingService";

const ManagerDashboard = () => {
  const [accessories, setAccessories] = useState([]);
  const [categoryCount, setCategoryCount] = useState(0);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    _getAllAccessory().then((result) => setAccessories(result.data));
    _getAllCategory().then((result) => setCategoryCount(result.data.length));
    _getStockPrediction().then((result) => setPredictions(result.data));
  }, []);

  const cardStyle = {
    borderRadius: "10px",
    padding: "30px",
    color: "white",
    textAlign: "center",
    marginBottom: "20px",
  };
  const removePredictionCard = (id) => {
    _deleteStockPrediction(id)
      .then(() => {
        const filteredCards = predictions.filter((item) => item.id !== id);

        setPredictions(filteredCards);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container mt-4">
      <h4>Manager Dashboard</h4>
      <hr />
      <div className="row">
        <div className="col-md-4">
          <div style={{ ...cardStyle, backgroundColor: "#1976d2" }}>
            <h2>{accessories.length}</h2>
            <h5>Total Accessories</h5>
          </div>
        </div>
        <div className="col-md-4">
          <div style={{ ...cardStyle, backgroundColor: "#2e7d32" }}>
            <h2>{accessories.filter((a) => a.status === "Y").length}</h2>
            <h5>Active Accessories</h5>
          </div>
        </div>
        <div className="col-md-4">
          <div style={{ ...cardStyle, backgroundColor: "#ed6c02" }}>
            <h2>{categoryCount}</h2>
            <h5>Total Categories</h5>
          </div>
        </div>
      </div>
      <h4 className="mt-4">Smart Stock Prediction</h4>

      <div className="row">
        {predictions.map((item, index) => (
          <div className="col-md-4" key={index}>
            <div
              style={{
                borderRadius: "10px",
                padding: "20px",
                color: "white",
                marginBottom: "20px",
                backgroundColor:
                  item.status === "Urgent"
                    ? "#d32f2f"
                    : item.status === "Warning"
                      ? "#ed6c02"
                      : "#2e7d32",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <span
                  style={{
                    cursor: "pointer",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                  onClick={() => removePredictionCard(item.id)}
                >
                  ×
                </span>
              </div>
              <h5>{item.name}</h5>

              <p>
                Predicted Days Left:
                <strong> {item.predictedDays}</strong>
              </p>

              <p>
                Average Sale:
                <strong> {item.averageSale}</strong>
              </p>

              <p>
                Status:
                <strong> {item.status}</strong>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagerDashboard;
