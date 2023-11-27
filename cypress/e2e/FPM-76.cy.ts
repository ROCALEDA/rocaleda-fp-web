describe("FPM-76 - Listado de entrevistas agendadas", () => {
    const candidateEmail = 'sprinttwo@notmail.com';
    const candidatePassword = "password";
  
    const customerEmail = 'c.toros.customer@example.com';
    const customerPassword = "cristian";
  
    beforeEach(() => {
      cy.visit("/es/login");
    });
  
    it("Ver entrevistas - Candidato", () => {
      cy.get('input[name="email"]').type(candidateEmail);
      cy.get('input[name="password"]').type(candidatePassword);
      cy.get('button').contains("Iniciar sesión").click();
      cy.url().should("include", "/es/home");
      cy.contains('Entrevistas');
      cy.contains('Primera Entrevista');
      cy.get('button').contains("Ver entrevistas").click();
      cy.contains('Gestiona tus entrevistas agendadas');
      cy.get('div.MuiStack-root').find('div[role="button"]').its('length').should('be.gte', 1);
    });
  
    it("Ver entrevistas - Cliente", () => {
      cy.get('input[name="email"]').type(customerEmail);
      cy.get('input[name="password"]').type(customerPassword);
      cy.get('button').contains("Iniciar sesión").click();
      cy.url().should("include", "/es/home");
      cy.contains('Entrevistas');
      cy.contains('Entrevista técnica');
      cy.get('button').contains("Ver entrevistas").click();
      cy.contains('Gestiona tus entrevistas agendadas');
      cy.get('div.MuiStack-root').find('div[role="button"]').its('length').should('be.gte', 1);
    });
    
  });
  