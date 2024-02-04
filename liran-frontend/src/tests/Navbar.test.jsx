import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar";

// Mock the helper function
jest.mock("../helpers.js", () => ({
  getIconForAppbar: jest.fn(() => <div data-testid="mock-icon">Mock Icon</div>),
}));

describe("Navbar component", () => {
  it("renders the correct navigation header", () => {
    render(
      <BrowserRouter>
        <Navbar navHeader="Test Navigation Header" />
      </BrowserRouter>
    );
    expect(screen.getByText("Test Navigation Header")).toBeInTheDocument();
  });

  it("renders the correct menu items with icons", () => {
    render(
      <BrowserRouter>
        <Navbar navHeader="Test Navigation Header" />
      </BrowserRouter>
    );

    // Check if each menu item is rendered with its icon and correct text
    const menuItems = [
      "Topics",
      "Devices",
      "Manufactors",
      "Storages",
      "Ext Brokers",
      "Passwords",
      "System Preferences",
      "Engines",
      "Logout",
    ];

    menuItems.forEach(async (submenuName) => {
      expect(screen.getByText(submenuName)).toBeInTheDocument();
      await waitFor(() => {
        expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
      });
    });
  });
});
