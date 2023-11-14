import React from "react";
import { render, screen } from "@testing-library/react";
import Layout from "@/components/layout/project-layout";
import { SessionProvider } from "next-auth/react";

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    push: jest.fn(),
    prefetch: jest.fn(),
    replace: jest.fn(),
  }),
  useParams: () => ({
    locale: "en",
  }),
}));

jest.mock("next-intl", () => ({
  useLocale: () => "es",
  useTranslations: () => (key) => key, // Modify this line
}));

describe("<Layout />", () => {
  it("renders the layout correctly", () => {
    const testChildText = "Test Child Content";
    const mockSession = {
      user: {
        name: "Test User",
        email: "test@example.com",
        role_id: 2,
      },
    };
    render(
      <SessionProvider session={mockSession}>
        <Layout>
          <div>{testChildText}</div>
        </Layout>
      </SessionProvider>
    );

    expect(screen.getByTestId("responsiveAppBarTestId")).toBeInTheDocument();
    expect(screen.getByTestId("CustomBreadcrumbsTestId")).toBeInTheDocument();

    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });
});
