import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import LanguageSelector from "@/components/language-selector.tsx/language-selector";

describe("<LanguageSelector />", () => {
  it("renders correctly", () => {
    render(<LanguageSelector />);

    expect(screen.getByText("Español")).toBeInTheDocument();
  });

  it("changes value when an item is clicked", () => {
    render(<LanguageSelector />);

    fireEvent.mouseDown(screen.getByRole("combobox"));
    const listItem = screen.getByText("Inglés");
    fireEvent.click(listItem);

    expect(screen.getByRole("combobox")).toHaveTextContent("Inglés");
  });
});
