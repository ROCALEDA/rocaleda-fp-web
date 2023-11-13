import { IntlProvider } from "next-intl";
import InterviewList from "./interview-list";
import { render, screen, waitFor } from "@testing-library/react";

const mockInterviewsData = {
  data: [
    {
      subject: "Entrevista IV",
      client_name: "Compañia ST",
      realization_date: "2023-10-10T00:00:00",
      score: null,
    },
    {
      subject: "Entrevista final",
      client_name: "Empresa Cristian",
      realization_date: "2023-11-11T08:00:00",
      score: 90,
    },
  ],
  total_pages: 1,
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockInterviewsData),
  })
);

jest.mock("next-auth/react", () => ({
  useSession: jest.fn().mockReturnValue({
    data: {
      user: {
        name: "Test User",
        email: "test@example.com",
        role_id: 1,
      },
    },
    status: "authenticated",
  }),
  signIn: jest.fn(),
}));

const renderWithIntl = async (locale = "en") => {
  const messages = (await import(`../../lang/${locale}.json`)).default;
  renderWithReactIntl(<Interviews />, messages, locale);
};

const renderWithReactIntl = (component, locale, messages) => {
  return render(
    <IntlProvider locale={locale} messages={messages}>
      {component}
    </IntlProvider>
  );
};

describe("InterviewList", () => {
  it("fetches and displays interviews", async () => {
    const messages = (await import(`../../lang/en.json`)).default;
    renderWithReactIntl(<InterviewList />, messages, "en");

    await waitFor(() => {
      expect(screen.getByText("Entrevista final")).toBeInTheDocument();
    });
  });
});
