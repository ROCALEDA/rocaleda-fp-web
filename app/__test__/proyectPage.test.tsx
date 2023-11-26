import React from "react";
import { render } from "@testing-library/react";
import ProyectPage from "../[locale]/projects/page";
import { SessionProvider } from "next-auth/react";

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    push: jest.fn(),
    prefetch: jest.fn(),
    replace: jest.fn(),
  }),
  useParams: () => ({
    locale: "en",
  }),
}));

jest.mock("next-intl", () => ({
  useLocale: () => "es",
  useTranslations: () => (key) => key, // Modify this line
}));

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
