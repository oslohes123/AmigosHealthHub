/// <reference types="cypress" />
// import AuthDecisionScreen from '../../../navigation/screens/Authentication/screens/AuthDecisionScreen'

it('passes', () => {
  cy.visit('http://localhost:19006');
})

  
it('should show the login button', () => {
  cy.visit('http://localhost:19006');
  cy.contains('Log into account')
    .should('be.visible')
})
  
it('should show the sign up button', () => {
  cy.visit('http://localhost:19006');
  cy.contains('Sign up for account')
    .should('be.visible')
})

it('should be able to click on the login button', () => {
  cy.visit('http://localhost:19006');
  cy.contains('Log into account')
    .click()
    .contains('Log in')
})

it('login form should contain text inputs and login button', () => {
  cy.visit('http://localhost:19006');
  cy.contains('Log in')
    .click()
  cy.get('input')
  cy.contains('Login').click()
})

it('should be able to click on the sign up button', () => {
  cy.visit('http://localhost:19006');
  cy.contains('Sign up for account')
    .click()
    .contains('Sign up')
})

it('sign up form should contain text inputs and sign up button', () => {
  cy.visit('http://localhost:19006');
  cy.contains('Sign up for account')
    .click()
  cy.get('input')
  cy.contains('Sign up')
})

it('should be able to fill sign up form', () => {
  cy.visit('http://localhost:19006');
  cy.contains('Sign up for account')
    .click()
  cy.get('input[placeholder="First Name"]').click().type('Shazeen')
  cy.get('input[placeholder="Last Name"]').click().type('Shaheen')
  cy.get('input[placeholder="Email"]').click().type('shazeen@gmail.com')
  cy.get('input[placeholder="Age"]').click().type('20')
  cy.get('input[placeholder="Calories"]').click().type('2500')
  cy.get('input[placeholder="Password"]').click().type('Password123!')
  cy.get('input[placeholder="Confirm Password"]').click().type('Password123!')
  cy.contains('Sign Up').click()
})

it('should be able to fill login form', () => {
  cy.visit('http://localhost:19006');
  cy.contains('Log in')
    .click()
  cy.get('input[placeholder="Email"]').click().type('shazeen@gmail.com')
  cy.get('input[placeholder="Password"]').click().type('Password123!')
  cy.contains('Login').click()
})
