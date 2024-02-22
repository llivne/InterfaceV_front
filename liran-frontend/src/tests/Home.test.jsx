import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../components/Home";

describe("Home", () => {
  it("renders the Home component with correct content", () => {
    const setToolbarText = jest.fn();

    const { getByTestId, getByText, getByAltText } = render(
      <Home setToolbarText={setToolbarText} />
    );

    // Check if setToolbarText is called with the correct value
    expect(setToolbarText).toHaveBeenCalledWith("Management Application");

    // Check if the Home component renders with the correct structure
    const homePage = getByTestId("home-page");
    expect(homePage).toBeInTheDocument();

    // Check if the image is rendered with the correct attributes
    const imgElement = getByAltText("Interface B");
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", "InterfaceMain.png");
    expect(imgElement).toHaveAttribute("width", "300");

    // Check if the typography components are rendered with the correct text
    expect(getByText("Interface B")).toBeInTheDocument();
    expect(
      getByText("Manage all your resources and facilities from only one place")
    ).toBeInTheDocument();
  });
});
