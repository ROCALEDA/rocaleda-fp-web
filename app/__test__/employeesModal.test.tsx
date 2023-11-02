import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EmployeesModal from "@/components/project-register/employeesModal";

describe('EmployeesModal', () => {

    it('renders without crashing', () => {
        render(<EmployeesModal open={true} onClose={jest.fn()} onAddEmployee={jest.fn()} />);
        expect(screen.getByText('Añadir Funcionario')).toBeInTheDocument();
    });

    it('shows edit text when employeeToEdit is provided', () => {
        render(<EmployeesModal open={true} onClose={jest.fn()} onAddEmployee={jest.fn()} employeeToEdit={{ name: 'John', role: 'Manager' }} />);
        expect(screen.getByText('Editar Funcionario')).toBeInTheDocument();
    });

    it('can input employee name and role', () => {
        render(<EmployeesModal open={true} onClose={jest.fn()} onAddEmployee={jest.fn()} />);
        fireEvent.change(screen.getByLabelText('Nombre del funcionario'), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText('Nombre del perfil'), { target: { value: 'Manager' } });
        expect(screen.getByLabelText('Nombre del funcionario').value).toBe('John');
        expect(screen.getByLabelText('Nombre del perfil').value).toBe('Manager');
    });
    it('resets and closes modal on cancel button click', () => {
      const onCloseMock = jest.fn();
      render(<EmployeesModal open={true} onClose={onCloseMock} onAddEmployee={jest.fn()} />);
      fireEvent.change(screen.getByLabelText('Nombre del funcionario'), { target: { value: 'John' } });
      fireEvent.click(screen.getByText('CANCELAR'));
      expect(onCloseMock).toHaveBeenCalledTimes(1); 
  });


});
