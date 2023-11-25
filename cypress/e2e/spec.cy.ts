describe('Login', () => {
  it('Login Visit', () => {
    cy.visit('https://fp-web-service-mecna653na-uc.a.run.app/es/login')
  })
})

describe('Login Test', () => {
  it('logs in successfully', () => {
    cy.visit('https://fp-web-service-mecna653na-uc.a.run.app/es/login'); // Cambia la URL a la de tu app
    cy.get('input[name="email"]').type('c.toros.customer@example.com');
    cy.get('input[name="password"]').type('cristian');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/home'); // Asegúrate de que la URL cambie al dashboard después del inicio de sesión
  });
});