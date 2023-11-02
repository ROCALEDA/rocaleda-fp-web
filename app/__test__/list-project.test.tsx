import React from 'react';
import { render, screen } from '@testing-library/react';
import ListProject from '@/components/projects/list-project';
import { SessionProvider } from 'next-auth/react';

describe('<ListProject />', () => {
  beforeEach(() => {
      global.fetch = jest.fn(() =>
          Promise.resolve({
              json: () => Promise.resolve([{ 
                  id: 1,
                  name: "Proyecto de prueba",
                  is_team_complete: false,
                  total_positions: 5,
                  positions: []
              }])
          })
      );
  });

  afterEach(() => {
      jest.clearAllMocks();
  });

  it('renders the component correctly', () => {
    const mockSession = {
      user: {
        name: "Test User",
        email: "test@example.com",
        role_id: 2
      }
    };

    render(
      <SessionProvider session={mockSession}>
        <ListProject />
      </SessionProvider>
    );

    expect(screen.getByText("Proyectos")).toBeInTheDocument();
    expect(screen.getByText("Gestiona tus proyectos y tu equipo")).toBeInTheDocument();
    expect(screen.getByText("CREAR")).toBeInTheDocument();
  });
});