import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import SelectedProject from '@/components/projects/selected-project';


// Mock de useSession
jest.mock('next-auth/react', () => ({
  useSession: () => ({ data: { user: { token: 'fake-token' } } })
}));

// Mock de useMediaQuery
jest.mock('@mui/material/useMediaQuery');

describe('SelectedProject', () => {
    beforeEach(() => {
        // Hacer un mock de la función fetch global
        global.fetch = jest.fn().mockImplementation(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve([{ user_id: 1, fullname: 'John Doe' }]),
          })
        );
    
        // Aquí se hace mock de la implementación de useMediaQuery
        (useMediaQuery as jest.Mock).mockImplementation(() => false);
      });
    
      afterEach(() => {
        jest.clearAllMocks();
      });

      it('fetches candidates and displays them', async () => {
        const mockProject = {
          name: 'Project Test',
          is_team_complete: false,
          positions: [
            { id: 1, is_open: true, name: 'Position 1', candidates: [] },
            // ... asegúrate de que solo haya una posición abierta si quieres que fetch se llame solo una vez
          ],
          total_positions: 1,
        };
      
        render(<SelectedProject project={mockProject} />);
      
        expect(screen.getByText('Cargando...')).toBeInTheDocument();
      
        await waitFor(() => {
          expect(screen.getByText('John Doe')).toBeInTheDocument();
        });
      
        // Ajusta esta cantidad al número esperado de posiciones abiertas
        //expect(fetch).toHaveBeenCalledTimes(mockProject.positions.filter(pos => pos.is_open).length);
        //expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/positions/1/candidates'), expect.anything());
      });

  // ... más tests para otros comportamientos del componente
});
