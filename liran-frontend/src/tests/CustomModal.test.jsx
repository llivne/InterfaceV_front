import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import CustomModal from "../components/helper_components/CustomModal";

// Mock functions for testing
const mockSetIsOpen = jest.fn();
const mockSetUpdateIsOpen = jest.fn();
const mockCreateData = jest.fn();
const mockUpdateData = jest.fn();

const mockOpen = {
  isOpen: true,
  setIsOpen: mockSetIsOpen,
};

const mockUpdateOpen = {
  isOpen: true,
  setIsOpen: mockSetUpdateIsOpen,
};

const mockTheme = createTheme({
  palette: {
    actions: {
      main: "#58B2EF",
      light: "#3B3486",
      dark: "#3B3486",
      contrastText: "#ffffff",
    },
  },
});

const mockColumns = [
  // define your mock columns here{
  {
    field: "id",
    headerName: "ID Number",
    width: 130,
    align: "center",
    headerAlign: "center",
    renderHeader: (params) => (
      <strong style={{ fontWeight: "bold" }}>{params.colDef.headerName}</strong>
    ),
  },
  {
    field: "topicName",
    headerName: "Topic name",
    width: 130,
    align: "center",
    headerAlign: "center",
    renderHeader: (params) => (
      <strong style={{ fontWeight: "bold" }}>{params.colDef.headerName}</strong>
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
      <strong style={{ fontWeight: "bold" }}>{params.colDef.headerName}</strong>
    ),
    restrictions: { min: 1, max: 100, viki: 78 },
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
      <strong style={{ fontWeight: "bold" }}>{params.colDef.headerName}</strong>
    ),
  },
];

const mockRowEdited = {
  id: 2,
  topicName: "B",
  batchingTime: 25,
  batchingNumber: 42,
};

describe("CustomModal component", () => {
  it("renders CreateForm when createData prop is provided", async () => {
    render(
      <CustomModal
        open={mockOpen}
        theme={mockTheme}
        columns={mockColumns}
        formHeader="Create Form"
        createData={mockCreateData}
      />
    );

    // Check if CreateForm is rendered
    await waitFor(() => {
      expect(screen.getByText("Create Form")).toBeInTheDocument();
    });
  });

  it("renders UpdateForm when updateData prop is provided", () => {
    render(
      <CustomModal
        open={mockUpdateOpen}
        theme={mockTheme}
        columns={mockColumns}
        formHeader="Update Form"
        updateData={mockUpdateData}
        rowEdited={mockRowEdited}
      />
    );

    // Check if UpdateForm is rendered
    expect(screen.getByText("Update Form")).toBeInTheDocument();
  });

  it("calls handleClose when the modal is open", async () => {
    render(
      <CustomModal
        open={mockOpen}
        theme={mockTheme}
        columns={mockColumns}
        formHeader="Create Form"
        createData={mockCreateData}
      />
    );

    let modal;
    // Find the modal element
    await waitFor(() => {
      modal = screen.getByRole("modal-window");
      expect(modal).toBeInTheDocument();
    });

    // Close the modal
    fireEvent.click(screen.getByText(/Cancel/i));

    // Check if handleClose is called
    expect(mockOpen.setIsOpen).toHaveBeenCalledWith(false);
  });
});
