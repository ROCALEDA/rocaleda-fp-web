import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TechTestModal from '@/components/techtest/techtestModal';
import { SessionProvider } from "next-auth/react";

describe('<TechTestModal />', () => {
  const mockSession = {
    user: {
      name: "Test User",
      email: "test@example.com",
      token: "test-token"
    },
  };

  const mockProject = {
    id: 1,
    name: "Proyecto de Prueba",
    positions: [
      { id: 1, name: "Desarrollador Frontend" },
      { id: 2, name: "Desarrollador Backend" }
    ]
  };

  test('se renderiza correctamente con un proyecto', () => {
    render(
      <SessionProvider session={mockSession}>
        <TechTestModal open={true} onClose={() => {}} project={mockProject} />
      </SessionProvider>
    );

    expect(screen.getByText('Registrar prueba técnica')).toBeInTheDocument();
    expect(screen.getByLabelText('Nombre Prueba')).toBeInTheDocument();
    expect(screen.getByLabelText('Posición')).toBeInTheDocument();
    expect(screen.getByLabelText('Descripción de habilidades técnicas')).toBeInTheDocument();
  });

  test('maneja la selección de posición y candidato', async () => {
    render(
      <SessionProvider session={mockSession}>
        <TechTestModal open={true} onClose={() => {}} project={mockProject} />
      </SessionProvider>
    );
    
    fireEvent.mouseDown(screen.getByLabelText('Posición'));

    const listItem = await screen.findByRole('option', { name: 'Desarrollador Frontend' });
    fireEvent.click(listItem);
  });
  test('permite ingresar texto en el campo de observaciones', () => {
    render(
      <SessionProvider session={mockSession}>
        <TechTestModal open={true} onClose={() => {}} project={mockProject} />
      </SessionProvider>
    );
  
    const observationsInput = screen.getByLabelText('Descripción de habilidades técnicas');
    fireEvent.change(observationsInput, { target: { value: 'Nuevas observaciones' } });
  
    expect(observationsInput.value).toBe('Nuevas observaciones');
  });
  test('llama onClose cuando se presiona el botón cancelar', () => {
    const mockOnClose = jest.fn();
    render(
      <SessionProvider session={mockSession}>
        <TechTestModal open={true} onClose={mockOnClose} project={mockProject} />
      </SessionProvider>
    );
  
    fireEvent.click(screen.getByText('CANCELAR'));
    expect(mockOnClose).toHaveBeenCalled();
  });
  global.fetch = jest.fn();

  beforeEach(() => {
    fetch.mockClear();
  });
  test('muestra errores de validación al intentar enviar un formulario vacío', async () => {
    render(
      <SessionProvider session={mockSession}>
        <TechTestModal open={true} onClose={() => {}} project={mockProject} />
      </SessionProvider>
    );

    const submitButton = screen.getByText('REGISTRAR PRUEBA');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Por favor debe seleccionar una posición.')).toBeInTheDocument();
      expect(screen.getByText('Por favor debe seleccionar un candidato.')).toBeInTheDocument();
    });
  });

  

});