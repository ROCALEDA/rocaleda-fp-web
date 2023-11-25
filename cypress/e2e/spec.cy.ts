import { faker } from "@faker-js/faker";

describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/es/login');
  });

  const userEmail = faker.internet.email();
  const userPassword = 'Test1234!';

  it('Client/Enterprise Register', () => {
    cy.get('[data-cy=candidate-signup]').click();

    cy.get('input[name="company"]').type(faker.company.name());
    cy.get('input[name="email"]').type(userEmail);
    cy.get('input[name="phone"]').type(faker.phone.number('###############'));
    cy.get('input[name="password"]').type(userPassword);
    cy.get('input[name="password2"]').type(userPassword);
    cy.get('[data-cy=candidate-register]').click();
    cy.url().should('include', '/es/login'); 
  });
  it('login client/enterprise in successfully', () => {
    cy.get('input[name="email"]').type(userEmail);
    cy.get('input[name="password"]').type(userPassword);
    cy.intercept('POST', '/api/auth/callback/credentials').as('authCallback');
    cy.get('button[type="submit"]').click();
    cy.wait('@authCallback');
    cy.url({ timeout: 10000 }).should('include', '/home'); 
  });

})