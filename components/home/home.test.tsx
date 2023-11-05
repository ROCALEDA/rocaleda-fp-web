import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./home";
import { SessionProvider } from "next-auth/react";

describe("Home", () => {
  it("renders correctly with ADMIN USER", () => {
    const mockSession = {
      user: {
        name: "Test User",
        email: "test@example.com",
        role_id: 1,
      },
    };

    render(
      <SessionProvider session={mockSession}>
        <Home />
      </SessionProvider>
    );

    // Check for the presence of text
    expect(screen.queryByText("Candidatos")).toBeInTheDocument();
    expect(screen.queryByText("Proyectos")).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "Ver candidatos" })
    ).toHaveAttribute("href", "/candidates");
    expect(screen.getByRole("link", { name: "Ver proyectos" })).toHaveAttribute(
      "href",
      "/projects"
    );
  });

  it("renders correctly with COMPANY USER", () => {
    const mockSession = {
      user: {
        name: "Test User",
        email: "test@example.com",
        role_id: 2,
      },
    };

    render(
      <SessionProvider session={mockSession}>
        <Home />
      </SessionProvider>
    );

    // Check for the presence of text
    expect(screen.queryByText("Candidatos")).toBeInTheDocument();
    expect(screen.queryByText("Proyectos")).toBeInTheDocument();
    expect(screen.queryByText("Entrevistas")).not.toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "Ver candidatos" })
    ).toHaveAttribute("href", "/candidates");
    expect(screen.getByRole("link", { name: "Ver proyectos" })).toHaveAttribute(
      "href",
      "/projects"
    );
  });

  it("renders correctly with CANDIDATE USER", () => {
    const mockSession = {
      user: {
        name: "Test User",
        email: "test@example.com",
        role_id: 3,
      },
    };

    render(
      <SessionProvider session={mockSession}>
        <Home />
      </SessionProvider>
    );

    // Check for the presence of text
    expect(screen.queryByText("Candidatos")).not.toBeInTheDocument();
    expect(screen.queryByText("Proyectos")).not.toBeInTheDocument();
    expect(screen.queryByText("Entrevistas")).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "Ver entrevistas" })
    ).toHaveAttribute("href", "/interviews");
  });
});
