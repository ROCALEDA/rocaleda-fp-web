import React, { ReactNode } from "react";
import { render as testingLibraryRender } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

function customRender(
  ui: React.JSX.Element,
  {
    userRole = 1,
    locale = "en",
    ...renderOptions
  }: { userRole: number; locale: string }
) {
  function Wrapper({ children }: { children: ReactNode }) {
    const mockSession = {
      user: {
        name: "Test User",
        email: "test@example.com",
        role_id: userRole,
        token: "Fake token",
      },
      expires: "never",
    };
    return <SessionProvider session={mockSession}>{children}</SessionProvider>;
  }
  return testingLibraryRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";

export { customRender as render };
