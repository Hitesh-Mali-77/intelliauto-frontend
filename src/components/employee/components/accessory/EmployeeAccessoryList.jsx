import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  _deleteAccessory,
  _getAllAccessory,
} from "../../../../services/accessoryService";
import Grid from "../../../../shared/components/Grid";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { _getEmployeeEmailIdById } from "../../../../services/userService";

const EmployeeAccessoryList = () => {
  const navigate = useNavigate();

  const [allProduct, setAllProduct] = React.useState([]);
  const [allColumn] = React.useState([
    { lable: "Name", property: "name" },
    { lable: "Company Name", property: "companyName" },
    { lable: "Description", property: "description" },
    { lable: "Price", property: "price" },
    { lable: "Category", property: "category" },
    { lable: "Quantity", property: "quantity" },
    { lable: "Employee Email Id", property: "emailId" },
    { lable: "Status", property: "status" },
    { lable: "Action", property: "action" },
  ]);

  React.useEffect(() => {
    getAllAccessory();
  }, []);



  const getAllAccessory = () => {
    _getAllAccessory().then((result) => {
      let products = result.data.map((product) => ({
        ...product,
        status: product.quantity <= 0 ? "❌ Out of Stock" : "✅ Available",
      }));
      setAllProduct(products); 
    });
  };

  const getEmployeeEmailIdById = (employeeId) => {
    return new Promise((reslove) => {
      _getEmployeeEmailIdById(employeeId).then((emailId) => {
        reslove(emailId);
      });
    });
  };

  const addUserStyle = {
    position: "absolute",
    right: "30px",
  };

  const navigateToForm = () => {
    navigate("form");
  };

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this accessory?")) {
      _deleteAccessory(id).then((result) => {
        alert("Accessory Deleted Successfully!");
        getAllAccessory();
      });
    }
  };

  const viewProduct = (product) => {
    console.log(product);
  };

  const editAccessory = (id) => {
    navigate(`${id}`);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => navigateToForm()}
        style={addUserStyle}
      >
        <AddCircleIcon /> Add
      </Button>
      <hr className="auto-hr" />
      <Grid
        records={allProduct}
        columns={allColumn}
        deleteRecord={(id) => deleteProduct(id)}
        viewRecord={(product) => viewProduct(product)}
        editRecord={(id) => editAccessory(id)}
        type="employee-accessory"
      />
    </>
  );
};

export default EmployeeAccessoryList;
