import React from "react";
import { render } from "@testing-library/react";
import EmployeesModal from "@/components/employeesModal/employees_modal";

describe('<EmployeesModal />', () => {
  it('renders without crashing', () => {
    expect(() => {
      render(<EmployeesModal open={true} onClose={() => {}} />);
    }).not.toThrowError();
  });
});