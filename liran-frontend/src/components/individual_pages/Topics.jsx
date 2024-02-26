import React, { useEffect } from "react";
import MainPage from "../MainPage";

export default function Topics({ setToolbarText }) {
  useEffect(() => {
    setToolbarText("Topics");
  }, []);

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
      validation: {},
    },
    {
      field: "topicName",
      headerName: "Topic name",
      width: 130,
      align: "center",
      headerAlign: "center",
      renderHeader: (params) => (
        <strong style={{ fontWeight: "bold" }}>
          {params.colDef.headerName}
        </strong>
      ),
      renderCell: (params) => <strong>{params.value}</strong>,
      validation: { required: true },
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
      validation: { min: 1, max: 100, viki: 78 },
    },
    {
      field: "batchingNumber",
      headerName: "Batching Number",
      type: "number",
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
      validation: { min: 1, max: 100, viki: 78 },
    },
  ];

  return <MainPage path="topics" columns={columns} />;
}
