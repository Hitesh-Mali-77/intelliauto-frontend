import { Button, TextField } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import SellIcon from "@mui/icons-material/Sell";
import { useNavigate } from "react-router-dom";
import { _getAllActiveAccessory } from "../../../../services/accessoryService";
import { _createSelling } from "../../../../services/sellingService";
import { _searchCustomers } from "../../../../services/orderService";

const EmployeeSellingAccessoryForm = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(sessionStorage.getItem("user"));

  const [customer, setCustomer] = React.useState({
    customerName: "",
    customerEmail: "",
    customerContact: "",
    customerAddress: "",
  });

  const [nameSuggestions, setNameSuggestions] = React.useState([]);
  const [emailSuggestions, setEmailSuggestions] = React.useState([]);
  const [accessoryName, setAccessoryName] = React.useState("");
  const [accessorySuggestions, setAccessorySuggestions] = React.useState([]);
  const [quantity, setQuantity] = React.useState("");
  const [allActiveAccessory, setAllActiveAccessory] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);

  React.useEffect(() => {
    _getAllActiveAccessory().then((result) =>
      setAllActiveAccessory(result.data),
    );
  }, []);

  // Customer Name suggestion
  const handleNameChange = (e) => {
    const value = e.target.value;
    setCustomer({ ...customer, customerName: value });
    if (value.length >= 2) {
      _searchCustomers(value).then((result) => {
        setNameSuggestions(result.data);
      });
    } else {
      setNameSuggestions([]);
    }
  };

  // Customer Email suggestion
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setCustomer({ ...customer, customerEmail: value });
    if (value.length >= 2) {
      _searchCustomers(value).then((result) => {
        setEmailSuggestions(result.data);
      });
    } else {
      setEmailSuggestions([]);
    }
  };

  // Suggestion select केल्यावर form fill होतो
  const selectCustomer = (selected) => {
    setCustomer({
      ...customer,
      customerName: selected.firstName + " " + selected.lastName,
      customerEmail: selected.emailId,
    });
    setNameSuggestions([]);
    setEmailSuggestions([]);
  };

  // Accessory suggestion
  const handleAccessoryChange = (e) => {
    const value = e.target.value;
    setAccessoryName(value);
    if (value.length >= 1) {
      const filtered = allActiveAccessory.filter((a) =>
        a.name.toLowerCase().startsWith(value.toLowerCase()),
      );
      setAccessorySuggestions(filtered);
    } else {
      setAccessorySuggestions([]);
    }
  };

  const selectAccessory = (accessory) => {
    setAccessoryName(accessory.name);
    setAccessorySuggestions([]);
  };

  const addToCart = () => {
    if (!accessoryName || !quantity) {
      alert("Accessory Name आणि Quantity भरा!");
      return;
    }
    const found = allActiveAccessory.find(
      (a) => a.name.toLowerCase() === accessoryName.toLowerCase(),
    );
    if (!found) {
      alert("हे accessory सापडले नाही!");
      return;
    }
    const amount = found.price * parseInt(quantity);
    setCartItems([
      ...cartItems,
      {
        name: found.name,
        quantity: parseInt(quantity),
        price: found.price,
        amount: amount,
      },
    ]);
    setAccessoryName("");
    setQuantity("");
    setAccessorySuggestions([]);
  };

  const removeFromCart = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.amount, 0);

  const submitSelling = () => {
    if (!customer.customerName || !customer.customerEmail) {
      alert("Fill in Customer Name and Email!");
      return;
    }
    if (cartItems.length === 0) {
      alert("Add at least one accessory!");
      return;
    }

    const promises = cartItems.map((item) => {
      return _createSelling({
        customerName: customer.customerName,
        customerEmail: customer.customerEmail,
        customerContact: customer.customerContact,
        customerAddress: customer.customerAddress,
        accessoryName: item.name,
        quantity: item.quantity,
        price: item.price,
        amount: item.amount,
        employeeId: currentUser.id,
      });
    });

    Promise.all(promises)
      .then(() => {
        alert("Selling Successfully Done! Invoice Generated");
        navigate("/employee/selling-accessories");
      })
      .catch((err) => {
        alert(err.response?.data || "Error ");
      });
  };

  const suggestionStyle = {
    position: "absolute",
    background: "white",
    border: "1px solid #ddd",
    borderRadius: "4px",
    zIndex: 1000,
    width: "100%",
    maxHeight: "150px",
    overflowY: "auto",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  };

  const suggestionItemStyle = {
    padding: "8px 12px",
    cursor: "pointer",
    fontSize: "14px",
    borderBottom: "1px solid #f0f0f0",
  };

  return (
    <>
      <Button
        variant="contained"
        color="success"
        style={{ position: "absolute", right: "30px" }}
        onClick={submitSelling}
      >
        <SellIcon /> Sell
      </Button>
      <hr className="auto-hr" />

      <div className="row">
        {/* Customer Details */}
        <div
          className="col-md-3 border border-info"
          style={{ padding: "15px" }}
        >
          <h6 className="selling-accessory-title">Customer Details</h6>

          {/* Name with suggestion */}
          <div style={{ position: "relative" }}>
            <TextField
              label="Name"
              variant="standard"
              className="w-100"
              value={customer.customerName}
              onChange={handleNameChange}
            />
            {nameSuggestions.length > 0 && (
              <div style={suggestionStyle}>
                {nameSuggestions.map((s, i) => (
                  <div
                    key={i}
                    style={suggestionItemStyle}
                    onMouseDown={() => selectCustomer(s)}
                    onMouseEnter={(e) =>
                      (e.target.style.background = "#f5f5f5")
                    }
                    onMouseLeave={(e) => (e.target.style.background = "white")}
                  >
                    👤 {s.firstName} {s.lastName} — {s.emailId}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Email with suggestion */}
          <div style={{ position: "relative" }}>
            <TextField
              label="Email Id"
              variant="standard"
              className="w-100"
              value={customer.customerEmail}
              onChange={handleEmailChange}
            />
            {emailSuggestions.length > 0 && (
              <div style={suggestionStyle}>
                {emailSuggestions.map((s, i) => (
                  <div
                    key={i}
                    style={suggestionItemStyle}
                    onMouseDown={() => selectCustomer(s)}
                    onMouseEnter={(e) =>
                      (e.target.style.background = "#f5f5f5")
                    }
                    onMouseLeave={(e) => (e.target.style.background = "white")}
                  >
                    📧 {s.emailId} — {s.firstName} {s.lastName}
                  </div>
                ))}
              </div>
            )}
          </div>

          <TextField
            label="Contact Number"
            variant="standard"
            className="w-100"
            value={customer.customerContact}
            onChange={(e) =>
              setCustomer({ ...customer, customerContact: e.target.value })
            }
          />
          <TextField
            label="Address"
            variant="standard"
            className="w-100"
            value={customer.customerAddress}
            onChange={(e) =>
              setCustomer({ ...customer, customerAddress: e.target.value })
            }
          />
        </div>

        {/* Accessory Details */}
        <div className="col-md-9">
          <div className="row selling-accessory-form">
            {/* Accessory with suggestion */}
            <div className="col-md-4" style={{ position: "relative" }}>
              <TextField
                label="Accessory Name"
                variant="standard"
                className="w-100"
                value={accessoryName}
                onChange={handleAccessoryChange}
              />
              {accessorySuggestions.length > 0 && (
                <div style={suggestionStyle}>
                  {accessorySuggestions.map((a, i) => (
                    <div
                      key={i}
                      style={suggestionItemStyle}
                      onMouseDown={() => selectAccessory(a)}
                      onMouseEnter={(e) =>
                        (e.target.style.background = "#f5f5f5")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.background = "white")
                      }
                    >
                      🔧 {a.name} — ₹{a.price} (Stock: {a.quantity})
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="col-md-4">
              <TextField
                label="Quantity"
                variant="standard"
                className="w-100"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="col-md-4" style={{ paddingTop: "15px" }}>
              <Button variant="contained" color="info" onClick={addToCart}>
                Add To Details
              </Button>
            </div>
          </div>

          <h6 className="mt-4 selling-accessory-title">Accessory Details</h6>
          <table className="table table-border">
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Amount</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price}</td>
                  <td>₹{item.amount}</td>
                  <td>
                    <CloseIcon
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() => removeFromCart(index)}
                    />
                  </td>
                </tr>
              ))}
              {cartItems.length > 0 && (
                <tr>
                  <td colSpan="4">
                    <strong>Total</strong>
                  </td>
                  <td>
                    <strong>₹{totalAmount}</strong>
                  </td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EmployeeSellingAccessoryForm;
