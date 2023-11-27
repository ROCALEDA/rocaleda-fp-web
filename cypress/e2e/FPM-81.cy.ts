describe("FPM-85 - Registro de resultado de prueba técnica", { testIsolation: true }, () => {
  const customerEmail = "c.toros.customer@example.com";
  const customerPassword = "cristian";
  const projectName = "Mi proyectoy";
  const positionName = "Desarrollador Frontend";
  const candidateName = "Roberto Parra";

  before(() => {
    cy.session([customerEmail, customerPassword], () => {
      cy.visit('/es/login');
      cy.get('input[name="email"]').type(customerEmail);
      cy.get('input[name="password"]').type(customerPassword);
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/home');
    });
  });

  it("Seleccionar candidato elegido para la posición", () => {
    cy.visit('/es/home');
    cy.url().should('include', '/es/home');
    cy.get('[data-cy="projects-action"]').click();
    cy.url().should('include', '/es/projects');
    cy.contains(projectName).click();
    cy.get('h5').contains(projectName);
    cy.get('[data-cy="modal_techtest"]').click();

    cy.get('input#name-test').type('Prueba de prueba');
    cy.get('div#position-select').click();
    cy.get('li').contains(positionName).click();
    cy.get('div#candidate-select').click();
    cy.get('li').contains(candidateName).click();
    cy.get('textarea#standard-basic').type("Something promising");
    cy.get('button').contains("Registrar Prueba").click();
    cy.contains("Prueba técnica guardada con éxito.");
  });
});
