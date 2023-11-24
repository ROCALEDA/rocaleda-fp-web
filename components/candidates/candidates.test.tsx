import { act, render, waitFor } from "@/utils/test-utils";
import Candidates from "./candidates";
import userEvent from "@testing-library/user-event";
import CandidatesTable from "./candidates-table";
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
  useTranslations: () => (key) => key, // Modify this line
}));

jest.mock("../navbar/navbar", () => {
  const NavbarMock = () => <div>Navbar Mock</div>;
  return NavbarMock;
});

jest.mock("../breadcrumbs/breadcrumbs", () => {
  const BreadcrumbsMock = () => <div>Breadcrumbs Mock</div>;
  return BreadcrumbsMock;
});

describe("Candidates", () => {
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: [], total_pages: 0, test: 100 }),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("It renders correctly the page", async () => {
    let screen;

    // Wrap the rendering in act
    await act(async () => {
      screen = render(<Candidates />, { userRole: 2, locale: "en" });
    });

    const h3Element = screen?.getByRole("heading", { name: "title" });
    expect(h3Element.tagName).toBe("H3");
  });

  it("It renders correctly the two selectors", async () => {
    const screen = render(<Candidates />, { userRole: 2, locale: "en" });

    await act(() => global.fetch);

    const techSkillSelect = screen.getByTestId("select-tech_skills");
    expect(techSkillSelect).toBeInTheDocument();
    userEvent.click(techSkillSelect);

    const softSkillSelect = screen.getByTestId("select-soft_skills");
    expect(softSkillSelect).toBeInTheDocument();
  });
});

describe("Candidates Table", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("It renders correctly the candidates", async () => {
    let fetchMock = jest.fn();
    global.fetch = fetchMock;

    fetchMock.mockResolvedValue({
      status: 200,
      json: jest.fn(() => ({ data: mockCandidates, total_pages: 7 })),
    });
    const screen = render(<CandidatesTable />, { userRole: 2, locale: "en" });

    await waitFor(() => {
      const tdElements = screen.getAllByRole("cell");
      expect(tdElements).toHaveLength(10);
    });
  });
});
