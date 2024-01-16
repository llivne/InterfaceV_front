import React from "react";
import { FormControl } from "@mui/base/FormControl";
import {
  FormHelperText,
  InputLabel,
  Input,
  TextField,
  Box,
  Fab,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

export default function Signup() {
  return (
    <Box
      sx={{
        width: "110%",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* <FormControl defaultValue="" required>
        <Label>Name</Label>
        <StyledInput placeholder="Write your name here" />
        <HelperText />
      </FormControl> */}

      <h1>Sign Up</h1>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          gap: "25px",
        }}
      >
        <FormControl sx={{ minWidth: "95%" }}>
          <TextField
            sx={{ minWidth: "700px" }}
            required
            id="outlined-required"
            label="Email"
            // defaultValue="Hello World"
          />
        </FormControl>
        <FormControl>
          <TextField
            sx={{ minWidth: "700px" }}
            disabled
            id="outlined-disabled"
            label="Disabled"
            defaultValue="Hello World"
          />
        </FormControl>
        <FormControl>
          <TextField
            sx={{ minWidth: "700px" }}
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
        </FormControl>

        <Fab variant="extended" color="primary" sx={{ width: "10%" }}>
          <LoginIcon sx={{ mr: 1 }} />
          Extended
        </Fab>
      </Box>
    </Box>
  );
}
