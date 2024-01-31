import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
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
  mockSetUpdateIsOpen: mockSetIsOpen,
};

const mockTheme = {
  palette: {
    // define your mock theme properties here
  },
};

const mockColumns = [
  // define your mock columns here
];

const mockRowEdited = {
  // define your mock row data here
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
        createData={undefined}
        rowEdited={mockRowEdited}
      />
    );

    // Check if UpdateForm is rendered
    expect(screen.getByText("Update Form")).toBeInTheDocument();
  });

  it("calls handleClose when the modal is closed", async () => {
    render(
      <CustomModal
        open={mockOpen}
        theme={mockTheme}
        columns={mockColumns}
        formHeader="Create Form"
        createData={mockCreateData}
      />
    );

    // Find the modal element
    await waitFor(() => {
      expect(screen.getByRole("modal-window")).toBeInTheDocument();
    });
    const modal = screen.getByRole("modal");

    // Close the modal
    fireEvent.click(modal);

    // Check if handleClose is called
    expect(mockOpecmockSetIsOpen).toHaveBeenCalledWith(false);
  });
});
