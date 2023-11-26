import React from "react";
import ProjectForm from "@/components/projects/create/form-register";
import {
  RenderResult,
  act,
  fireEvent,
  render,
  waitFor,
} from "@/utils/test-utils";

jest.mock("next-intl", () => ({
  useLocale: () => "es",
  useTranslations: () => (key: any) => key,
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockSetProyectName = jest.fn();
const mockSetProyectDescription = jest.fn();
const mockSetProfiles = jest.fn();
const mockSetEmployees = jest.fn();

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
    const screen = render(<ProjectForm />, { userRole: 2, locale: "en" });
    expect(screen.getByText("form.basic")).toBeInTheDocument();
    expect(screen.getByText("form.create_profile")).toBeInTheDocument();
    expect(screen.getByText("form.employees")).toBeInTheDocument();
  });

  it("allows input of project name", async () => {
    let screen;

    await act(async () => {
      screen = render(
        <ProjectForm
          setProyectName={mockSetProyectName}
          setProyectDescription={mockSetProyectDescription}
          setProfiles={mockSetProfiles}
          setEmployees={mockSetEmployees}
        />,
        { userRole: 2, locale: "en" }
      );
    });
    await waitFor(() => {
      const input = screen?.getByLabelText("form.name");
      fireEvent.change(input, { target: { value: "Nuevo Proyecto" } });
      expect(input.value).toBe("Nuevo Proyecto");
    });
  });
  it("allows input of project description", async () => {
    let screen: any;

    await act(async () => {
      screen = render(
        <ProjectForm
          setProyectName={mockSetProyectName}
          setProyectDescription={mockSetProyectDescription}
          setProfiles={mockSetProfiles}
          setEmployees={mockSetEmployees}
        />,
        { userRole: 2, locale: "en" }
      );
    });

    await waitFor(() => {
      const input = screen?.getByLabelText("form.description");
      fireEvent.change(input, { target: { value: "Descripción de prueba" } });
      expect(input.value).toBe("Descripción de prueba");
    });
  });
  it('should reset the form when "Cancelar" button is clicked', async () => {
    let screen: any;

    await act(async () => {
      screen = render(
        <ProjectForm
          setProyectName={mockSetProyectName}
          setProyectDescription={mockSetProyectDescription}
          setProfiles={mockSetProfiles}
          setEmployees={mockSetEmployees}
        />,
        { userRole: 2, locale: "en" }
      );
    });

    await waitFor(() => {
      const nameInput = screen.getByLabelText("form.name");
      fireEvent.change(nameInput, { target: { value: "Proyecto de prueba" } });

      const descriptionInput = screen.getByLabelText("form.description");
      fireEvent.change(descriptionInput, {
        target: { value: "Descripción del proyecto de prueba" },
      });

      // Ahora, haz clic en el botón "Cancelar"
      const cancelButton = screen.getByText("form.cancel");
      fireEvent.click(cancelButton);

      // Verificar que los campos del formulario se hayan restablecido
      expect(nameInput.value).toBe(""); // Nombre debe estar vacío
      expect(descriptionInput.value).toBe(""); // Descripción debe estar vacío
    });
  });
  it("should open the profile modal when 'CREAR PERFIL' button is clicked", async () => {
    let screen: any;

    await act(async () => {
      screen = render(
        <ProjectForm
          setProyectName={mockSetProyectName}
          setProyectDescription={mockSetProyectDescription}
          setProfiles={mockSetProfiles}
          setEmployees={mockSetEmployees}
        />,
        { userRole: 2, locale: "en" }
      );
    });

    const button = screen.getByText("form.create_profile");
    fireEvent.click(button);

    const modal = screen.getByTestId("profile-modal");
    expect(modal).toBeVisible();
  });
  it("should open the profile modal when 'AÑADIR FUNCIONARIO' button is clicked", async () => {
    let screen: any;

    await act(async () => {
      screen = render(
        <ProjectForm
          setProyectName={mockSetProyectName}
          setProyectDescription={mockSetProyectDescription}
          setProfiles={mockSetProfiles}
          setEmployees={mockSetEmployees}
        />,
        { userRole: 2, locale: "en" }
      );
    });
    const button = screen.getByText("form.add_employee");
    fireEvent.click(button);

    const modal = screen.getByTestId("employee-modal");
    expect(modal).toBeVisible();
  });
  it('should display "El nombre es obligatorio" message when "Crear Proyecto" button is clicked and name and description are empty', async () => {
    let screen: any;

    await act(async () => {
      screen = render(
        <ProjectForm
          setProyectName={mockSetProyectName}
          setProyectDescription={mockSetProyectDescription}
          setProfiles={mockSetProfiles}
          setEmployees={mockSetEmployees}
        />,
        { userRole: 2, locale: "en" }
      );
    });

    const createProjectButton = screen.getByText("form.create_project");
    fireEvent.click(createProjectButton);

    await waitFor(() => {
      expect(screen.getByText("El nombre es obligatorio")).toBeInTheDocument();
      expect(
        screen.getByText("La descripción es obligatoria")
      ).toBeInTheDocument();
    });
  });
  it('should open the profile modal and display "Crear perfil"', async () => {
    let screen: any;

    await act(async () => {
      screen = render(
        <ProjectForm
          setProyectName={mockSetProyectName}
          setProyectDescription={mockSetProyectDescription}
          setProfiles={mockSetProfiles}
          setEmployees={mockSetEmployees}
        />,
        { userRole: 2, locale: "en" }
      );
    });
    // Abre el modal de perfil
    fireEvent.click(screen.getByText("form.create_profile"));

    // Espera a que el modal se muestre y verifica que contenga la palabra 'Crear perfil'
    await waitFor(() =>
      expect(screen.getByText("create_profile")).toBeVisible()
    );
  });
});
