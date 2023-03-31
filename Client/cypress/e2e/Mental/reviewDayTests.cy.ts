//This file is to test the components and user interactions of the mental review your day form, the image is not rendered thus not able to be tests
/// <reference types="cypress" />

beforeEach(() => {
    cy.visit('http://localhost:19006');
    cy.contains('Log into account').click()
    cy.get('input[placeholder="Email"]').click().type('sasha@gmail.com');
    cy.get('input[placeholder="Password"]').click().type('Password123!');
    cy.contains('Login').click({force:true})
    cy.get('a[href="/Mental"]').click();
    cy.get('[data-testid="reviewDay"]').click()
})

//a component of the app isn't rendered on the web version which cannot be tests(image), this is done manually
describe("Check if components are visible on review your day screen", () => {
    it("Review Your Day should contain header", () => {
        cy.contains("h1", "Review Your Day").should("be.visible")
    })
    it("Review Your Day should contain face label", () => {
        cy.contains('Face:')
            .should('be.visible')
    })
    it("Review Your Day should contain word label", () => {
        cy.contains('Word:')
            .should('be.visible')
    })
    it("Review Your Day should contain submit button", () => {
        cy.get('[data-testid="submitButton"]')
        .should('be.visible')
    })
    it("Review Your Day should contain slider", () => {
        cy.get('[data-testid="slider"]')
        .should('be.visible')
    })
    it("Review Your Day should contain input box for the word", () => {
        cy.get('input[placeholder="Word Of The Day:"]')
        .should('be.visible')
    })
})

describe("Test word limits (over 0 less than 12)", () => {
    it("Show user that the word/phrase has to be shorter than 12 characters", () => {
        cy.get('input[placeholder="Word Of The Day:"]')
        .click()
        .type('123456789012', {force: true})
        cy.contains('Word/expression has to be shorter than 12 characters')
    })
    it("Show user that the word/phrase cannot be empty", () => {
        cy.get('input[placeholder="Word Of The Day:"]')
        .click()
        .type('1', {force: true}).clear({force: true})
        cy.contains('Word Of Today cannot be empty!')
    })
})

describe("Test submit button provides user with status message", () => {
    it("Submits valid data", () => {
        cy.get('input[placeholder="Word Of The Day:"]')
        .click()
        .type('Test1', {force: true})
        cy.get('[data-testid="submitButton"]')
          .click()
        cy.get('[data-testid="statusMessage"]')
          .should('be.visible')   
        })
})
