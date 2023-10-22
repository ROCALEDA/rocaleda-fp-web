import React from "react";
import { render, screen } from "@testing-library/react";
import Register from "@/components/candidate-register/register";

describe("Register Component", () => {
  beforeEach(() => {
    render(<Register />);
  });

  test("renders without crashing", () => {
    const registerTitle = screen.getByText(/Registrarme como candidato/i);
    expect(registerTitle).toBeInTheDocument();
  });

  test("renders form fields", () => {
    const nombreInput = screen.getByLabelText(/Nombre/i);
    const apellidoInput = screen.getByLabelText(/Apellido/i);
    const correoInput = screen.getByLabelText(/Correo/i);
    const passwordInput = screen.getByLabelText(/Contraseña/);
    const repeatPasswordInput = screen.getByLabelText(/Repetir contraseña/i);

    expect(nombreInput).toBeInTheDocument();
    expect(apellidoInput).toBeInTheDocument();
    expect(correoInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(repeatPasswordInput).toBeInTheDocument();
  });

  test("renders submit button", () => {
    const submitButton = screen.getByRole("button", { name: /Registrarme/i });
    expect(submitButton).toBeInTheDocument();
  });

  test("renders additional info", () => {
    const infoText1 = screen.getByText(
      /Acompañamiento en las posiciones que te interesan/i
    );
    const infoText2 = screen.getByText(/Acceso a las mejores posiciones/i);
    expect(infoText1).toBeInTheDocument();
    expect(infoText2).toBeInTheDocument();
  });

  test("renders login prompt", () => {
    const loginPrompt = screen.getByText(/Ya tienes una cuenta\?/i);
    const loginButton = screen.getByText(/Ingresar/i);
    expect(loginPrompt).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
});
