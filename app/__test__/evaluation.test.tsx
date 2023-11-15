import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EvalModal from '@/components/evaluation/evaluationModal';
import { SessionProvider } from "next-auth/react";

describe('<EvalModal />', () => {
beforeAll(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve,
        })
    );
});

afterAll(() => {
    global.fetch.mockClear();
    delete global.fetch;
});

test('renderiza el modal de evaluación', () => {
    const mockSession = {
        user: {
          name: "Test User",
          email: "test@example.com",
          role_id: 2,
        },
      };
    render(
    <SessionProvider session={mockSession}>
        <EvalModal open={true} onClose={() => {}} />
    </SessionProvider>
    );
    expect(screen.getByText('Evaluar desempeño')).toBeInTheDocument();
    
});

test('cambia la selección del proyecto y actualiza los perfiles', async () => {
    // Renderiza el componente
    const mockSession = {
        user: {
          name: "Test User",
          email: "test@example.com",
          role_id: 2,
        },
      };
    render(
        <SessionProvider session={mockSession}>
            <EvalModal open={true} onClose={() => {}} />
        </SessionProvider>
    );

    // Simula la selección de un proyecto
    fireEvent.change(screen.getByLabelText('Proyecto'), { target: { value: '1' } });

    // Espera a que se actualice la lista de perfiles (puede que necesites ajustar esto)
    await waitFor(() => {
        expect(screen.getByText('Perfil Asociado al Proyecto 1')).toBeInTheDocument();
    });
});

});