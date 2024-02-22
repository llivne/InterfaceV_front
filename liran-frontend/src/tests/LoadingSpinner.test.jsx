import React from "react";
import { render } from "@testing-library/react";
import LoadingSpinner from "../components/helper_components/LoadingSpinner";

describe("LoadingSpinner", () => {
  it("renders the loading spinner and text", () => {
    const { getByText, getByTestId } = render(<LoadingSpinner />);

    // Check if the loading spinner div is rendered
    const loader = getByTestId("loader");
    expect(loader).toBeInTheDocument();

    // Check if the "Loading..." text is rendered
    const loadingText = getByText("Loading...");
    expect(loadingText).toBeInTheDocument();

    // Check if the "Loading..." text has the correct color
    expect(loadingText).toHaveStyle("color: #58B2EF");
  });
});
