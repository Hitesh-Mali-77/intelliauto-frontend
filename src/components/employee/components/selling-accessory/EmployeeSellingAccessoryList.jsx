import React from "react";
import { useNavigate } from "react-router-dom";
import {
  _getAllPendingOrders,
  _sellOrder,
} from "../../../../services/orderService";
import { Button } from "@mui/material";
import SellIcon from "@mui/icons-material/Sell";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const EmployeeSellingAccessoryList = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const [pendingOrders, setPendingOrders] = React.useState([]);

  React.useEffect(() => {
    getAllPendingOrders();
  }, []);

  const getAllPendingOrders = () => {
    _getAllPendingOrders().then((result) => {
      setPendingOrders(result.data);
    });
  };

  const sellOrder = (order) => {
    _sellOrder({
      orderId: order.id,
      employeeId: currentUser.id,
    })
      .then(() => {
        alert(`Order sold! Invoice created.`);
        getAllPendingOrders();
      })
      .catch((err) => {
        alert(err.response?.data || "Error");
      });
  };

  const addUserStyle = {
    position: "absolute",
    right: "30px",
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => navigate("form")}
        style={addUserStyle}
      >
        <SellIcon /> Manual Selling
      </Button>
      <hr className="auto-hr" />
      <h5>Pending Customer Orders</h5>
      {pendingOrders.length === 0 ? (
        <p style={{ color: "gray" }}>There are no pending orders..</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Customer Email</th>
              <th>Accessory</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingOrders.map((order, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{order.customerEmail}</td>
                <td>{order.accessoryName}</td>
                <td>{order.quantity}</td>
                <td>₹{order.price}</td>
                <td>₹{order.amount}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <span
                    style={{
                      background: "#fff3e0",
                      color: "#e65100",
                      padding: "3px 10px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    ⏳ Pending
                  </span>
                </td>
                <td>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => sellOrder(order)}
                  >
                    <CheckCircleIcon /> Sell
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default EmployeeSellingAccessoryList;
