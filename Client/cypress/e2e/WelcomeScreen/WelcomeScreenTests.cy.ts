/// <reference types="cypress" />

beforeEach(() => {
  cy.visit('http://localhost:19006');
});

it("App name should be visible", () => {
  cy.contains('HEALTH HUB')
      .should('be.visible')
})

it('should show the log into account button', () => {
  cy.contains('Log into account')
    .should('be.visible')
})
  
it('should show the sign up button', () => {
  cy.contains('Sign up for account')
    .should('be.visible')
})

it('should be able to click on the login button', () => {
  cy.contains('Log into account')
    .click()
    .contains('Log in')
})

// it('login form should contain text inputs and login button', () => {
//   cy.contains('Log in')
//     .click()
//   cy.get('input')
//   cy.contains('Login').click()
// })

it('should be able to click on the sign up button', () => {
  cy.contains('Sign up for account')
    .click()
    .contains('Sign up')
})

it('sign up form should contain text inputs and sign up button', () => {
  cy.contains('Sign up for account')
    .click()
  cy.get('input')
  cy.contains('Sign up')
})

describe("Check if elements are visible on login page", () => {
  beforeEach(() => {
    cy.contains('Log in').click()
  })

  it("email text input should be visible", () => {
    cy.get('input[placeholder="Email"]')
      .should('be.visible')
  })

  it("password text input should be visible", () => {
    cy.get('input[placeholder="Password"]')
      .should('be.visible')
  })

  it("login button should be visible", () => {
    cy.get('[data-testid="login"]')
      .should('be.visible')
  })
})

describe("Check if elements are visible on sign up page", () => {
  beforeEach(() => {
    cy.contains('Sign up for account')
    .click()
  })

  it("First Name text input should be visible", () => {
    cy.get('input[placeholder="First Name"]')
        .should('be.visible')
  })

  it("Last Name text input should be visible", () => {
    cy.get('input[placeholder="Last Name"]')
      .should('be.visible')
  })

  it("Email text input should be visible", () => {
    cy.get('input[placeholder="Email"]')
      .should('be.visible')
  })

  it("Age text input should be visible", () => {
    cy.get('input[placeholder="Age"]')
      .should('be.visible')
  })

  it("Calories text input should be visible", () => {
    cy.get('[data-testid="calorieInput"]')
      .should('be.visible')
  })

  it("Password text input should be visible", () => {
    cy.get('input[placeholder="Password"]')
      .should('be.visible')
  })

  it("Confirm Password text input should be visible", () => {
    cy.get('input[placeholder="Confirm Password"]')
      .should('be.visible')
  })

  it("sign up button should be visible", () => {
    cy.get('[data-testid="signUp"]')
      .should('be.visible')
  })
})

it('should be able to fill sign up form', () => {
  cy.contains('Sign up for account')
    .click()
  cy.get('input[placeholder="First Name"]').click().type('Shazeen')
  cy.get('input[placeholder="Last Name"]').click().type('Shaheen')
  cy.get('input[placeholder="Email"]').click().type('shazeen@gmail.com')
  cy.get('input[placeholder="Age"]').click().type('20')
  cy.get('[data-testid="calorieInput"]').click().type('2500')
  cy.get('input[placeholder="Password"]').click().type('Password123!')
  cy.get('input[placeholder="Confirm Password"]').click().type('Password123!')
  cy.contains('Sign Up').click()
})

it('should be able to fill login form', () => {
  cy.contains('Log in').click()
  cy.get('input[placeholder="Email"]')
    .click().type('shazeen@gmail.com')
  cy.get('input[placeholder="Password"]')
    .click().type('Password123!')
  cy.contains('Login')
    .click({force: true})
})