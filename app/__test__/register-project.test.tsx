import React from 'react';
import { render, screen } from '@testing-library/react';
import RegisterProyect from '@/components/project-register/project-register';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';


jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
  }));

describe('<RegisterProyect />', () => {
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

  it('renders without crashing', () => {
    const mockSession = {
      user: {
          name: "Test User",
          email: "test@example.com",
          role_id: 2
      }
  };
    expect(() => {
        render(
          <SessionProvider session={mockSession}>
            <RegisterProyect />
          </SessionProvider>
        );
    }).not.toThrow();
  });


});