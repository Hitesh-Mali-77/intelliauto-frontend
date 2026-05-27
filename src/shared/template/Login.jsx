// import { TextField, Button } from "@mui/material";
// import React from "react";
// import {
//   _checkCurrentLoginUser,
//   _getAllUser,
// } from "../../services/userService";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();

//   const [loginUser, setLoginUser] = React.useState({
//     emailId: "",
//     password: "",
//   });

//   const handelChange = (event) => {
//     const { value, name } = event.target;
//     setLoginUser({
//       ...loginUser,
//       [name]: value,
//     });
//   };

//   const checkLoginUser = () => {
//     _checkCurrentLoginUser(loginUser)
//       .then((result) => {
//         if (result.status === 200) {
//           sessionStorage.setItem("user", JSON.stringify(result.data));

//           if (result.data.isFirstLogin) {
//             navigate("/change-password");
//           } else {
//             navigate("/" + result.data.role + "/dashboard");
//             alert("Login Successfully");
//           }
//         }
//       })
//       .catch((error) => {
//         if (error.response.status === 404) {
//           alert(error.response.data);
//         }
//       });
//   };
//   return (
//     <div className="login border">
//       <div>
//         <TextField
//           label="Email Id"
//           variant="standard"
//           value={loginUser.emailId}
//           name="emailId"
//           onChange={(e) => handelChange(e)}
//         />
//       </div>
//       <div>
//         <TextField
//           label="Password"
//           variant="standard"
//           type="password"
//           value={loginUser.password}
//           name="password"
//           onChange={(e) => handelChange(e)}
//         />
//       </div>
//       <div className="mt-3">
//         <Button variant="contained" onClick={() => checkLoginUser()}>
//           Login
//         </Button>
//         <div className="mt-2">
//           <Button variant="text" onClick={() => navigate("/register")}>
//             Don't have a account? Register.
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { TextField, Button, Paper, Typography } from "@mui/material";
import React from "react";
import { _checkCurrentLoginUser } from "../../services/userService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [loginUser, setLoginUser] = React.useState({
    emailId: "",
    password: "",
  });

  const handelChange = (event) => {
    const { value, name } = event.target;

    setLoginUser({
      ...loginUser,
      [name]: value,
    });
  };

  const checkLoginUser = () => {
    _checkCurrentLoginUser(loginUser)
      .then((result) => {
        if (result.status === 200) {
          sessionStorage.setItem("user", JSON.stringify(result.data));

          if (result.data.isFirstLogin) {
            navigate("/change-password");
          } else {
            navigate("/" + result.data.role + "/dashboard");
            alert("Login Successfully");
          }
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          alert(error.response.data);
        }
      });
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(to right,rgb(60, 100, 190),rgb(77, 43, 158))",
      }}
    >
      <Paper
        elevation={10}
        style={{
          padding: "40px",
          width: "350px",
          borderRadius: "15px",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          style={{
            marginBottom: "25px",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Login
        </Typography>

        <div className="mb-3">
          <TextField
            fullWidth
            label="Email Id"
            variant="outlined"
            value={loginUser.emailId}
            name="emailId"
            onChange={(e) => handelChange(e)}
          />
        </div>

        <div className="mb-3 mt-3">
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            value={loginUser.password}
            name="password"
            onChange={(e) => handelChange(e)}
          />
        </div>

        <div className="mt-4">
          <Button
            fullWidth
            variant="contained"
            onClick={() => checkLoginUser()}
            style={{
              padding: "10px",
              fontSize: "16px",
              borderRadius: "10px",
            }}
          >
            Login
          </Button>

          <div className="mt-3">
            <Button variant="text" onClick={() => navigate("/register")}>
              Don't have an account? Register
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Login;
