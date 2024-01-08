import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import axios from "axios";

const url = "http://localhost:5000";
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "http://localhost:3000",
};

export default function MainPage({ path, columns, theme }) {
  const [rows, setRows] = useState(null);

  const getData = async () => {
    try {
      console.log(path);
      const result = await axios.get(
        `${url}/${path}`,
        { withCredentials: true },
        headers
      );
      setRows(result.data);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

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
      <div>
        <ThemeProvider theme={theme}>
          <Button
            color="actions"
            variant="contained"
            sx={{ margin: "5px 10px" }}
          >
            Add New {path.at(0).toUpperCase() + path.slice(1, -1)}
          </Button>
        </ThemeProvider>
        <ThemeProvider theme={theme}>
          <Button color="actions" variant="contained" disabled>
            Delete Selected {path.at(0).toUpperCase() + path.slice(1)}
          </Button>
        </ThemeProvider>
      </div>
    </div>
  );
}
