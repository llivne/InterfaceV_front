import React from "react";
import { Grid, Paper, Typography, TextField, Box, Fab } from "@mui/material";
import { FormControl } from "@mui/base/FormControl";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function CreateForm({
  theme,
  columns,
  handleClose,
  formHeader,
}) {
  console.log(columns);
  return (
    <>
      <Typography variant="h3" sx={{ marginBottom: "30px" }}>
        {formHeader}
      </Typography>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "30px",
        }}
      >
        {columns.map((col) => {
          if (col.field === "id" || col.field === "actions") {
            return <></>;
          } else {
            return (
              <FormControl>
                <TextField
                  sx={{ minWidth: "500px" }}
                  required
                  id={col.field}
                  label={col.headerName}
                  autoComplete="off"
                />
              </FormControl>
            );
          }
        })}
        <div
          style={{
            width: "90%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThemeProvider theme={theme}>
            <Fab
              variant="extended"
              color="actions"
              sx={{ width: "20%", borderRadius: "5px", margin: "10px" }}
            >
              Save
            </Fab>
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <Fab
              onClick={() => handleClose()}
              variant="extended"
              color="actions"
              sx={{ width: "20%", borderRadius: "5px", margin: "10px" }}
            >
              Cancel
            </Fab>
          </ThemeProvider>
        </div>
      </Box>
    </>
  );
}
