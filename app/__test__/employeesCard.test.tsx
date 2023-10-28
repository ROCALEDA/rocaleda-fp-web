import React from "react";
import { render} from "@testing-library/react";
import EmployeeCard from "@/components/employeesCard/employees_card";

describe('<EmployeeCard />', () => {
  it('renders without crashing', () => {
    expect(() => {
      render(<EmployeeCard />);
    }).not.toThrow();
  });
});