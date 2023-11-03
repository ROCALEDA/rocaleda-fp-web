import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
  it('should add a new employee when data is valid', async () => {
    const onAddSpy = jest.fn();
    const { getByLabelText, getByText } = render(<EmployeesModal open={true} onClose={() => {}} onAddEmployee={onAddSpy} />);

    fireEvent.change(getByLabelText(/Nombre del funcionario/i), { target: { value: 'Juan Perez' } });
    fireEvent.change(getByLabelText(/Nombre del perfil/i), { target: { value: 'Manager' } });
    fireEvent.click(getByText('AÑADIR'));

    await waitFor(() => expect(onAddSpy).toHaveBeenCalledWith({ name: 'Juan Perez', role: 'Manager' }));
});


});
