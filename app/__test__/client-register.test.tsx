import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "@/components/client-register/register";
import { registerCompany } from "@/api/apiService";

describe("Register Component", () => {
  beforeEach(() => {
    render(<Register />);
  });

  test("Company input does not accept digits and is limited to 50 characters", () => {
    const companyInput = screen.getByLabelText(/compañía/i);

    userEvent.type(companyInput, "Company123");

    waitFor(() => {
      expect(companyInput.value).toBe("Company");
    });

    const longString = "a".repeat(51);
    userEvent.type(companyInput, longString);
    waitFor(() => {
      expect(companyInput.value).toBe("a".repeat(50));
    });
  });

  test("Email validation works correctly", () => {
    const emailInput = screen.getByLabelText(/correo/i);

    userEvent.type(emailInput, "invalidemail.com");
    waitFor(() => {
      expect(
        screen.getByText("Por favor ingresa un correo válido")
      ).toBeInTheDocument();
    });

    userEvent.clear(emailInput);
    userEvent.type(emailInput, "valid@email.com");
    expect(screen.queryByText("Por favor ingresa un correo válido")).toBeNull();
  });

  test("Password input shows error for length less than 8 characters", () => {
    const { getByText, getByLabelText, findByText } = render(<Register />);
    const passwordInput = getByLabelText(/Contraseña/);;

    userEvent.type(passwordInput, "1234567");

    waitFor(() => {
      expect(
        screen.getByText("La contraseña debe tener al menos 8 caracteres")
      ).toBeInTheDocument();
    });
  });

  test("Check if passwords match", () => {
    const { getByText, getByLabelText, findByText } = render(<Register />);
    const passwordInput = getByLabelText(/Contraseña/);
    const password2Input = getByLabelText(/Repetir contraseña/);
    userEvent.type(passwordInput, "password123");
    userEvent.type(password2Input, "password456");
    userEvent.type(password2Input, "password123");
  });
});
