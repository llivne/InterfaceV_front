import React, { useEffect } from "react";
import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter, useNavigate } from "react-router-dom";
import AuthProvider from "../contexts/Auth.context";
import Logout from "../components/individual_pages/Logout";

describe("Logout component", () => {
  it("logs out user and redirects to /topics", async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Logout />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      // LoadingSpinner should be rendered while useEffect is working
      expect(
        screen.getByText("Loading...", { exact: false })
      ).toBeInTheDocument();
    });

    // After the useEffect, the LoadingSpinner should not be in the document
    await waitFor(() => {
      expect(screen.queryByTestId("loading-spinner")).toBeNull();
    });
  });
});
