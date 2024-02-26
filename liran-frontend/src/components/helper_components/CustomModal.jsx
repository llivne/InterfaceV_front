import React from "react";
import { Box, Modal } from "@mui/material";

import CreateForm from "../forms/CreateForm";
import UpdateForm from "../forms/UpdateForm";

export default function CustomModal({
  open,
  columns,
  formHeader,
  createData,
  updateData,
  rowEdited,
}) {
  const handleClose = () => {
    open.setIsOpen(false);
  };

  return (
    <Modal
      open={open.isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      role="modal-window"
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
        {createData ? (
          <CreateForm
            columns={columns}
            handleClose={handleClose}
            formHeader={formHeader}
            createData={createData}
          />
        ) : (
          <UpdateForm
            columns={columns}
            handleClose={handleClose}
            formHeader={formHeader}
            updateData={updateData}
            rowEdited={rowEdited}
          />
        )}
      </Box>
    </Modal>
  );
}
