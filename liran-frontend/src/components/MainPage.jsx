import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import axios from "axios";

import CustomModal from "./helper_components/CustomModal";

const url = "http://localhost:5000";
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "http://localhost:3000",
};

export default function MainPage({ path, columns, theme }) {
  const [rows, setRows] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getData = async () => {
    try {
      console.log(path);
      const result = await axios.get(
        `${url}/${path}`,
        { withCredentials: true },
        headers
      );
      console.log(result.data);
      setRows(result.data);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const open = {
    isOpen: isModalOpen,
    setIsOpen: setIsModalOpen,
  };

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
        gap: "10px",
      }}
    >
      {rows && (
        <DataGrid
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
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      )}
      {rows && (
        <div>
          <ThemeProvider theme={theme}>
            <Button
              onClick={handleAddClick}
              color="actions"
              variant="contained"
              sx={{ margin: "5px 10px" }}
            >
              Add New {headerSingle}
            </Button>
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <Button color="actions" variant="contained" disabled>
              Delete Selected {headerPlural}
            </Button>
          </ThemeProvider>
        </div>
      )}
      <CustomModal
        open={open}
        theme={theme}
        columns={columns}
        formHeader={`Create New ${headerSingle}`}
      ></CustomModal>
    </div>
  );
}
