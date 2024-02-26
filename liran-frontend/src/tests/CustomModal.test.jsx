import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import CustomModal from "../components/helper_components/CustomModal";
import CustomThemeProvider from "../contexts/CustomTheme.context";

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
      <CustomThemeProvider>
        <CustomModal
          open={mockOpen}
          columns={mockColumns}
          formHeader="Create Form"
          createData={mockCreateData}
        />
      </CustomThemeProvider>
    );

    // Check if CreateForm is rendered
    await waitFor(() => {
      expect(screen.getByText("Create Form")).toBeInTheDocument();
    });
  });

  it("renders UpdateForm when updateData prop is provided", () => {
    render(
      <CustomThemeProvider>
        <CustomModal
          open={mockUpdateOpen}
          columns={mockColumns}
          formHeader="Update Form"
          updateData={mockUpdateData}
          rowEdited={mockRowEdited}
        />
      </CustomThemeProvider>
    );

    // Check if UpdateForm is rendered
    expect(screen.getByText("Update Form")).toBeInTheDocument();
  });

  it("calls handleClose when the modal is open", async () => {
    render(
      <CustomThemeProvider>
        <CustomModal
          open={mockOpen}
          columns={mockColumns}
          formHeader="Create Form"
          createData={mockCreateData}
        />
      </CustomThemeProvider>
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
