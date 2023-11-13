import React from "react";
import { IntlProvider } from "next-intl";
import { render, screen } from "@testing-library/react";
import Interviews from "./interviews"; // Adjust the import path as necessary
import InterviewList from "./interview-list";

jest.mock("../navbar/navbar", () => () => <div>Navbar Mock</div>);
jest.mock("../breadcrumbs/breadcrumbs", () => () => (
  <div>Breadcrumbs Mock</div>
));
jest.mock("./interview-list", () => () => <div>List Mock</div>);

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

const renderWithReactIntl = (component, locale, messages) => {
  return render(
    <IntlProvider locale={locale} messages={messages}>
      {component}
    </IntlProvider>
  );
};

const mockUseTranslations = (locale) => {
  jest.mock("next-intl", () => ({
    useTranslations: () => (key) => {
      const translations = {
        es: { title: "Entrevistas" },
        en: { title: "Interviews" },
      };
      return translations[locale][key];
    },
  }));
};

describe("Interviews", () => {
  const renderWithIntl = (locale = "en") => {
    render(
      <IntlProvider
        messages={{
          Interviews: {
            title: "Interviews",
            description: "Manage your scheduled interviews",
          },
        }}
        locale={locale}
        defaultLocale="en"
      >
        <Interviews />
      </IntlProvider>
    );
  };

  it("renders the title correctly", () => {
    mockUseTranslations("en");
    renderWithIntl("en");
    expect(screen.getByText("Interviews")).toBeInTheDocument();
  });
});
