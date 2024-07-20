import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

interface DropdownProps {
  categories: any[];
}
const DropdownCategory: React.FC<DropdownProps> = ({ categories }) => {
  console.log("catgeoris ", categories);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCategoryClick = (slug: string) => {
    // Navigate to the category and close the menu
    navigate(`/category/${slug}`);
    handleClose();
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
        Category
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
        <MenuItem onClick={() => navigate(`category`)}>All Categories</MenuItem>
        {categories.map((cat) => (
          <div key={cat._id}>
            <MenuItem
              key={cat._id}
              onClick={() => handleCategoryClick(cat.slug)}
            >
              {cat.name}
            </MenuItem>
          </div>
        ))}
      </Menu>
    </div>
  );
};

export default DropdownCategory;
