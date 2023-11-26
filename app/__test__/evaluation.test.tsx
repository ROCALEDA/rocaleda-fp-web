import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import EvalModal from '@/components/evaluation/evaluationModal';
import { SessionProvider } from "next-auth/react";

jest.mock("next-intl", () => ({
  useTranslations: () => (key) => {
    const translations: { [key: string]: string } = {
        "title": "Evaluar desempeño",
        "name": "Proyecto",
        "role": "Colaborador",
        "description": "Descripción de calificación",
        "cancel": "CANCELAR",
        "save": "CALIFICAR COLABORADOR",
        "project_required": "Por favor debe seleccionar un proyecto.",
        "profile_required": "Por favor debe seleccionar un colaborador.",
        "observation_required": "Las observaciones no pueden estar vacías",
        "success_save": "Evaluación enviada con éxito",
        "error_save": "Error al enviar la evaluación"
    };
    return translations[key];
  },
}));


describe('<EvalModal />', () => {

    const mockSession = {
        user: {
          name: "Test User",
          email: "test@example.com",
          token: "test-token"
        },
      };
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
    render(
    <SessionProvider session={mockSession}>
        <EvalModal open={true} onClose={() => {}} />
    </SessionProvider>
    );
    expect(screen.getByText('Evaluar desempeño')).toBeInTheDocument();
    expect(screen.getByText('Proyecto')).toBeInTheDocument();
    expect(screen.getByText('Colaborador')).toBeInTheDocument();
    expect(screen.getByText('Descripción de calificación')).toBeInTheDocument();
    expect(screen.getByText('CANCELAR')).toBeInTheDocument();
    expect(screen.getByText('CALIFICAR COLABORADOR')).toBeInTheDocument();

    
    
});

test('Escribe descripcion de calificación', async () => {
    render(
        <SessionProvider session={mockSession}>
            <EvalModal open={true} onClose={() => {}} />
        </SessionProvider>
        );
    const description = screen.getByLabelText('Descripción de calificación');
    fireEvent.change(description, { target: { value: 'Excelente' } });
    expect(description.value).toBe('Excelente');
});

test('Cerrar modal', async () => {
    render(
        <SessionProvider session={mockSession}>
            <EvalModal open={true} onClose={() => {}} />
        </SessionProvider>
        );
    fireEvent.click(screen.getByText('CANCELAR'));
    expect(screen.getByText('Evaluar desempeño')).toBeInTheDocument();
});





});