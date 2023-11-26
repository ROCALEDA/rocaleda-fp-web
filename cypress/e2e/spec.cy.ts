import { faker } from "@faker-js/faker";

describe('Login Client Test', () => {

  const userEmail = Cypress.env('userEmail');
  const userPassword = Cypress.env('userPassword');
  const apiUrl = Cypress.env('apiUrl');
  const nameProject = faker.commerce.department() + ' Project';
  const descriptionProject = 'This project ' + faker.commerce.productDescription()
  const profileName = 'Backend Developer';
  const employeeName = faker.person.fullName();
  const employeeRole = faker.person.jobTitle();

  beforeEach(() => {
    cy.viewport('macbook-16');
    cy.session([userEmail, userPassword], () => {
      cy.visit('/es/login');
      cy.get('input[name="email"]').type(userEmail);
      cy.get('input[name="password"]').type(userPassword);
      cy.get('button[type="submit"]').click();
      cy.url({ timeout: 10000 }).should('include', '/home');
    });
  });

  it('Login success', () => {
    cy.visit('/es/home');
  });

  it('View List Projects', () => {
    cy.visit('/es/home');
    cy.get('[data-cy=projects-action]').click();
    cy.url({ timeout: 10000 }).should('include', '/es/projects');
    cy.intercept('GET', `${apiUrl}/customer/projects`).as('Projects');
    cy.wait('@Projects');
    cy.get('[data-cy=create-project]').should('exist');
  });

  it('View Form Create Projects', () => {
    cy.visit('/es/projects');
    cy.get('[data-cy=create-project]').should('exist');
    cy.get('[data-cy=create-project]').click();
    cy.get('[data-cy=register-project]').should('exist');

  });

  it.skip('Create Project', () => {
    cy.visit('/es/projects/create');
    cy.get('input[name="nombre"]').type(nameProject);
    cy.get('[data-cy=description]').type(descriptionProject);
    cy.get('[data-cy=add-profile]').should('exist');
    cy.get('[data-cy=add-profile]').click();
    cy.get('[data-cy=modal-profile]').should('exist');
    cy.get('[data-cy=profileName]').should('exist');
    cy.get('[data-cy=profileName]').type(profileName);
    cy.get('[data-cy=tech-skills-select]').click();
    cy.get('ul[role="listbox"]')
    .find('li').each(($el, index) => {
      if (index < 3) {
        cy.wrap($el).click();
      }
    });
    cy.get('body').click(0,0);
    cy.get('[data-cy=soft-skills-select]').click();
    cy.get('ul[role="listbox"]')
    .find('li').each(($el, index) => {
      if (index < 3) {
        cy.wrap($el).click();
      }
    });
    cy.get('body').click(0,0);
    cy.get('[data-cy=modal-profile]').click();
    cy.get('[data-cy=add-employee]').should('exist');
    cy.get('[data-cy=add-employee]').click();
    cy.get('[data-cy=modal-employee]').should('exist');
    cy.get('[data-cy=employee-name]').type(employeeName);
    cy.get('[data-cy=employee-role]').type(employeeRole);
    cy.get('[data-cy=modal-employee]').click();
    cy.get('[data-cy=register-project]').click();
    cy.intercept('GET', `${apiUrl}/customer/projects`).as('Projects');
    cy.wait('@Projects');
    cy.url({ timeout: 10000 }).should('include', '/es/projects');
    cy.get('[data-cy=create-project]', { timeout: 10000 }).should('exist');
    cy.contains(nameProject, { timeout: 10000 }).should('exist');

  });



  it('View Candidates', () => {
    cy.visit('/es/home');
    cy.get('[data-cy=candidates-action]').click();
  });



});
describe('Register Client Test', () => {
  const userEmail = faker.internet.email();
  const userPassword = 'cristian';

  it.skip('Client/Enterprise Register', () => {
    cy.get('[data-cy=candidate-signup]').click();

    cy.get('input[name="company"]').type(faker.company.name());
    cy.get('input[name="email"]').type(userEmail);
    cy.get('input[name="phone"]').type(faker.phone.number('###############'));
    cy.get('input[name="password"]').type(userPassword);
    cy.get('input[name="password2"]').type(userPassword);
    cy.get('[data-cy=candidate-register]').click();
    cy.url().should('include', '/es/login'); 
  });


});