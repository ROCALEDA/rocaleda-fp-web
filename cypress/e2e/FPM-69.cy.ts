import { faker } from "@faker-js/faker";

describe("FPM-69 - Formulario de registro de cliente (empresa)", () => {
  const userEmail = "PRUEBAEMP" + faker.internet.email();
  const userPassword = "password";

  before(() => {
    cy.visit("/es/login");
  });

  it("Llenar formulario de nueva empresa cliente", () => {
    cy.get('[data-cy="candidate-signup"]').click();
    cy.get('input[name="company"]').type(faker.company.name());
    cy.get('input[name="email"]').type(userEmail);
    cy.get('input[name="phone"]').type(faker.phone.number('###############'));
    cy.get('input[name="password"]').type(userPassword);
    cy.get('input[name="password2"]').type(userPassword);
    cy.get('[data-cy="candidate-register"]').click();
    cy.url().should("include", "/es/login");
    cy.contains('Registro completo exitoso');
  });

});
