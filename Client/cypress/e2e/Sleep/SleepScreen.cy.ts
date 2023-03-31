/// <reference types="cypress" />
import { v4 as uuidv4 } from 'uuid'

const testEmail = `${uuidv4()}@example.com`
const testPassword = 'TestPassword123!'

beforeEach(() => {
  cy.visit('http://localhost:19006');
  cy.contains('Log into account')
    .click()
  cy.get('input[placeholder="Email"]').click().type('testmanik@gmail.com');
  cy.get('input[placeholder="Password"]').click().type('Password123!');
  cy.contains('Login').click()
});

describe("Check navigate to sleep dashboard", () => {
  it("Should from navigate to sleep dashboard" ,() => {
    cy.contains('Add sleep data').click()
  })
})

describe("Check user can add data for their sleep", () => {
  it("Should add data for users sleep" ,() => {
    cy.contains('Add sleep data').click()
    cy.contains('Add sleep data.').click()
    cy.get('[data-testid="addSleepData"]').click()
  })
})
