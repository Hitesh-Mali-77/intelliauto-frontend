import { TextField, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { _createUser } from "../../services/userService";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Register = () => {
  const navigate = useNavigate();

  const [newUser, setNewUser] = React.useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    confirmPassword: "",
    role: "customer", // ← हे hardcode आहे — बदलता येणार नाही
  });

  const [error, setError] = React.useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
    setError("");
  };

  const register = () => {
    // Validation
    if (!newUser.firstName || !newUser.lastName) {
      setError("First Name आणि Last Name भरा!");
      return;
    }
    if (!newUser.emailId || !newUser.emailId.includes("@")) {
      setError("Valid Email Id भरा!");
      return;
    }
    if (newUser.password.length < 6) {
      setError("Password कमीत कमी 6 characters असायला हवा!");
      return;
    }
    if (newUser.password !== newUser.confirmPassword) {
      setError("Password match होत नाही!");
      return;
    }

    // API call — role automatically 'customer' जाईल
    _createUser({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      emailId: newUser.emailId,
      password: newUser.password,
      role: "customer",
      isFirstLogin: false, // Customer स्वतः password set करतो
    })
      .then(() => {
        alert("Account Successfully Created! आता login करा.");
        navigate("/login");
      })
      .catch((err) => {
        setError(err.response?.data || "Error आला — Email already exist असेल!");
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f5f5f5",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          width: "450px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <PersonAddIcon style={{ fontSize: "48px", color: "#1976d2" }} />
          <h4 style={{ margin: "8px 0 4px" }}>Create New Account</h4>
          <p style={{ color: "gray", fontSize: "14px", margin: 0 }}>
            Customer Account — View and purchase accessories only
          </p>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <TextField
            label="First Name"
            variant="standard"
            className="w-100"
            name="firstName"
            value={newUser.firstName}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <TextField
            label="Last Name"
            variant="standard"
            className="w-100"
            name="lastName"
            value={newUser.lastName}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <TextField
            label="Email Id"
            variant="standard"
            className="w-100"
            name="emailId"
            value={newUser.emailId}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <TextField
            label="Password"
            variant="standard"
            type="password"
            className="w-100"
            name="password"
            value={newUser.password}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <TextField
            label="Confirm Password"
            variant="standard"
            type="password"
            className="w-100"
            name="confirmPassword"
            value={newUser.confirmPassword}
            onChange={handleChange}
          />
        </div>

        {error && (
          <p
            style={{
              color: "red",
              fontSize: "13px",
              margin: "0 0 16px",
              background: "#fff3f3",
              padding: "8px 12px",
              borderRadius: "6px",
            }}
          >
            ⚠️ {error}
          </p>
        )}

        <Button variant="contained" fullWidth onClick={register}>
          <PersonAddIcon /> &nbsp; Register
        </Button>

        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <Button variant="text" onClick={() => navigate("/login")}>
            You Have Aldready Account! Please Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
