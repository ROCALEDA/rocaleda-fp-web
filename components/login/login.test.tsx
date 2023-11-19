import "@testing-library/jest-dom";
import React, { ReactNode } from "react";
import { IntlProvider } from "next-intl";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { signIn } from "next-auth/react";

import Login from "./login";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
const mockTranslations = require("../../lang/en.json");

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

jest.mock("notistack", () => ({
  useSnackbar: () => ({
    enqueueSnackbar: jest.fn(),
  }),
}));

const renderWithReactIntl = (component: ReactNode) => {
  return render(
    <IntlProvider messages={mockTranslations} locale="en">
      {component}
    </IntlProvider>
  );
};

describe("Login", () => {
  it("Render login", async () => {
    const { getByText } = renderWithReactIntl(<Login />);

    expect(getByText("Welcome again")).toBeInTheDocument();
  });

  it("renders correctly the signup buttons", () => {
    const screen = renderWithReactIntl(<Login />);

    // Check for the presence of text
    expect(
      screen.queryByText("I want to apply to a company")
    ).toBeInTheDocument();
    expect(screen.queryByText("I have a company")).toBeInTheDocument();
    const candidateSignupButton = screen.getByText(
      "I want to apply to a company"
    );
    userEvent.click(candidateSignupButton);
  });
});

describe("Login validations", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shows validation errors when trying to submit an empty form", async () => {
    const { getByText, getByRole } = renderWithReactIntl(<Login />);
    const loginButton = getByRole("button", { name: "Login" });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(getByText("Email is required")).toBeInTheDocument();
      expect(getByText("Password is required")).toBeInTheDocument();
    });
  });

  it("onLogin function gets called and navigates on successful login", async () => {
    const screen = renderWithReactIntl(<Login />);

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    const mockSignIn = signIn as jest.MockedFunction<typeof signIn>;

    mockSignIn.mockImplementation(() => Promise.resolve({ ok: true }));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith("credentials", {
        email: "test@example.com",
        password: "password123",
        redirect: false,
      });
    });
  });
});
