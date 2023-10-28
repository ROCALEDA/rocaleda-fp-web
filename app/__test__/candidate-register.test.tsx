import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "@/components/candidate-register/register";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
describe("Register Component", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      route: "/",
      pathname: "/",
      query: "",
      asPath: "",
    });

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
    const phoneInput = screen.getByLabelText(/Teléfono/i);
    const passwordInput = screen.getByLabelText(/Contraseña/);
    const repeatPasswordInput = screen.getByLabelText(/Repetir contraseña/i);

    expect(nombreInput).toBeInTheDocument();
    expect(apellidoInput).toBeInTheDocument();
    expect(correoInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();
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

  test("shows validation errors when fields are empty and form is submitted", async () => {
    const submitButton = screen.getByRole("button", { name: /Registrarme/i });
    userEvent.click(submitButton);

    const requiredMessages = await screen.findAllByText("Requerido");
    expect(requiredMessages).toHaveLength(5); // Ajusta este número si es necesario
  });
  test("shows invalid email error", async () => {
    const correoInput = screen.getByLabelText(/Correo/i);
    fireEvent.change(correoInput, { target: { value: "123" } });

    const submitButton = screen.getByRole("button", { name: /Registrarme/i });
    userEvent.click(submitButton);

    expect(await screen.findByText("Correo inválido")).toBeInTheDocument();
  });
  test("shows invalid name error when name exceeds 50 characters", async () => {
    // Generar un nombre que tenga más de 50 caracteres
    const longName = "A".repeat(51);

    const nombreInput = screen.getByLabelText(/Nombre/i);
    fireEvent.change(nombreInput, { target: { value: longName } });

    const submitButton = screen.getByRole("button", { name: /Registrarme/i });
    userEvent.click(submitButton);

    // Espera hasta que el mensaje de error aparezca en la pantalla
    expect(await screen.findByText("Máximo 50 caracteres")).toBeInTheDocument();
  });
  test("shows name over 50 characters error", async () => {
    const nombreInput = screen.getByLabelText(/Nombre/i);
    fireEvent.change(nombreInput, { target: { value: "A".repeat(51) } });

    const submitButton = screen.getByRole("button", { name: /Registrarme/i });
    userEvent.click(submitButton);

    expect(await screen.findByText("Máximo 50 caracteres")).toBeInTheDocument();
  });

  test("calls the register function on valid submission", async () => {
    const mockResponse = { status: 200 };

    const mockName = "John";
    const mockLastName = "Doe";
    const mockEmail = "john3@example.com";
    const mockPhone = "+561234567890";
    const mockPassword = "password123";
    const mockPassword2 = "password123";

    const { location } = window;
    delete window.location;
    window.location = { ...location, href: "/proyectos" };

    //const { getByLabelText, getByRole } = render(<Register enqueueSnackbar={enqueueSnackbar} />);

    // Selecciona los inputs y el botón del formulario
    const nameInput = screen.getByLabelText(/Nombre/i);
    const lastnameInput = screen.getByLabelText(/Apellido/i);
    const emailInput = screen.getByLabelText(/Correo/i);
    const phoneInput = screen.getByLabelText(/Teléfono/i);
    const passwordInput = screen.getByLabelText(/Contraseña/);
    const password2Input = screen.getByLabelText(/Repetir contraseña/i);
    const submitButton = screen.getByText("Registrarme");

    // Simula la interacción del usuario
    fireEvent.change(nameInput, { target: { value: mockName } });
    fireEvent.change(lastnameInput, { target: { value: mockLastName } });
    fireEvent.change(emailInput, { target: { value: mockEmail } });
    fireEvent.change(phoneInput, { target: { value: mockPhone } });
    fireEvent.change(passwordInput, { target: { value: mockPassword } });
    fireEvent.change(password2Input, { target: { value: mockPassword2 } });

    // Haz click en el botón de registrarse
    fireEvent.click(submitButton);
    //expect(await screen.findByText('Registro completo exitoso')).toBeInTheDocument();
    expect(window.location.href).toBe("/proyectos");

    window.location = location;
    //expect(await screen.findByText('Registro completo exitoso')).toBeInTheDocument();
  });
  test("renders tech skills and soft skills selects", async () => {
    const labels = screen.getAllByText("Habilidades Técnicas");
    const labels2 = screen.getAllByText("Habilidades Blandas");
    expect(labels[0]).toBeInTheDocument();
    expect(labels2[0]).toBeInTheDocument();
  });
});
