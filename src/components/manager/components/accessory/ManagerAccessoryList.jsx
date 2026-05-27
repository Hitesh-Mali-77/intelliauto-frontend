// import React from "react";
// import {
//   _getAllAccessory,
//   _updateAccessory,
// } from "../../../../services/accessoryService";
// import AutomobilesDialog from "../../../../shared/components/AutomobilesDialog";
// import Grid from "../../../../shared/components/Grid";

// const ManagerAccessoryList = () => {
//   const [showDialog, setShowDialog] = React.useState(false);

//   const [currentAccessory, setCurrentAccessory] = React.useState({
//     id: "",
//     name: "",
//     companyName: "",
//     description: "",
//     price: "",
//     quantity: "",
//     category: "",
//     emailId: "",
//     status: "",
//   });

//   const [allAccessory, setAllAccessory] = React.useState([]);
//   const [allColumn] = React.useState([
//     { lable: "Name", property: "name" },
//     { lable: "Company Name", property: "companyName" },
//     { lable: "Description", property: "description" },
//     { lable: "Price", property: "price" },
//     { lable: "Quantity", property: "quantity" },
//     { lable: "Category", property: "category" },
//     { lable: "Employee Email Id", property: "emailId" },
//     { lable: "Status", property: "status" },
//     { lable: "Action", property: "action" },
//   ]);

//   const [dialogColumns] = React.useState([
//     { lable: "Name", property: "name" },
//     { lable: "Company Name", property: "companyName" },
//     { lable: "Description", property: "description" },
//     { lable: "Price", property: "price" },
//     { lable: "Quantity", property: "quantity" },
//     { lable: "Category", property: "category" },
//     { lable: "Employee Email Id", property: "emailId" },
//     { lable: "Status", property: "status" },
//   ]);

//   React.useEffect(() => {
//     getAllAccessory();
//   }, []);

//   const getAllAccessory = () => {
//     _getAllAccessory().then((result) => {
//       let filteredAccessory = result.data.map((accessory) => ({
//         ...accessory,
//         status: accessory.quantity <= 0 ? "❌ Out of Stock" : "✅ Available",
//       }));
//       setAllAccessory(filteredAccessory);
//     });
//   };

//   const updateAccessory = (currentAccessory, newStatus) => {
//     console.log(currentAccessory, newStatus);
//     currentAccessory.status = newStatus;
//     _updateAccessory(currentAccessory).then((result) => {
//       getAllAccessory();
//     });
//   };

//   const viewRecord = (accessory) => {
//     setCurrentAccessory(accessory);
//     setShowDialog(true);
//   };

//   return (
//     <div>
//       <Grid
//         records={allAccessory}
//         columns={allColumn}
//         type="manager-accessory"
//         updateAccessory={(currentAccessory, newStatus) =>
//           updateAccessory(currentAccessory, newStatus)
//         }
//         viewRecord={(record) => viewRecord(record)}
//       />

//       <AutomobilesDialog
//         columns={dialogColumns}
//         record={currentAccessory}
//         showDialog={showDialog}
//         title={currentAccessory.name}
//         setShowDialog={() => setShowDialog(false)}
//       />
//     </div>
//   );
// };

// export default ManagerAccessoryList;

import React from "react";
import { _getAllAccessory } from "../../../../services/accessoryService";
import { _createNotification } from "../../../../services/notificationService";
import AutomobilesDialog from "../../../../shared/components/AutomobilesDialog";
import { Button } from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const ManagerAccessoryList = () => {
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const [showDialog, setShowDialog] = React.useState(false);
  const [currentAccessory, setCurrentAccessory] = React.useState({
    id: "",
    name: "",
    companyName: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    emailId: "",
    status: "",
  });
  const [allAccessory, setAllAccessory] = React.useState([]);

  React.useEffect(() => {
    getAllAccessory();
  }, []);

  const getAllAccessory = () => {
    _getAllAccessory().then((result) => {
      let filteredAccessory = result.data.map((accessory) => ({
        ...accessory,
        status: accessory.quantity <= 0 ? "❌ Out of Stock" : "✅ Available",
      }));
      setAllAccessory(filteredAccessory);
    });
  };

  const sendNotification = (accessory) => {
    const notification = {
      managerId: currentUser.id,
      managerName: currentUser.firstName + " " + currentUser.lastName,
      accessoryName: accessory.name,
      message: `Manager ${currentUser.firstName} ${currentUser.lastName} has informed that the stock of "${accessory.name}" is running low (Current Stock: ${accessory.quantity}). Please add more stock!`,
    };

    _createNotification(notification)
      .then(() => {
        alert(
          `✅ Notification sent! Employee will receive notification about "${accessory.name}".`,
        );
      })
      .catch((err) => {
        alert(err.response?.data || "Error");
      });
  };

  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Company Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Employee Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allAccessory.map((accessory, index) => (
            <tr key={index}>
              <td>{accessory.name}</td>
              <td>{accessory.companyName}</td>
              <td>{accessory.description}</td>
              <td>₹{accessory.price}</td>
              <td>{accessory.quantity}</td>
              <td>{accessory.category}</td>
              <td>{accessory.emailId}</td>
              <td>{accessory.status}</td>
              <td>
                <Button
                  variant="contained"
                  color="warning"
                  size="small"
                  onClick={() => sendNotification(accessory)}
                >
                  <NotificationsActiveIcon fontSize="small" />
                  &nbsp; Request Stock
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerAccessoryList;
