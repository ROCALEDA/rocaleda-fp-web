import { faker } from "@faker-js/faker";

describe("FPM-71 - Creación de proyecto", { testIsolation: false }, () => {
  const customerEmail = "c.toros.customer@example.com";
  const customerPassword = "cristian";
  const myuuid = faker.string.uuid();
  const projectName = "Test" + myuuid;

  beforeEach(() => {
    cy.session([customerEmail, customerPassword], () => {
      cy.visit('/es/login');
      cy.get('input[name="email"]').type(customerEmail);
      cy.get('input[name="password"]').type(customerPassword);
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/home');
    });
  });

  it("Llenar formulario de nuevo proyecto", () => {
    cy.visit('/es/home');
    cy.url().should('include', '/es/home');
    cy.get('[data-cy="projects-action"]').click();
    cy.url().should('include', '/es/projects');
    cy.get('[data-cy="create-project"]').click();
    cy.get('input[name="nombre"]').type(projectName);
    cy.get('[data-cy="description"]').type("Este es un proyecto de prueba e2e");
    cy.get('[data-cy="add-profile"]').click();
    cy.get('[data-cy="profileName"]').type("Perfil Prueba");
    cy.get('[data-cy="tech-skills-select"]').click();
    cy.get('[data-value="Angular"]').click();
    cy.get('[data-value="AWS"]').click();
    cy.get('body').click(0,0);
    cy.get('[data-cy="soft-skills-select"]').click();
    cy.get('[data-value="Adaptability"]').click();
    cy.get('[data-value="Communication"]').click();
    cy.get('body').click(0,0);
    cy.get('input[type="number"]').clear().type('2');
    cy.get('[data-cy="modal-profile"]').click();
    cy.contains("Perfil Prueba");
    cy.get('[data-cy="add-employee"]').type('Empleado Prueba');
    cy.get('[data-cy="employee-name"]').type('Empleado Prueba');
    cy.get('[data-cy="employee-role"]').type('Rol Prueba');
    cy.get('[data-cy="modal-employee"]').click();
    cy.contains("Empleado Prueba");
    cy.get('[data-cy="register-project"]').click();
    cy.contains("Proyecto creado:");
    cy.contains(projectName);
  });
});
