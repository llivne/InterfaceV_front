import React from "react";
import { Button } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import TopicIcon from "@mui/icons-material/Topic";

import MainPage from "../MainPage";
import ActionButtons from "../helper_components/ActionButtons";

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

export default function Devices({ setHeader }) {
  const header = <TopicIcon sx={{ verticalAlign: "0px" }}> Devices</TopicIcon>;
  setHeader("Devices");

  const columns = [
    {
      field: "id",
      headerName: "ID Number",
      width: 130,
      align: "center",
      headerAlign: "center",
      renderHeader: (params) => (
        <strong style={{ fontWeight: "bold" }}>
          {params.colDef.headerName}
        </strong>
      ),
    },
    {
      field: "deviceName",
      headerName: "Device Name",
      width: 130,
      align: "center",
      headerAlign: "center",
      renderHeader: (params) => (
        <strong style={{ fontWeight: "bold" }}>
          {params.colDef.headerName}
        </strong>
      ),
      renderCell: (params) => <strong>{params.value}</strong>,
    },
    {
      field: "batchingTime",
      headerName: "Batching Time (sec)",
      type: "number",
      width: 160,
      align: "center",
      headerAlign: "center",
      renderHeader: (params) => (
        <strong style={{ fontWeight: "bold" }}>
          {params.colDef.headerName}
        </strong>
      ),
    },
    {
      field: "batchingNumber",
      headerName: "Batching Number",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      align: "center",
      headerAlign: "center",
      renderHeader: (params) => (
        <strong style={{ fontWeight: "bold" }}>
          {params.colDef.headerName}
        </strong>
      ),
      //   valueGetter: (params) =>
      //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
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
      renderCell: (params) => <ActionButtons theme={theme} columns={columns} formHeader={`Edit Device`}/>,
    },
  ];

  return <MainPage path="devices" columns={columns} theme={theme} />;
}
