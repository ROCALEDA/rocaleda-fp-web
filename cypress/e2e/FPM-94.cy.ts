describe("FPM-94 - Listado de proyectos dado un cliente", { testIsolation: false }, () => {
  const customerEmail = "c.toros.customer@example.com";
  const customerPassword = "cristian";

  beforeEach(() => {
    cy.session([customerEmail, customerPassword], () => {
      cy.visit('/es/login');
      cy.get('input[name="email"]').type(customerEmail);
      cy.get('input[name="password"]').type(customerPassword);
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/home');
    });
  });

  it("Verificar listado de proyectos cliente con proyectos", () => {
    cy.visit('/es/home');
    cy.url().should('include', '/es/home');
    cy.get('[data-cy="projects-action"]').click();
    cy.url().should('include', '/es/projects');
    cy.contains("Proyectos");
    cy.contains("Administra tus proyectos");
    cy.contains("Proyecto Final IV");
    cy.contains("Proyecto Final IV");
    cy.get('div.MuiGrid-root').find('div.MuiPaper-root').its('length').should('be.gte', 5);
  });
});
