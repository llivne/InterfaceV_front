import { Button, ThemeProvider } from "@mui/material";
import React from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

export default function ActionButtons({
  theme,
  handleEditClick,
  handleDeleteClick,
}) {
  return (
    <strong>
      <ThemeProvider theme={theme}>
        <Button
          onClick={handleDeleteClick}
          variant="contained"
          size="small"
          color="actions"
          style={{ marginLeft: 16 }}
          role="delete"
        >
          <DeleteIcon />
        </Button>
      </ThemeProvider>
      <ThemeProvider theme={theme}>
        <Button
          onClick={handleEditClick}
          variant="contained"
          size="small"
          color="actions"
          style={{ marginLeft: 16 }}
          role="update"
        >
          <ModeEditOutlineIcon />
        </Button>
      </ThemeProvider>
    </strong>
  );
}
