import React from "react";
import { Grid, Paper, Typography, TextField, Box, Fab } from "@mui/material";
import { FormControl } from "@mui/base/FormControl";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginIcon from "@mui/icons-material/Login";

import img from "../InterfaceMain.png";

const theme = createTheme({
  palette: {
    login: {
      main: "#58B2EF",
      light: "#3B3486",
      dark: "#3B3486",
      contrastText: "#ffffff",
    },
  },
});

export default function StartPage() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Paper
          elevation={0}
          sx={{
            height: "100vh",
            marginLeft: "0px",
            backgroundColor: "#58B2EF",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={img} width={300} />
          <Typography variant="h4" sx={{ color: "white" }}>
            Interface B
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper
          elevation={0}
          sx={{
            height: "100vh",
            marginLeft: "0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <Typography variant="h2">Log in</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "15px",
            }}
          >
            <FormControl>
              <TextField
                sx={{ minWidth: "500px" }}
                required
                id="user"
                label="User"
                autoComplete="off"
              />
            </FormControl>

            <FormControl>
              <TextField
                sx={{ minWidth: "500px" }}
                required
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
              />
            </FormControl>

            <ThemeProvider theme={theme}>
              <Fab variant="extended" color="login" sx={{ width: "30%" }}>
                <LoginIcon sx={{ mr: 1 }} />L O G I N
              </Fab>
            </ThemeProvider>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
