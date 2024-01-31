import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import StartPage from "../components/StartPage";
import * as helpers from "../helpers";

describe("StartPage component", () => {
  it("renders the StartPage component correctly", () => {
    render(<StartPage />);
    expect(screen.getByText("Interface B")).toBeInTheDocument();
    expect(screen.getByText("Log in")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("User")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "L O G I N" })
    ).toBeInTheDocument();
  });

  //   it("displays an error message for invalid email", () => {
  //     render(<Signup />);
  //     const emailInput = screen.getByPlaceholderText("Email");

  //     fireEvent.change(emailInput, { target: { value: "invalid-email" } });
  //     fireEvent.click(screen.getByRole("button", { name: "Extended" }));

  //     expect(
  //       screen.getByText("Enter a valid email address.")
  //     ).toBeInTheDocument();
  //   });

  it("handles password input correctly", () => {
    render(<StartPage />);
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(passwordInput.value).toBe("password123");
  });

  it("submits the form on button click", async () => {
    const mockedAuth = jest.fn();

    const mockedLogin = jest
      .spyOn(helpers, "login")
      .mockImplementation(async () => {
        mockedAuth(true);
        return ["true"];
      });

    const component = (
      <StartPage login={mockedLogin} setIsAuthenticated={mockedAuth} />
    );

    const { unmount } = render(component);
    const userInput = screen.getByPlaceholderText("User");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(userInput, {
      target: { value: "valid-user" },
    });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(screen.getByRole("button", { name: "L O G I N" }));
    expect(mockedLogin).toHaveBeenCalled();
    expect(mockedLogin.mock.calls.length).toBe(1);
    expect(mockedLogin).toHaveBeenCalledWith(
      "http://localhost:5000/login"
    );

    expect(mockedAuth).toHaveBeenCalledWith(true);
    unmount();

    await waitFor(async () => {
      const startPageElement = await screen.queryByTestId("start-page");
      expect(startPageElement).toBeNull();
    });
  });
});
