import React from "react";
import { Typography } from "@mui/material";
import "../../styles/App.css";

export default function LoadingSpinner() {
  return (
    <>
      <div className="loader"></div>
      <Typography variant="h5" sx={{ color: "#58B2EF" }}>
        Loading...
      </Typography>
    </>
  );
}
