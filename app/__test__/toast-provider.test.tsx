import React from "react";
import { render } from "@testing-library/react";

import IntegrationNotistack from "@/components/toast/toast-provider";

describe("IntegrationNotistack component", () => {
  it("renders its children", () => {
    const testMessage = "Test child component";

    const { getByText } = render(
      <IntegrationNotistack>
        <div>{testMessage}</div>
      </IntegrationNotistack>
    );

    expect(getByText(testMessage)).toBeInTheDocument();
  });
});
