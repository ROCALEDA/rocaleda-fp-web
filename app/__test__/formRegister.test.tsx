import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FormRegisterProyect from "@/components/project-register/form-register";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("<FormRegisterProyect />", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              id: 1,
              name: "Proyecto de prueba",
              is_team_complete: false,
              total_positions: 5,
              positions: [],
            },
          ]),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it("renders without crashing", () => {
    const mockSession = {
      user: {
        name: "Test User",
        email: "test@example.com",
        role_id: 2,
      },
    };
    const { getByText } = render(
      <SessionProvider session={mockSession}>
        <FormRegisterProyect />
      </SessionProvider>
    );
    expect(getByText("1. Datos Básicos")).toBeInTheDocument();
    expect(getByText("2. Perfiles")).toBeInTheDocument();
    expect(getByText("3. Funcionarios")).toBeInTheDocument();
  });
  it("allows input of project name", () => {
    const mockSession = {
      user: {
        name: "Test User",
        email: "test@example.com",
        role_id: 2,
      },
    };
    const mockSetProyectName = jest.fn();
    const mockSetProyectDescription = jest.fn();
    const mockSetProfiles = jest.fn();
    const mockSetEmployees = jest.fn();
    const { getByLabelText } = render(
      <SessionProvider session={mockSession}>
        <FormRegisterProyect
          setProyectName={mockSetProyectName}
          setProyectDescription={mockSetProyectDescription}
          setProfiles={mockSetProfiles}
          setEmployees={mockSetEmployees}
        />
      </SessionProvider>
    );

    const input = getByLabelText("Nombre");
    fireEvent.change(input, { target: { value: "Nuevo Proyecto" } });
    expect(input.value).toBe("Nuevo Proyecto");
  });
  it("allows input of project description", () => {
    const mockSession = {
      user: {
        name: "Test User",
        email: "test@example.com",
        role_id: 2,
      },
    };
    const mockSetProyectName = jest.fn();
    const mockSetProyectDescription = jest.fn();
    const mockSetProfiles = jest.fn();
    const mockSetEmployees = jest.fn();

    const { getByLabelText } = render(
      <SessionProvider session={mockSession}>
        <FormRegisterProyect
          setProyectName={mockSetProyectName}
          setProyectDescription={mockSetProyectDescription}
          setProfiles={mockSetProfiles}
          setEmployees={mockSetEmployees}
        />
      </SessionProvider>
    );

    const input = getByLabelText("Descripción");
    fireEvent.change(input, { target: { value: "Descripción de prueba" } });
    expect(input.value).toBe("Descripción de prueba");
  });
  it('should reset the form when "Cancelar" button is clicked', () => {
    const mockSession = {
      user: {
        name: "Test User",
        email: "test@example.com",
        role_id: 2,
      },
    };
    const mockSetProyectName = jest.fn();
    const mockSetProyectDescription = jest.fn();
    const mockSetProfiles = jest.fn();
    const mockSetEmployees = jest.fn();

    const { getByLabelText, getByText } = render(
      <SessionProvider session={mockSession}>
        <FormRegisterProyect
          setProyectName={mockSetProyectName}
          setProyectDescription={mockSetProyectDescription}
          setProfiles={mockSetProfiles}
          setEmployees={mockSetEmployees}
        />
      </SessionProvider>
    );

    const nameInput = getByLabelText("Nombre");
    fireEvent.change(nameInput, { target: { value: "Proyecto de prueba" } });

    const descriptionInput = getByLabelText("Descripción");
    fireEvent.change(descriptionInput, {
      target: { value: "Descripción del proyecto de prueba" },
    });

    // Ahora, haz clic en el botón "Cancelar"
    const cancelButton = getByText("Cancelar");
    fireEvent.click(cancelButton);

    // Verificar que los campos del formulario se hayan restablecido
    expect(nameInput.value).toBe(""); // Nombre debe estar vacío
    expect(descriptionInput.value).toBe(""); // Descripción debe estar vacío
  });
  it("should open the profile modal when 'CREAR PERFIL' button is clicked", () => {
    const mockSession = {
      user: {
        name: "Test User",
        email: "test@example.com",
        role_id: 2,
      },
    };
    const mockSetProyectName = jest.fn();
    const mockSetProyectDescription = jest.fn();
    const mockSetProfiles = jest.fn();
    const mockSetEmployees = jest.fn();

    const { getByLabelText, getByText } = render(
      <SessionProvider session={mockSession}>
        <FormRegisterProyect
          setProyectName={mockSetProyectName}
          setProyectDescription={mockSetProyectDescription}
          setProfiles={mockSetProfiles}
          setEmployees={mockSetEmployees}
        />
      </SessionProvider>
    );

    const button = getByText(/CREAR PERFIL/i);
    fireEvent.click(button);

    const modal = screen.getByTestId("profile-modal");
    expect(modal).toBeVisible();
  });
  it("should open the profile modal when 'AÑADIR FUNCIONARIO' button is clicked", () => {
    const mockSession = {
      user: {
        name: "Test User",
        email: "test@example.com",
        role_id: 2,
      },
    };
    const mockSetProyectName = jest.fn();
    const mockSetProyectDescription = jest.fn();
    const mockSetProfiles = jest.fn();
    const mockSetEmployees = jest.fn();

    const { getByLabelText, getByText } = render(
      <SessionProvider session={mockSession}>
        <FormRegisterProyect
          setProyectName={mockSetProyectName}
          setProyectDescription={mockSetProyectDescription}
          setProfiles={mockSetProfiles}
          setEmployees={mockSetEmployees}
        />
      </SessionProvider>
    );

    const button = getByText(/AÑADIR FUNCIONARIO/i);
    fireEvent.click(button);

    const modal = screen.getByTestId("employee-modal");
    expect(modal).toBeVisible();
  });
  it('should display "El nombre es obligatorio" message when "Crear Proyecto" button is clicked and name and description are empty', async () => {
    const mockSession = {
      user: {
        name: "Test User",
        email: "test@example.com",
        role_id: 2,
      },
    };

    const { getByText } = render(
      <SessionProvider session={mockSession}>
        <FormRegisterProyect />
      </SessionProvider>
    );

    const createProjectButton = getByText(/CREAR PROYECTO/i);
    fireEvent.click(createProjectButton);

    await waitFor(() => {
      expect(getByText("El nombre es obligatorio")).toBeInTheDocument();
      expect(getByText("La descripción es obligatoria")).toBeInTheDocument();
    });
  });
  it('should open the profile modal and display "Crear perfil"', async () => {
    const mockSession = {
      user: {
        name: "Test User",
        email: "test@example.com",
        role_id: 2,
      },
    };
    const { getByText } = render(
      <SessionProvider session={mockSession}>
        <FormRegisterProyect />
      </SessionProvider>
    );

    // Abre el modal de perfil
    fireEvent.click(getByText("CREAR PERFIL"));

    // Espera a que el modal se muestre y verifica que contenga la palabra 'Crear perfil'
    await waitFor(() => expect(getByText("Crear perfil")).toBeVisible());
  });
});
