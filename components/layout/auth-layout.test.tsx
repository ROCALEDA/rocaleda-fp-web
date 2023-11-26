import React from "react";
import { render } from "@testing-library/react";
import AuthLayout from "@/components/layout/auth-layout";

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
