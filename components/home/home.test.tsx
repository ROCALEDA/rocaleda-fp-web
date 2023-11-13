import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./home";
import { SessionProvider } from "next-auth/react";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    push: jest.fn(),
    prefetch: jest.fn(),
    replace: jest.fn(),
  }),
  useParams: () => ({
    locale: "es",
  }),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(),
  })),
  useLocale: () => "es",
}));
jest.mock("next-intl", () => ({
  useLocale: () => "es",
  useTranslations: () => (key) => key, // Modify this line
}));

describe("Home", () => {
  const renderComponentWithSession = (userRole) => {
    const mockSession = {
      user: {
        name: "Test User",
        email: "test@example.com",
        role_id: userRole,
      },
    };

    render(
      <SessionProvider session={mockSession}>
        <Home />
      </SessionProvider>
    );
  };

  it("renders correctly for admin user (role 1)", () => {
    renderComponentWithSession(1);
    expect(screen.getByText("candidates.title")).toBeInTheDocument();
    expect(screen.getByText("projects.title")).toBeInTheDocument();
    expect(screen.queryByText("Entrevistas")).not.toBeInTheDocument();
  });

  it("renders correctly for company user (role 2)", () => {
    renderComponentWithSession(2);
    expect(screen.getByText("candidates.title")).toBeInTheDocument();
    expect(screen.getByText("projects.title")).toBeInTheDocument();
    expect(screen.queryByText("Entrevistas")).not.toBeInTheDocument();
  });

  it("renders correctly for candidate user (role 3)", () => {
    renderComponentWithSession(3);
    expect(screen.queryByText("candidates.title")).not.toBeInTheDocument();
    expect(screen.queryByText("projects.title")).not.toBeInTheDocument();
    expect(screen.getByText("interviews.title")).toBeInTheDocument();
  });

  it("renders correctly project button", () => {
    renderComponentWithSession(2);
    expect(
      screen.getByRole("link", { name: "projects.action" })
    ).toHaveAttribute("href", "/projects");
  });

  it("renders correctly candidate button", () => {
    renderComponentWithSession(2);

    expect(
      screen.getByRole("link", { name: "candidates.action" })
    ).toHaveAttribute("href", "/candidates");
  });

  it("renders correctly interview button", () => {
    renderComponentWithSession(3);

    expect(
      screen.getByRole("link", { name: "interviews.action" })
    ).toHaveAttribute("href", "/interviews");
  });
});
