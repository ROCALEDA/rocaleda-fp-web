import React from "react";
import { render} from "@testing-library/react";
import Layout from "@/components/layout/balloon-layout";

describe('<Layout />', () => {
  it('renders without crashing', () => {
    expect(() => {
      render(<Layout>{}</Layout>,{});
    }).not.toThrow();
  });
});