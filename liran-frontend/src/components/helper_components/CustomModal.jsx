import React, { useState } from "react";
import { Box, Modal, Typography } from "@mui/material";

import CreateForm from "../forms/CreateForm";

export default function CustomModal({ open, theme, columns, formHeader }) {
  const handleClose = () => {
    open.setIsOpen(false);
  };

  return (
    <Modal
      open={open.isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{}}
    >
      <Box
        sx={{
          borderRadius: "5px",
          backgroundColor: "#fff",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CreateForm theme={theme} columns={columns} handleClose={handleClose} formHeader={formHeader} />
      </Box>
    </Modal>
  );
}
