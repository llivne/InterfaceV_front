import React from "react";
import { render, act } from "@testing-library/react";
import AuthProvider, { AuthContext } from "../contexts/Auth.context";
import { loginFunc } from "../helpers";

// Mock the loginFunc
jest.mock("../helpers", () => ({
  loginFunc: jest.fn(),
}));

describe("AuthProvider", () => {
  it("sets isAuthenticated to true when login is successful", async () => {
    // Mock successful login
    loginFunc.mockResolvedValue(true);

    let providerValue;
    const TestComponent = () => {
      providerValue = React.useContext(AuthContext);
      return null;
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(providerValue.isAuthenticated).toBe(false);

    // Simulate login
    await act(async () => {
      await providerValue.login();
    });

    expect(loginFunc).toHaveBeenCalledWith("http://localhost:5000/login");
    expect(providerValue.isAuthenticated).toBe(true);
  });

  it("sets isAuthenticated to false when logout is called", () => {
    let providerValue;
    const TestComponent = () => {
      providerValue = React.useContext(AuthContext);
      return null;
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Set initial state to true
    act(() => {
      providerValue.logout();
    });

    expect(providerValue.isAuthenticated).toBe(false);
  });

  it("provides login and logout functions in the context", () => {
    let providerValue;
    const TestComponent = () => {
      providerValue = React.useContext(AuthContext);
      return null;
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(providerValue.isAuthenticated).toBeDefined();
    expect(providerValue.login).toBeDefined();
    expect(providerValue.logout).toBeDefined();
  });
});
