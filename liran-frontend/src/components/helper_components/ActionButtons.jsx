import { Button, ThemeProvider } from "@mui/material";
import React from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { CustomThemeContext } from "../../contexts/CustomTheme.context";

export default function ActionButtons({ handleEditClick, handleDeleteClick }) {
  const { theme } = React.useContext(CustomThemeContext);

  return (
    <strong>
      <ThemeProvider theme={theme}>
        <Button
          onClick={handleDeleteClick}
          variant="contained"
          size="small"
          color="mainPalette"
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
          color="mainPalette"
          style={{ marginLeft: 16 }}
          role="update"
        >
          <ModeEditOutlineIcon />
        </Button>
      </ThemeProvider>
    </strong>
  );
}
