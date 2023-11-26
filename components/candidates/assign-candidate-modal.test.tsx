import { act, fireEvent, render, waitFor } from "@/utils/test-utils";
import { mockProjects } from "@/__mocks__/projects";
import AssignCandidateModal from "./assign-candidate-modal";

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

describe("CandidateModal", () => {
  it("It renders correctly the modal", async () => {
    let screen;

    // Wrap the rendering in act
    await act(async () => {
      screen = render(
        <AssignCandidateModal
          projects={mockProjects}
          candidate={{
            fullname: "Candidate name",
            soft_skills: [],
            tech_skills: [],
            user_id: "5",
          }}
        />,
        {
          userRole: 2,
          locale: "en",
        }
      );
    });

    fireEvent.click(screen.getByText(/assignPosition/i));

    expect(screen.getByText("assignPosition")).toBeInTheDocument();
  });
});
