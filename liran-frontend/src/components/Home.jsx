import { Grid, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";

import img from "../InterfaceMain.png";

export default function Home({ setToolbarText }) {
  useEffect(() => {
    setToolbarText("Management Application");
  }, []);

  return (
    <Grid container data-testid="home-page">
      <Grid item xs={12}>
        <Paper
          elevation={1}
          sx={{
            height: "80vh",
            marginLeft: "0px",
            marginTop: "4rem",
            backgroundColor: "#58B2EF",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={img} width={300} />
          <Typography variant="h1" sx={{ color: "white" }}>
            Interface B
          </Typography>
          <Typography variant="h5" sx={{ color: "white" }}>
            Manage all your resources and facilities from only one place
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
