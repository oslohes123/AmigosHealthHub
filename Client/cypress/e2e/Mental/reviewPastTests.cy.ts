//This file is to check for components in the review past screen, no wordcloud is tested due to web rendering issues
/// <reference types="cypress" />

beforeEach(() => {
    cy.visit('http://localhost:19006');
    cy.contains('Log into account').click()
    cy.get('input[placeholder="Email"]').click().type('sasha@gmail.com');
    cy.get('input[placeholder="Password"]').click().type('Password123!');
    cy.contains('Login').click({force:true})
    cy.get('a[href="/Mental"]').click();
    cy.get('[data-testid="reviewPast"]').click()
})

describe("Check if components are visible on review your day screen", () => {
    it("Review Your Day should contain header", () => {
        cy.contains("h1", "Mental History").should("be.visible")
    })
    it("Review Your Day should contain graph label", () => {
        cy.contains('Graph For Past Face Submissions (max 7)')
            .should('be.visible')
    })
    it("Review Your Day should contain wordcloud label", () => {
        cy.contains('WordCloud for the Past Submissions (max 7)')
            .should('be.visible')
    })
})