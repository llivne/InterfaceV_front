import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

function ActionButtons({ handleEditClick, handleDeleteClick }) {
  return (
    <strong>
      <Button
        onClick={handleDeleteClick}
        variant="contained"
        size="small"
        style={{ marginLeft: 16 }}
        role="delete"
      >
        <DeleteIcon />
      </Button>

      <Button
        onClick={handleEditClick}
        variant="contained"
        size="small"
        style={{ marginLeft: 16 }}
        role="update"
      >
        <ModeEditOutlineIcon />
      </Button>
    </strong>
  );
}

// Mock functions for testing click handlers
const mockHandleEditClick = jest.fn();
const mockHandleDeleteClick = jest.fn();

jest.mock("@mui/material/styles", () => ({
  ...jest.requireActual("@mui/material/styles"),
  createTheme: jest.fn(),
}));

describe("ActionButtons component", () => {
  it("renders ActionButtons component correctly", () => {
    const { getByRole } = render(
      <ActionButtons
        handleEditClick={mockHandleEditClick}
        handleDeleteClick={mockHandleDeleteClick}
      />
    );

    // Check if the delete button is rendered
    expect(getByRole("delete")).toBeInTheDocument();

    // Check if the update button is rendered
    expect(getByRole("update")).toBeInTheDocument();
  });

  it("calls handleDeleteClick on delete button click", () => {
    const { getByRole } = render(
      <ActionButtons
        handleEditClick={mockHandleEditClick}
        handleDeleteClick={mockHandleDeleteClick}
      />
    );

    // Click the delete button
    fireEvent.click(getByRole("delete"));

    // Check if handleDeleteClick was called
    expect(mockHandleDeleteClick).toHaveBeenCalledTimes(1);
  });

  it("calls handleEditClick on update button click", () => {
    const { getByRole } = render(
      <ActionButtons
        handleEditClick={mockHandleEditClick}
        handleDeleteClick={mockHandleDeleteClick}
      />
    );

    // Click the update button
    fireEvent.click(getByRole("update"));

    // Check if handleEditClick was called
    expect(mockHandleEditClick).toHaveBeenCalledTimes(1);
  });
});
