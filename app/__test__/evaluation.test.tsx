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

});