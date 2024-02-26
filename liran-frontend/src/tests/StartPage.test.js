import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import StartPage from "../components/StartPage";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "../contexts/Auth.context";
import * as helpers from "../helpers";
import CustomThemeProvider from "../contexts/CustomTheme.context";

describe("StartPage component", () => {
  it("renders the StartPage component correctly", () => {
    render(
      <CustomThemeProvider>
        <StartPage />
      </CustomThemeProvider>
    );
    expect(screen.getByText("Interface B")).toBeInTheDocument();
    expect(screen.getByText("Log in")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("User")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "L O G I N" })
    ).toBeInTheDocument();
  });

  it("displays an error message for empty user field", () => {
    render(
      <CustomThemeProvider>
        <StartPage />
      </CustomThemeProvider>
    );
    const userInput = screen.getByPlaceholderText("User");

    fireEvent.change(userInput, { target: { value: "" } });
    fireEvent.click(screen.getByRole("button", { name: "L O G I N" }));

    expect(screen.getByRole("button", { name: "L O G I N" })).toHaveAttribute(
      "disabled"
    );
  });

  it("displays an error message for empty password field", () => {
    render(
      <CustomThemeProvider>
        <StartPage />
      </CustomThemeProvider>
    );
    const pswdInput = screen.getByPlaceholderText("Password");

    fireEvent.change(pswdInput, { target: { value: "" } });
    fireEvent.click(screen.getByRole("button", { name: "L O G I N" }));

    expect(screen.getByRole("button", { name: "L O G I N" })).toHaveAttribute(
      "disabled"
    );
  });

  it("handles password input correctly", () => {
    render(
      <CustomThemeProvider>
        <StartPage />
      </CustomThemeProvider>
    );
    const passwordInput = screen.getByPlaceholderText("Password");
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(passwordInput.value).toBe("password123");
  });

  it("submits the form on button click", async () => {
    const mockedLogin = jest
      .spyOn(helpers, "loginFunc")
      .mockImplementation(async () => {
        return ["true"];
      });
    const component = (
      <BrowserRouter>
        <AuthProvider>
          <CustomThemeProvider>
            <StartPage />
          </CustomThemeProvider>
        </AuthProvider>
      </BrowserRouter>
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
    expect(mockedLogin).toHaveBeenCalledWith("http://localhost:5000/login");

    unmount();

    await waitFor(async () => {
      const startPageElement = await screen.queryByTestId("start-page");
      expect(startPageElement).toBeNull();
    });
  });
});
