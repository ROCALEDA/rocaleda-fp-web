import React from "react";
import { render } from "@testing-library/react";
import ProyectPage from "../[locale]/projects/page";
import { SessionProvider } from "next-auth/react";

describe("<ProyectPage />", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              id: 1,
              name: "Proyecto de prueba",
              is_team_complete: false,
              total_positions: 5,
              positions: [],
            },
          ]),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it("renders without crashing", () => {
    const mockSession = {
      user: {
        name: "Test User",
        email: "test@example.com",
        role_id: 2,
      },
    };
    expect(() => {
      render(
        <SessionProvider session={mockSession}>
          <ProyectPage />
        </SessionProvider>
      );
    }).not.toThrow();
  });
});
