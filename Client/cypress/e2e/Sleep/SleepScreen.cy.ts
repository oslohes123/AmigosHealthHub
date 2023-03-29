/// <reference types="cypress" />
import { v4 as uuidv4 } from 'uuid'

const testEmail = `${uuidv4()}@example.com`
const testPassword = 'TestPassword123!'

before(() => {
  cy.visit('http://localhost:19006');
  cy.contains('Sign up for account')
    .click()
  cy.get('input[placeholder="First Name"]').click().type('Test')
  cy.get('input[placeholder="Last Name"]').click().type('Manik')
  cy.get('input[placeholder="Email"]').click().type(testEmail)
  cy.get('input[placeholder="Age"]').click().type('20')
  cy.get('[data-testid="calorieInput"]').click().type('2500')
  cy.get('input[placeholder="Password"]').click().type(testPassword)
  cy.get('input[placeholder="Confirm Password"]').click().type(testPassword)
  cy.contains('Sign Up').click()
})

beforeEach(() => {
  cy.visit('http://localhost:19006');
  cy.contains('Log into account')
    .click()
  cy.get('input[placeholder="Email"]').click().type(testEmail);
  cy.get('input[placeholder="Password"]').click().type(testPassword);
  cy.contains('Login').click()
});

it('should be able to sign in', () => {

})

after(() => {
  // cy.visit('http://localhost:19006');
  // cy.contains('Log into account')
  //   .click()
  // cy.get('input[placeholder="Email"]').click().type(testEmail);
  // cy.get('input[placeholder="Password"]').click().type(testPassword);
  // cy.contains('Login').click()
  cy.get('a[href="/Settings"]').click()
  cy.contains(testEmail).click()
  cy.contains("Delete Account").click()
  cy.get('input[placeholder="Your password:"]').click().type(testPassword);
  cy.get('Checkbox[id="confirmDeleteAccount"]').click()

})

