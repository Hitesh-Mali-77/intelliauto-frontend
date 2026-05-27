import React from "react";
import { Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector, useDispatch } from "react-redux";
import {
  zoomInTemplateAction,
  zoomOutTemplateAction,
} from "../../store/actions/template/templateAction";

const Header = ({ currentLoginUser }) => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [openMenu, setOpenMenu] = React.useState(false);

  const dispatch = useDispatch();
  const template = useSelector((store) => store.BASE.template);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleClose = () => {
    setOpenMenu(false);
  };

  const navigateByMenu = (menuLink) => {
    navigate("/" + currentLoginUser.role + "/" + menuLink);
    setOpenMenu(false);
  };

  const toggleTemplate = () => {
    switch (template.type) {
      case "Zoom-Out":
        return dispatch(zoomInTemplateAction());
      case "Zoom-In":
        return dispatch(zoomOutTemplateAction());
      default:
        return dispatch(zoomOutTemplateAction());
    }
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div
      style={{
        background: " #23408f",
        color: "white",
        padding: "0px 15px 0px 4px ",
        position: "sticky",
        top: "0",
      }}
      className="header-container"
    >
      {/* <h2>
                My Cart -
            </h2> */}
      <span className="pointer" onClick={() => toggleTemplate()}>
        <MenuIcon />
      </span>
      <span
        style={{
          background: "rgba(255,255,255,0.2)",
          padding: "4px 12px",
          borderRadius: "12px",
          fontSize: "13px",
          fontWeight: "bold",
          textTransform: "capitalize",
        }}
      >
        {currentLoginUser.role}
      </span>
      <span className="user-info pointer" onClick={(e) => handleClick(e)}>
        Hello, {currentLoginUser.firstName}
      </span>
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => navigateByMenu("my-profile")}>
          My Profile
        </MenuItem>
        <MenuItem onClick={() => navigateToLogin()}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default Header;
