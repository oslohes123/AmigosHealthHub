/// <reference types="cypress" />
import { v4 as uuidv4 } from 'uuid'

var email = 'testmanik@gmail.com'
var firstName = 'Test'
var lastName = 'Manik'
var age = '50'
const calorie = '2500'
var testPassword = 'Password123!'

beforeEach(() => {
  cy.visit('http://localhost:19006');
  cy.contains('Log into account')
    .click()
  cy.get('input[placeholder="Email"]').click().type(email);
  cy.get('input[placeholder="Password"]').click().type(testPassword);
  cy.contains('Login').click()
});

describe("Check navigate to profile dashboard", () => {
  it("Should from navigate to profile dashboard" ,() => {
    cy.get('a[href="/Settings"]').click()
    cy.contains(email).click()
  })
})

// describe("Check user can change their first and last name", () => {
//   it("Should change first and last name." ,() => {
//     cy.get('a[href="/Settings"]').click()
//     cy.contains(email).click()
//     cy.get('[data-testid="firstName"]')
//       .click().clear({force: true}).type('NEWfirst', {force: true})
//     firstName = 'NEWfirst'
//     cy.get('[data-testid="lastName"]')
//       .click().clear({force: true}).type('NEWlast', {force: true})
//     cy.get('[data-testid="email"]')
//       .click().clear({force: true}).type('NEW', {force: true})
//     cy.get('[data-testid="firstName"]')
//       .click().clear({force: true}).type('NEW', {force: true})
//     cy.get('[data-testid="firstName"]')
//       .click().clear({force: true}).type('NEW', {force: true})
//   })
// })
