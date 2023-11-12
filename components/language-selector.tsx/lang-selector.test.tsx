import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import LanguageSelector from "./language-selector"; // Adjust the import path as necessary

// Mocking the necessary hooks and modules
jest.mock("next-intl/client", () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
  usePathname: () => "/some-path",
}));

jest.mock("next-intl", () => ({
  useLocale: () => "es",
}));

describe("LanguageSelector", () => {
  it("renders correctly", () => {
    render(<LanguageSelector />);
    expect(screen.getByLabelText("Idioma")).toBeInTheDocument();
  });

  it("changes language when a new option is selected", () => {
    render(<LanguageSelector />);
    fireEvent.mouseDown(screen.getByRole("combobox", { name: /Idioma/i }));
    fireEvent.click(screen.getByText("Inglés"));
    expect(screen.getByRole("combobox")).toHaveTextContent("Español");
  });
});
