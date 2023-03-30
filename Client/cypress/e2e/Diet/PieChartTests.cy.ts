/// <reference types="cypress" />

beforeEach(() => {
    cy.visit('http://localhost:19006');
    cy.contains('Log into account').click()
    cy.get('input[placeholder="Email"]').click().type('shazeen@gmail.com');
    cy.get('input[placeholder="Password"]').click().type('Password123!');
    cy.contains('Login').click()
    cy.get('a[href="/Diet"]').click();
    cy.get('input[placeholder="Find food..."]').click().type('apple', {force: true})
    cy.contains('apple').click()
    cy.get('[data-testid="add"]').click()
    cy.get('input[placeholder="Find food..."]').clear({force:true})
})

describe("Check diet pie chart", () => {
    it("pie chart should be visible on diet dashboard", () => {
        cy.get('[data-testid="pie"]')
            .should('be.visible')
    })

    it("pie chart should be clickable", () => {
        cy.get('[data-testid="pie"]')
            .click()
    })

    it("pie chart should navigate to nutrients page", () => {
        cy.get('[data-testid="pie"]')
            .click()
        cy.contains('Nutrients Consumed')
    })
})