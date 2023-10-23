import React from "react";
import { render } from "@testing-library/react";
import BalloonLayout from "@/components/layout/balloon-layout";

describe('<BalloonLayout />', () => {
    it('renders without crashing', () => {
      const { getByAltText } = render(<BalloonLayout />);
      expect(getByAltText('Balloon')).toBeInTheDocument();
    });
  });