import React from 'react';
import { render, screen } from '@testing-library/react';
import Projects from '@/components/candidatos/candidatos';


// Simulando el hook useSession
jest.mock('next-auth/react', () => ({
  useSession: jest.fn()
}));

describe('<Projects />', () => {
  it('renders the component correctly', () => {
    // Mockeando una sesión
    const mockSession = {
      user: {
        name: "Test User",
        email: "test@example.com",
        role_id: 1 // Puedes ajustar esto según tus necesidades
      }
    };

    // Configurando el hook useSession para que devuelva la sesión mockeada
    require('next-auth/react').useSession.mockReturnValue({ data: mockSession });

    render(<Projects />);

    // Verificar que el componente se renderice correctamente
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  // Puedes agregar más pruebas si esperas diferentes comportamientos según diferentes sesiones o la falta de una sesión
});