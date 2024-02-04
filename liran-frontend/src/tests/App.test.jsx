import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../components/App";

describe("App component", () => {
  it("renders StartPage when not authenticated", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Interface B")).toBeInTheDocument();
    });
  });

  // Add more tests for other functionalities as needed
});
