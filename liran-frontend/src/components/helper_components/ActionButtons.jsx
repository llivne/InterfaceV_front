import { Button, ThemeProvider } from "@mui/material";
import React, { useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

import CustomModal from "./CustomModal";

export default function ActionButtons({ theme, columns, formHeader }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const open = {
    isOpen: isModalOpen,
    setIsOpen: setIsModalOpen,
  };

  return (
    <strong>
      <ThemeProvider theme={theme}>
        <Button
          variant="contained"
          size="small"
          color="actions"
          style={{ marginLeft: 16 }}
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
        >
          <ModeEditOutlineIcon />
        </Button>
      </ThemeProvider>
      <CustomModal
        open={open}
        theme={theme}
        columns={columns}
        formHeader={formHeader}
      ></CustomModal>
    </strong>
  );
}
