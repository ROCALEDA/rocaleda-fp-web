import { faker } from "@faker-js/faker";

describe("FPM-65 - Formulario de registro de usuario candidato", () => {
  const userEmail = "PRUEBACAN" + faker.internet.email();
  const userPassword = "password";

  before(() => {
    cy.visit("/es/login");
  });

  it("Llenar formulario de nuevo candidato", () => {
    cy.contains("Quiero ser candidato").click();
    cy.get('input[name="nombre"]').type("Candidato");
    cy.get('input[name="apellido"]').type("Prueba");
    cy.get('input[name="email"]').type(userEmail);
    cy.get('input[name="phone"]').type(faker.phone.number('###############'));
    cy.get('input[name="password"]').type(userPassword);
    cy.get('input[name="password2"]').type(userPassword);
    cy.get("#habilidades-técnicas-select").click();
    cy.contains("Frontend").click();
    cy.contains("Backend").click();
    cy.get('body').click(0,0)
    cy.get("#habilidades-blandas-select").click();
    cy.contains("Leadership").click();
    cy.contains("Responsibility").click();
    cy.get('body').click(0,0);
    /*cy.get('button').contains("Registrarme").click();
    cy.url().should("include", "/es/login");
    cy.contains('Registro completo exitoso');*/
  });

});
