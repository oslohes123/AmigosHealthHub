/// <reference types="cypress" />

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