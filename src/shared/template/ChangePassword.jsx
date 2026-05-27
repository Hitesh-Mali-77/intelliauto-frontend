import React from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { _changePassword } from "../../services/userService";
import LockResetIcon from "@mui/icons-material/LockReset";

const ChangePassword = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(sessionStorage.getItem("user"));

  const [passwords, setPasswords] = React.useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = React.useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
    setError("");
  };

  const changePassword = () => {
    if (passwords.newPassword.length < 6) {
      setError("Password कमीत कमी 6 characters असायला हवा!");
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("Password match होत नाही!");
      return;
    }
    if (passwords.newPassword === "Welcome@123") {
      setError("नवीन password Welcome@123 असू शकत नाही!");
      return;
    }

    _changePassword({
      id: currentUser.id,
      newPassword: passwords.newPassword,
    })
      .then(() => {
        // sessionStorage मध्ये update कर
        const updatedUser = { ...currentUser, isFirstLogin: false };
        sessionStorage.setItem("user", JSON.stringify(updatedUser));
        alert("Password Successfully Changed! परत login करा.");
        sessionStorage.removeItem("user");
        navigate("/login");
      })
      .catch((err) => {
        setError(err.response?.data || "Error आला!");
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
          width: "400px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <LockResetIcon style={{ fontSize: "48px", color: "#1976d2" }} />
          <h4 style={{ margin: "8px 0 4px" }}>Change Password</h4>
          <p style={{ color: "gray", fontSize: "14px", margin: 0 }}>
            You need to change your login password after logging in for the
            first time.
          </p>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <TextField
            label="New Password"
            variant="standard"
            type="password"
            className="w-100"
            name="newPassword"
            value={passwords.newPassword}
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
            value={passwords.confirmPassword}
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

        <Button
          variant="contained"
          fullWidth
          onClick={changePassword}
          style={{ marginTop: "8px" }}
        >
          <LockResetIcon /> &nbsp; Change Password
        </Button>
      </div>
    </div>
  );
};

export default ChangePassword;
