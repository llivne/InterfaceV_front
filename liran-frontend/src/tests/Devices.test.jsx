import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "../contexts/Auth.context";
import Devices from "../components/individual_pages/Devices";

describe("Deices component", () => {
  it("renders Devices component correctly", async () => {
    const setToolbarTextMock = jest.fn();

    render(
      <BrowserRouter>
        <AuthProvider>
          <Devices setToolbarText={setToolbarTextMock} />
        </AuthProvider>
      </BrowserRouter>
    );

    // Check if setToolbarText is called with the correct argument
    expect(setToolbarTextMock).toHaveBeenCalledWith("Devices");

    await waitFor(() => {
      expect(screen.getByTestId("data-grid")).toBeInTheDocument();
      expect(setToolbarTextMock).toHaveBeenCalledWith("Devices");
    });

    // Check if the table columns are rendered
    const id = await screen.findByText("ID Number");
    const topicName = await screen.findByText("Device Name");

    expect(id).toBeInTheDocument();
    expect(topicName).toBeInTheDocument();
  });

  it("renders table columns correctly", async () => {
    const setToolbarTextMock = jest.fn();
    const columnHeaderStyle = {
      fontWeight: "bold",
    };

    render(
      <BrowserRouter>
        <AuthProvider>
          <Devices setToolbarText={setToolbarTextMock} />
        </AuthProvider>
      </BrowserRouter>
    );

    // Check if setToolbarText is called with the correct argument
    expect(setToolbarTextMock).toHaveBeenCalledWith("Devices");

    await waitFor(() =>
      expect(screen.getByTestId("data-grid")).toBeInTheDocument()
    );

    // Check if the table headers have correct styles
    const id = await screen.findByText("ID Number");
    const topicName = await screen.findByText("Device Name");

    expect(id).toHaveStyle(columnHeaderStyle);
    expect(topicName).toHaveStyle(columnHeaderStyle);
  });
});
