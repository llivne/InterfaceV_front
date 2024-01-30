import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { getData, createData, updateData, deleteData } from "../helpers";
import CustomModal from "./helper_components/CustomModal";
import ActionButtons from "./helper_components/ActionButtons";
import LoadingSpinner from "./helper_components/LoadingSpinner";
import "../styles/App.css";

const url = "http://localhost:5000";

const theme = createTheme({
  palette: {
    actions: {
      main: "#58B2EF",
      light: "#3B3486",
      dark: "#3B3486",
      contrastText: "#ffffff",
    },
  },
});

export default function MainPage({ path, columns }) {
  // for spinner id data takes time to come from backend
  const [isLoading, setIsLoading] = useState(true);

  // for efficient CRUD management
  const [rows, setRows] = useState(null);
  const [rowEdited, setRowEdited] = useState("");

  // for modal window management
  const [isCreateModalOpen, setisCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  // talking to backend
  const getDataFromBackend = async () => {
    const data = await getData(`${url}/${path}`);
    setRows(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getDataFromBackend();
  }, [isLoading]);

  const handleCreateData = async (newItem) => {
    await createData(`${url}/${path}`, newItem);
    getDataFromBackend();
  };

  const handleUpdateData = async (updatedItem) => {
    await updateData(`${url}/${path}`, updatedItem);
    getDataFromBackend();
  };

  const handleDeleteData = async (rowDeleteId) => {
    await deleteData(`${url}/${path}/${rowDeleteId}`);
    getDataFromBackend();
  };

  // handling Modal Window (the window will handle its closure itself, we'll pass this state as props)
  const handleAddClick = () => {
    setisCreateModalOpen(true);
  };

  const open = {
    isOpen: isCreateModalOpen,
    setIsOpen: setisCreateModalOpen,
  };

  const updateOpen = {
    isOpen: isUpdateModalOpen,
    setIsOpen: setIsUpdateModalOpen,
  };

  // handling row update
  const handleRowModesModelChange = (data) => {
    setRowEdited(data.row);
  };

  // if individual page does not state otherwise, add to columns Update & Delete buttons
  if (!columns.find((col) => col.field === "actions")) {
    columns.push({
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 190,
      align: "center",
      headerAlign: "center",
      renderHeader: (params) => (
        <strong style={{ fontWeight: "bold" }}>
          {params.colDef.headerName}
        </strong>
      ),
      renderCell: (params) => {
        return (
          <ActionButtons
            theme={theme}
            handleEditClick={() => {
              setRowEdited(params);
              setIsUpdateModalOpen(true);
            }}
            handleDeleteClick={() => {
              handleDeleteData(params.row.id);
            }}
          />
        );
      },
    });
  }

  const headerPlural = path.at(0).toUpperCase() + path.slice(1);
  const headerSingle = path.at(0).toUpperCase() + path.slice(1, -1);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "15px",
      }}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <DataGrid
            data-testid="data-grid"
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "4rem",
            }}
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
            getRowId={(row) => {
              //   console.log(row);
              return row.id;
            }}
            onRowModesModelChange={(data) => handleRowModesModelChange(data)}
            checkboxSelection
          />

          <div>
            <ThemeProvider theme={theme}>
              <Button
                onClick={handleAddClick}
                color="actions"
                variant="contained"
                sx={{ margin: "5px 10px" }}
              >
                <AddIcon />
                Add New {headerSingle}
              </Button>
            </ThemeProvider>
            <ThemeProvider theme={theme}>
              <Button color="actions" variant="contained" disabled>
                <DeleteIcon />
                Delete Selected {headerPlural}
              </Button>
            </ThemeProvider>
          </div>

          <CustomModal
            open={open}
            theme={theme}
            columns={columns}
            formHeader={`Create New ${headerSingle}`}
            createData={handleCreateData}
          ></CustomModal>
          <CustomModal
            open={updateOpen}
            theme={theme}
            columns={columns}
            formHeader={`Update ${headerSingle}`}
            updateData={handleUpdateData}
            rowEdited={rowEdited}
          ></CustomModal>
        </>
      )}
    </div>
  );
}
