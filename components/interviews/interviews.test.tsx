import React from "react";
import { IntlProvider } from "next-intl";
import { render, screen } from "@testing-library/react";
import Interviews from "./interviews"; // Adjust the import path as necessary

jest.mock("../navbar/navbar", () => () => <div>Navbar Mock</div>);
jest.mock("../breadcrumbs/breadcrumbs", () => () => (
  <div>Breadcrumbs Mock</div>
));

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
      <IntlProvider messages={{}} locale={locale} defaultLocale="en">
        <Interviews />
      </IntlProvider>
    );
  };

  it("renders the title correctly", () => {
    mockUseTranslations("en");
    renderWithIntl("en");
    expect(screen.getByText("Interviews.title")).toBeInTheDocument();
  });
});
