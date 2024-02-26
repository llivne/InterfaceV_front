import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import ActionButtons from "../components/helper_components/ActionButtons";
import CustomThemeProvider from "../contexts/CustomTheme.context";

// Mock functions for testing click handlers
const mockHandleEditClick = jest.fn();
const mockHandleDeleteClick = jest.fn();

describe("ActionButtons component", () => {
  it("renders ActionButtons component correctly", () => {
    const { getByRole } = render(
      <CustomThemeProvider>
        <ActionButtons
          handleEditClick={mockHandleEditClick}
          handleDeleteClick={mockHandleDeleteClick}
        />
      </CustomThemeProvider>
    );

    // Check if the delete button is rendered
    expect(getByRole("delete")).toBeInTheDocument();

    // Check if the update button is rendered
    expect(getByRole("update")).toBeInTheDocument();
  });

  it("calls handleDeleteClick on delete button click", () => {
    const { getByRole } = render(
      <CustomThemeProvider>
        <ActionButtons
          handleEditClick={mockHandleEditClick}
          handleDeleteClick={mockHandleDeleteClick}
        />
      </CustomThemeProvider>
    );

    // Click the delete button
    fireEvent.click(getByRole("delete"));

    // Check if handleDeleteClick was called
    expect(mockHandleDeleteClick).toHaveBeenCalledTimes(1);
  });

  it("calls handleEditClick on update button click", () => {
    const { getByRole } = render(
      <CustomThemeProvider>
        <ActionButtons
          handleEditClick={mockHandleEditClick}
          handleDeleteClick={mockHandleDeleteClick}
        />
      </CustomThemeProvider>
    );

    // Click the update button
    fireEvent.click(getByRole("update"));

    // Check if handleEditClick was called
    expect(mockHandleEditClick).toHaveBeenCalledTimes(1);
  });
});
