import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Login from "@/components/login/login";
import userEvent from "@testing-library/user-event";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children }) => <a>{children}</a>,
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  useSession: jest.fn().mockReturnValue({
    data: {
      user: {
        name: "Test User",
        email: "test@example.com",
        role_id: 1,
      },
    },
    status: "authenticated",
  }),
  signIn: jest.fn(),
}));

jest.mock("notistack", () => ({
  enqueueSnackbar: jest.fn(),
}));

describe("<Login />", () => {
  it("renders correctly", () => {
    render(<Login />);
    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
  });

  it("shows validation errors when trying to submit an empty form", async () => {
    render(<Login />);
    fireEvent.click(screen.getByText("Ingresar"));
    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeInTheDocument();
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });
  it("renders correctly the signup buttons", () => {
    render(<Login />);

    // Check for the presence of text
    expect(screen.queryByText("Quiero ser candidato")).toBeInTheDocument();
    expect(screen.queryByText("Soy una empresa")).toBeInTheDocument();
    const candidateSignupButton = screen.getByText("Quiero ser candidato");
    userEvent.click(candidateSignupButton);
  });
  it("renders correctly the login buttons", () => {
    render(<Login />);

    const loginButton = screen.getByText("Ingresar");
    userEvent.click(loginButton);
  });
});
