import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import LanguageSelector from "./language-selector";

jest.mock("next-intl/client", () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
  usePathname: () => "/some-path",
}));

jest.mock("next-intl", () => ({
  useLocale: () => "es",
  useTranslations: () => (key) => key, // Modify this line
}));

describe("LanguageSelector", () => {
  it("renders correctly", () => {
    render(<LanguageSelector />);
    expect(screen.getByLabelText("language")).toBeInTheDocument();
  });
});
