import { faker } from "@faker-js/faker";

describe("FPM-85 - Selección de candidato a asignar a un equipo", { testIsolation: true }, () => {
  const customerEmail = "c.toros.customer@example.com";
  const customerPassword = "cristian";
  const myuuid = faker.string.uuid();
  const projectName = "Test" + myuuid;
  const positionName = "Desarrollador Frontend";

  before(() => {
    cy.session([customerEmail, customerPassword], () => {
      cy.visit('/es/login');
      cy.get('input[name="email"]').type(customerEmail);
      cy.get('input[name="password"]').type(customerPassword);
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/home');
    });
    cy.visit('/es/home');
    cy.url().should('include', '/es/home');
    cy.get('[data-cy="projects-action"]').click();
    cy.url().should('include', '/es/projects');
    cy.get('[data-cy="create-project"]').click();
    cy.get('input[name="nombre"]').type(projectName);
    cy.get('[data-cy="description"]').type("Proyecto de prueba selección candidato");
    cy.get('[data-cy="add-profile"]').click();
    cy.get('[data-cy="profileName"]').type(positionName);
    cy.get('[data-cy="tech-skills-select"]').click();
    cy.get('[data-value="Angular"]').click();
    cy.get('body').click(0,0);
    cy.get('[data-cy="soft-skills-select"]').click();
    cy.get('[data-value="Communication"]').click();
    cy.get('body').click(0,0);
    cy.get('[data-cy="modal-profile"]').click();
    cy.get('[data-cy="add-employee"]').type('Empleado Prueba');
    cy.get('[data-cy="employee-name"]').type('Empleado Prueba');
    cy.get('[data-cy="employee-role"]').type('Rol Prueba');
    cy.get('[data-cy="modal-employee"]').click();
    cy.get('[data-cy="register-project"]').click();
    cy.contains(projectName);
    cy.visit('/es/home');
    cy.url().should('include', '/es/home');
    cy.get('[data-cy="candidates-action"]').click();
    cy.url().should('include', '/es/candidates');
    cy.get('table.MuiTable-root').find('tbody').find('tr').first().click();
    cy.get('button').contains("Asignar posición").click();
    cy.get('div#project-selector').click();
    cy.get('li').contains(projectName).click();
    cy.get('div#position-selector').click();
    cy.get('li').contains(positionName).click();
    cy.get('[data-cy="preasignar-candidato"]').click();
    cy.contains("Test User asignado a "+projectName);
  });

  it("Seleccionar candidato elegido para la posición", () => {
    cy.visit('/es/home');
    cy.url().should('include', '/es/home');
    cy.get('[data-cy="projects-action"]').click();
    cy.url().should('include', '/es/projects');
    cy.contains(projectName).click();
    cy.get('h5').contains(projectName);
    cy.contains("Posiciones abiertas");
    cy.get('p').contains(positionName).click();
    cy.get('div[role="radiogroup"]').find('label').first().click();
    cy.get('button').contains('Seleccionar').click({force: true});
    cy.get('p.MuiTypography-root').find('svg');
  });
});
