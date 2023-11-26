import { faker } from "@faker-js/faker";

describe("FPM-71 - Creación de proyecto", { testIsolation: false }, () => {
    const customerEmail = 'c.toros.customer@example.com';
    const customerPassword = "cristian";
    const myuuid = faker.string.uuid();

  /*before(() => {
    cy.session([customerEmail, customerPassword], () => {
      cy.visit('/es/login');
      cy.get('input[name="email"]').type(customerEmail);
      cy.get('input[name="password"]').type(customerPassword);
      cy.get('button[type="submit"]').click();
    });
  });*/

  it("Llenar formulario de nuevo proyecto", () => {
    cy.session([customerEmail, customerPassword], () => {
        cy.visit('/es/login');
        cy.get('input[name="email"]').type(customerEmail);
        cy.get('input[name="password"]').type(customerPassword);
        cy.get('button[type="submit"]').click();
      });
    cy.get('[data-cy="projects-action"]').click();
    cy.get('[data-cy="create-project"]').click();
    cy.get('input[name="nombre"]').type('Prueba '+myuuid);
    cy.get('[data-cy="description"]').type('Este es un proyecto de prueba e2e');
    cy.get('[data-cy="add-profile"]').click();
    cy.get('input[type="text"]').type('Perfil Prueba');
    cy.get('[data-cy="tech-skills-select"]').click();
    cy.get('[data-value="Angular"]').click();
    cy.get('[data-value="AWS"]').click();
    cy.get('h4').contains("Crear perfil").click(0,0);
    cy.get('[data-cy="soft-skills-select"]').click();
    cy.get('[data-value="Adaptability"]').click();
    cy.get('[data-value="Communication"]').click();
    cy.get('h4').contains("Crear perfil").click(0,0);
    cy.get('input[type="number"]').type('2');
    cy.get('[data-cy="modal-profile"]').click();
    cy.contains('Perfil Prueba')
    cy.get('[data-cy="add-employee"]').click();
    cy.get('#":rg:"').click();

  });

});