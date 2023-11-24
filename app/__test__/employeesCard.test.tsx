import React from "react";
import { render } from "@testing-library/react";
import EmployeeCard from "@/components/projects/create/employeesCard";

describe("<EmployeeCard />", () => {
  it("renders without crashing", () => {
    expect(() => {
      render(
        <EmployeeCard
          name="John Doe"
          role="Developer"
          onEditClick={() => {}}
          onDeleteClick={() => {}}
        />
      );
    }).not.toThrow();
  });
});
