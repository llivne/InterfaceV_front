import React from "react";
import { Grid, Paper, Typography, TextField, Box, Fab } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import LoginIcon from "@mui/icons-material/Login";

import { AuthContext } from "../contexts/Auth.context";
import { CustomThemeContext } from "../contexts/CustomTheme.context";
import img from "../InterfaceMain.png";

export default function StartPage() {
  const [loginData, setLoginData] = React.useState({
    user: " ",
    password: " ",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    const updateState = (prevState) => {
      return { ...prevState, [name]: value };
    };
    setLoginData(updateState);
  };

  const auth = React.useContext(AuthContext);
  const { theme } = React.useContext(CustomThemeContext);

  const handleClick = async (e) => {
    e.preventDefault();
    auth.login();
    setLoginData({
      username: "",
      password: "",
    });
  };
  return (
    <Grid container spacing={2} data-testid="start-page" id="start-page">
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
            <TextField
              sx={{ minWidth: "500px" }}
              required
              id="user"
              name="user"
              label="User"
              placeholder="User"
              autoComplete="off"
              onChange={handleChange}
              error={loginData.user === ""}
              helperText="Requiered field"
            />

            <TextField
              sx={{ minWidth: "500px" }}
              required
              id="password"
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
              autoComplete="current-password"
              onChange={handleChange}
              error={loginData.password === ""}
              helperText="Requiered field"
            />

            <ThemeProvider theme={theme}>
              <Fab
                onClick={handleClick}
                variant="extended"
                color="mainPalette"
                sx={{ width: "30%" }}
                disabled={
                  loginData.user === "" ||
                  loginData.password === "" ||
                  loginData.user === " " ||
                  loginData.password === " "
                }
              >
                <LoginIcon sx={{ mr: 1 }} />L O G I N
              </Fab>
            </ThemeProvider>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
