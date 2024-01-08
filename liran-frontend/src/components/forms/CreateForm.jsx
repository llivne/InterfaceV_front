import React from "react";
import { Grid, Paper, Typography, TextField, Box, Fab } from "@mui/material";
import { FormControl } from "@mui/base/FormControl";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function CreateForm({ theme }) {
  return (
    <>
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
            {/* <LoginIcon sx={{ mr: 1 }} />L O G I N */}
          </Fab>
        </ThemeProvider>
      </Box>
    </>
  );
}
