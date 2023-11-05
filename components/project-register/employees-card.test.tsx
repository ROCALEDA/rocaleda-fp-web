import { render, screen, fireEvent } from "@testing-library/react";
import EmployeeCard from "./employeesCard"; // Adjust the import path as needed

describe("EmployeeCard", () => {
  const mockOnEditClick = jest.fn();
  const mockOnDeleteClick = jest.fn();
  const employeeProps = {
    name: "John Doe",
    role: "Developer",
    onEditClick: mockOnEditClick,
    onDeleteClick: mockOnDeleteClick,
  };

  it("renders employee information", () => {
    render(<EmployeeCard {...employeeProps} />);
    expect(screen.getByText(employeeProps.name)).toBeInTheDocument();
    expect(screen.getByText(employeeProps.role)).toBeInTheDocument();
  });

  it("calls onEditClick when edit button is clicked", () => {
    render(<EmployeeCard {...employeeProps} />);
    const editButton = screen.getByRole("button", { name: "edit" });
    fireEvent.click(editButton);
    expect(mockOnEditClick).toHaveBeenCalledWith({
      name: "John Doe",
      role: "Developer",
    });
  });

  it("calls onDeleteClick when delete button is clicked", () => {
    render(<EmployeeCard {...employeeProps} />);
    const deleteButton = screen.getByRole("button", { name: "delete" });
    fireEvent.click(deleteButton);
    expect(mockOnDeleteClick).toHaveBeenCalledWith("John Doe");
  });
});
