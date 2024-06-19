import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
interface DropdownProps {
  handleLogout: () => void;
  role: number;
}
const Dropdown: React.FC<DropdownProps> = ({ handleLogout, role }) => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDashboard = () => {
    console.log("role is", role);

    if (role === 1) {
      navigate("/dashboard/admin");
    } else {
      navigate("/dashboard/user");
    }
  };

  const handleLogoutClick = () => {
    console.log("checking");
    console.log(handleLogout);
    handleLogout();

    handleClose(); // Close the menu
    navigate("/login");
  };

  return (
    <div className="text-black">
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          color: "inherit",
          fontFamily: "Poppins, sans-serif", // Set font family
          fontSize: "18px", // Adjust font size
          fontWeight: "500", // Adjust font weight (500 is semi-bold)
          textTransform: "capitalize", // Disable text transform
          padding: "8px 16px", // Add padding
          text: "xl",
          //   margin: "0px 2px", // Adjust margin (0 top/bottom, 8px left/right)
          //   marginBottom: "120px",
          marginTop: "0px",
          height: "8px",

          //   width: "80px",
        }}
      >
        {auth?.user.name}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleDashboard}>Dasboard</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default Dropdown;
