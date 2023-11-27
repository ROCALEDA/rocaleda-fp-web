describe("FPM-74 - Evaluación de desempeño candidato", { testIsolation: true }, () => {
  const customerEmail = "c.toros.customer@example.com";
  const customerPassword = "cristian";
  const projectName = "Proyecto prueba";
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

  it("Crear evaluación de desempeño", () => {
    cy.visit('/es/home');
    cy.url().should('include', '/es/home');
    cy.get('button').contains("Evaluar desempeño").click();
    cy.get('div#proyecto-select').click();
    cy.get('li').contains(projectName).click();
    cy.get('div#profile-select').click();
    cy.get('li').contains(candidateName).click();
    cy.get('textarea#standard-basic').type("Some results description");
    cy.get('button').contains("CALIFICAR COLABORADOR").click();
    cy.contains("Evaluación enviada con éxito");
  });
});
