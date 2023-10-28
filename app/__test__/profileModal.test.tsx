import React from "react";
import { render } from "@testing-library/react";
import ProfileModal from "@/components/profileModal/profile_modal";

describe('<ProfileModal />', () => {
  it('renders without crashing', () => {
    expect(() => {
      render(<ProfileModal open={true} onClose={() => {}} onAdd={() => {}} />);
    }).not.toThrowError();
  });
});