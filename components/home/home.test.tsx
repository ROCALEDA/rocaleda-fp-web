import { mockInterviews } from "@/__mocks__/interviews";
import { render } from "../../utils/test-utils";
import Home from "./home";
import { mockCandidates } from "@/__mocks__/candidates";

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
  useTranslations: () => (key: any) => key,
}));

global.fetch = jest.fn((url) =>
  Promise.resolve({
    ok: true,
    json: () => {
      if (url.endsWith("/interviews")) {
        return Promise.resolve(mockInterviews);
      } else if (url.endsWith("/candidate")) {
        return Promise.resolve(mockCandidates);
      }
      // Fallback for unexpected URLs
      return Promise.resolve({});
    },
  })
);

describe("Home", () => {
  it("renders correctly for admin user (role 1)", () => {
    const screen = render(<Home />, { userRole: 1, locale: "en" });
    expect(screen.getByText("candidates.title")).toBeInTheDocument();
    expect(screen.queryByText("interviews.title")).not.toBeInTheDocument();
  });

  it("renders correctly for company user (role 2)", () => {
    const screen = render(<Home />, { userRole: 2, locale: "en" });
    expect(screen.getByText("candidates.title")).toBeInTheDocument();
    expect(screen.getByText("projects.title")).toBeInTheDocument();
  });

  it("renders correctly for candidate user (role 3)", () => {
    const screen = render(<Home />, { userRole: 3, locale: "en" });
    expect(screen.queryByText("candidates.title")).not.toBeInTheDocument();
    expect(screen.queryByText("projects.title")).not.toBeInTheDocument();
    expect(screen.getByText("interviews.title")).toBeInTheDocument();
  });

  it("renders correctly project button", () => {
    const screen = render(<Home />, { userRole: 2, locale: "en" });
    expect(
      screen.getByRole("link", { name: "projects.action" })
    ).toHaveAttribute("href", "/projects");
  });

  it("renders correctly candidate button", () => {
    const screen = render(<Home />, { userRole: 2, locale: "en" });

    expect(
      screen.getByRole("link", { name: "candidates.action" })
    ).toHaveAttribute("href", "/candidates");
  });

  it("renders correctly interview button", () => {
    const screen = render(<Home />, { userRole: 3, locale: "en" });
    expect(
      screen.getByRole("link", { name: "interviews.action" })
    ).toHaveAttribute("href", "/interviews");
  });
});
