import React from "react";
import { render } from "@testing-library/react";
import AuthLayout from "@/components/layout/auth-layout";

describe("<AuthLayout />", () => {
  it("renders the LanguageSelector component", () => {
    const { getByTestId } = render(
      <AuthLayout>
        <div>Child Content</div>
      </AuthLayout>
    );
    expect(getByTestId("language-selector")).toBeInTheDocument();
  });

  it("displays the passed text prop", () => {
    const customText = "Custom Text Here";
    const { getByText } = render(
      <AuthLayout text={customText}>
        <div>Child Content</div>
      </AuthLayout>
    );
    expect(getByText(customText)).toBeInTheDocument();
  });
});
