import React, { useState } from "react";
import { Box, Modal, Typography } from "@mui/material";

import CreateForm from "../forms/CreateForm";

export default function CustomModal({ open, theme }) {
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
          // border: "2px solid #000",
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
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal!!!!!!!!
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>

        <CreateForm theme={theme} />
      </Box>
    </Modal>
  );
}
