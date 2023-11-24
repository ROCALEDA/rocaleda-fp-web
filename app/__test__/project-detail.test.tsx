import React from "react";
import { render, screen, waitFor } from "@testing-library/react"; // Importa waitFor
import DetailProject from "@/components/projects/project-detail";
import { SessionProvider } from "next-auth/react";

jest.mock("next-intl", () => ({
  useLocale: () => "es",
  useTranslations: () => (key: any) => key,
}));

describe("<DetailProject />", () => {
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

  it("renders the projects correctly", async () => {
    // Marca la función de la prueba como asincrónica
    const mockSetSelectedProject = jest.fn();
    const mockSession = {
      user: {
        name: "Test User",
        email: "test@example.com",
        role_id: 2,
      },
    };

    render(
      <SessionProvider session={mockSession}>
        <DetailProject setSelectedProject={mockSetSelectedProject} />
      </SessionProvider>
    );

    // Utiliza waitFor para esperar a que el texto esté disponible
    await waitFor(() => {
      const titles = screen.getAllByText("team_pending");
      expect(titles.length).toBeGreaterThan(0);
    });
  });
});
