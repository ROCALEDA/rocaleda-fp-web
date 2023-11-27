import React from "react";
import Interviews from "./interviews";
import { act, render, waitFor } from "@/utils/test-utils";
import { mockInterviews } from "@/__mocks__/interviews";
import { mockCandidates } from "@/__mocks__/candidates";
import { mockPositions } from "@/__mocks__/positions";
import { mockProjects } from "@/__mocks__/projects";

jest.mock("../navbar/navbar", () => {
  const NavbarMock = () => <div>Navbar Mock</div>;
  return NavbarMock;
});

jest.mock("../breadcrumbs/breadcrumbs", () => {
  const BreadcrumbsMock = () => <div>Breadcrumbs Mock</div>;
  return BreadcrumbsMock;
});

jest.mock("next-intl", () => ({
  useLocale: () => "es",
  useTranslations: () => (key: any) => key,
}));

global.fetch = jest.fn((url) =>
  Promise.resolve({
    ok: true,
    json: () => {
      if (url.endsWith("/candidate")) {
        return Promise.resolve(mockCandidates);
      } else if (url.includes("/projects")) {
        return Promise.resolve(mockProjects);
      } else if (url.endsWith("/interviews")) {
        return Promise.resolve(mockInterviews);
      }
      // Fallback for unexpected URLs
      return Promise.resolve({});
    },
  })
);

describe("Interviews", () => {
  it("renders the title correctly", async () => {
    let screen;

    await act(async () => {
      screen = render(<Interviews />, { userRole: 2, locale: "en" });
    });
    expect(screen.getByText("title")).toBeInTheDocument();
  });
});
