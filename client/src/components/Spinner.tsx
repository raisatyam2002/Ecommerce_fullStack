import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function CircularIndeterminate() {
  const location = useLocation();
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => --prev);
    }, 1000);
    count === 0 &&
      navigate("/login", {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location]);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%", // Make the Box take up the full width of its container
        height: "400px", // Set a specific height for the Box
      }}
    >
      <h1>Redirecting to you in {count} seconds</h1>
      <CircularProgress />
    </Box>
  );
}
