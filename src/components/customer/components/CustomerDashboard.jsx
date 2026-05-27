import React, { useState, useEffect } from "react";
import { _getAllActiveAccessory } from "../../../services/accessoryService";
import { _createOrder } from "../../../services/orderService";
import { Button, TextField } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Customerdashboard = () => {
  const [accessories, setAccessories] = useState([]);
  const [quantities, setQuantities] = useState({});
  const currentUser = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    _getAllActiveAccessory().then((result) => setAccessories(result.data));
  }, []);

  const handleQuantityChange = (id, value) => {
    setQuantities({ ...quantities, [id]: value });
  };

  const buyAccessory = (accessory) => {
    const qty = parseInt(quantities[accessory.id] || 1);
    if (qty <= 0) {
      alert("Quantity must be at least 1!");
      return;
    }

    const order = {
      customerEmail: currentUser.emailId,
      accessoryName: accessory.name,
      accessoryId: accessory.id,
      quantity: qty,
      price: accessory.price,
      amount: accessory.price * qty,
    };

    _createOrder(order)
      .then(() => {
        // ✅ Correct
        alert(
          `Order placed for ${accessory.name}! Employee will process it soon.`,
        );
        _getAllActiveAccessory().then((result) => setAccessories(result.data));
      })
      .catch((err) => {
        alert(err.response?.data || "Error");
      });
  };

  return (
    <div className="container mt-4">
      <h4>Available Accessories</h4>
      <hr />
      <div className="row">
        {accessories.map((item, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div className="card p-3 shadow">
              <h5>{item.name}</h5>
              <p>
                <b>Company:</b> {item.companyName}
              </p>
              <p>
                <b>Description:</b> {item.description}
              </p>
              <p>
                <b>Price:</b> ₹{item.price}
              </p>
              <p>
                <b>Category:</b> {item.category}
              </p>
              <p>
                <b>Available Stock:</b> {item.quantity}
              </p>
              <TextField
                label="Quantity"
                type="number"
                variant="standard"
                size="small"
                defaultValue={1}
                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                style={{ marginBottom: "10px" }}
              />
              <Button
                variant="contained"
                color="success"
                onClick={() => buyAccessory(item)}
                startIcon={<ShoppingCartIcon />}
              >
                Buy
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customerdashboard;
