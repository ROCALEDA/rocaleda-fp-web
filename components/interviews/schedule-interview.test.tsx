import { act, render } from "@/utils/test-utils";
import ScheduleInterview from "./schedule-interview";
import { mockCandidates } from "@/__mocks__/candidates";
import { mockPositions } from "@/__mocks__/positions";

const mockTriggerInterviews = jest.fn();

jest.mock("next-intl", () => ({
  useLocale: () => "es",
  useTranslations: () => (key) => key, // Modify this line
}));

global.fetch = jest.fn((url) =>
  Promise.resolve({
    ok: true,
    json: () => {
      if (url.endsWith("/candidate")) {
        return Promise.resolve(mockCandidates);
      } else if (url.includes("/positions")) {
        return Promise.resolve(mockPositions);
      } else if (url.endsWith("/another/endpoint")) {
        return Promise.resolve(mockCandidates);
      }
      // Fallback for unexpected URLs
      return Promise.resolve({});
    },
  })
);

describe("Candidates", () => {
  it("renders the schedule interview button", async () => {
    let screen;
    await act(async () => {
      screen = render(
        <ScheduleInterview triggerInterviews={mockTriggerInterviews} />,
        { userRole: 2, locale: "en" }
      );
    });

    expect(screen.getByText("schedule")).toBeInTheDocument();
  });
});
