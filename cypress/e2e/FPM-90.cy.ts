describe("FPM-90 - Formulario de login", () => {
  const candidateEmail = 'sprinttwo@notmail.com';
  const candidatePassword = "password";

  const customerEmail = 'c.toros.customer@example.com';
  const customerPassword = "cristian";

  beforeEach(() => {
    cy.clearCookies();
    cy.visit("/es/login");
  });

  it("Llenar datos de login - Candidato", () => {
    cy.get('input[name="email"]').type(candidateEmail);
    cy.get('input[name="password"]').type(candidatePassword);
    cy.get('button').contains("Iniciar sesión").click();
    cy.url().should("include", "/es/home");
    cy.contains('Entrevistas');
    cy.contains('Primera Entrevista');
  });

  it("Llenar datos de login - Cliente", () => {
    cy.get('input[name="email"]').type(customerEmail);
    cy.get('input[name="password"]').type(customerPassword);
    cy.get('button').contains("Iniciar sesión").click();
    cy.url().should("include", "/es/home");
    cy.contains('Candidatos');
    cy.contains('Test User');
    cy.contains('Proyectos');
    cy.contains('Mi proyectoy');
  });
  
});
