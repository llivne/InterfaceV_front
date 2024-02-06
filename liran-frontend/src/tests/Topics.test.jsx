import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "../contexts/Auth.context";
import Topics from "../components/individual_pages/Topics";

describe("Topics component", () => {
  it("renders Topics component correctly", async () => {
    const setToolbarTextMock = jest.fn();

    render(
      <BrowserRouter>
        <AuthProvider>
          <Topics setToolbarText={setToolbarTextMock} />
        </AuthProvider>
      </BrowserRouter>
    );

    // Check if setToolbarText is called with the correct argument
    expect(setToolbarTextMock).toHaveBeenCalledWith("Topics");

    await waitFor(() => {
      expect(screen.getByTestId("data-grid")).toBeInTheDocument();
      expect(setToolbarTextMock).toHaveBeenCalledWith("Topics");
    });

    // Check if the table columns are rendered
    const id = await screen.findByText("ID Number");
    const topicName = await screen.findByText("Topic name");

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
          <Topics setToolbarText={setToolbarTextMock} />
        </AuthProvider>
      </BrowserRouter>
    );

    // Check if setToolbarText is called with the correct argument
    expect(setToolbarTextMock).toHaveBeenCalledWith("Topics");

    await waitFor(() =>
      expect(screen.getByTestId("data-grid")).toBeInTheDocument()
    );

    // Check if the table headers have correct styles
    const id = await screen.findByText("ID Number");
    const topicName = await screen.findByText("Topic name");

    expect(id).toHaveStyle(columnHeaderStyle);
    expect(topicName).toHaveStyle(columnHeaderStyle);
  });
});
