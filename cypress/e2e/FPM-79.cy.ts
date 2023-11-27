describe("FPM-79 - Listado de candidatos con filtros", { testIsolation: false }, () => {
  const customerEmail = "c.toros.customer@example.com";
  const customerPassword = "cristian";

  beforeEach(() => {
    cy.viewport('macbook-16');
    cy.session([customerEmail, customerPassword], () => {
      cy.visit('/es/login');
      cy.get('input[name="email"]').type(customerEmail);
      cy.get('input[name="password"]').type(customerPassword);
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/home');
    });
  });

  it("Ver y usar página de lista de candidatos", () => {
    cy.visit('/es/home');
    cy.url().should('include', '/es/home');
    cy.get('[data-cy="candidates-action"]').click();
    cy.url().should('include', '/es/candidates');
    cy.contains('Aquí puedes elegir a los candidatos')
    cy.get('#habilidades-técnicas-select').click();
    cy.get('[data-value="1"]').click();
    cy.get('[data-value="2"]').click();
    cy.get('body').click(0,0);
    cy.get('#habilidades-blandas-select').click();
    cy.get('[data-value="1"]').click();
    cy.get('[data-value="2"]').click();
    cy.get('body').click(0,0);
    cy.get('table.MuiTable-root').find('tbody').find('tr').its('length').should('be.gte', 1);
  });
});
