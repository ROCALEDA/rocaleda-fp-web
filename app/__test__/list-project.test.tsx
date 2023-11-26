import React from "react";
import { SessionProvider } from "next-auth/react";
import ProjectList from "@/components/projects/project-list";
import { act, render, waitFor } from "@/utils/test-utils";

jest.mock("next-intl", () => ({
  useLocale: () => "es",
  useTranslations: () => (key: any) => key,
}));

describe("<ListProject />", () => {
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

  it("renders the component correctly", async () => {
    let screen;

    await act(async () => {
      screen = render(<ProjectList />, { userRole: 2, locale: "en" });
    });
    const h3Element = screen?.getByRole("heading", { name: "title" });
    expect(h3Element.tagName).toBe("H4");
  });
});
