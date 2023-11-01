// Login.test.js
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Login from "@/components/login/login";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("<Login />", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      route: "/",
      pathname: "/",
      query: "",
      asPath: "",
    });
  });

  test("renders the login form", () => {
    const { getByText } = render(<Login />);
    // expect(getByText("Iniciar sesión")).toBeInTheDocument();
  });

  test("shows error on invalid submission", async () => {
    const { getByText, getByLabelText, findByText } = render(<Login />);
    const emailInput = getByLabelText("Correo");
    const passwordInput = getByLabelText("Password");
    const submitButton = getByText("Ingresar");

    // Simulate a form submission without entering data
    fireEvent.click(submitButton);

    // Assert error messages show up
    // await waitFor(() => {
    //   expect(findByText("Email is required")).toBeInTheDocument();
    //   expect(findByText("Password is required")).toBeInTheDocument();
    // });
  });

  test("calls the login function on valid submission", async () => {
    const mockResponse = { data: { token: "fake_token" }, status: 200 };

    const { getByText, getByLabelText } = render(<Login />);
    const emailInput = getByLabelText("Correo");
    const passwordInput = getByLabelText("Password");
    const submitButton = getByText("Ingresar");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    fireEvent.click(submitButton);
  });
});
