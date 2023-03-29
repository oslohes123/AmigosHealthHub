/// <reference types="cypress" />

beforeEach(() => {
    cy.visit('http://localhost:19006');
    cy.contains('Log into account').click()
    cy.get('input[placeholder="Email"]').click().type('shazeen@gmail.com');
    cy.get('input[placeholder="Password"]').click().type('Password123!');
    cy.contains('Login').click()
    cy.get('a[href="/Diet"]').click();
    cy.get('[data-testid="pie"]')
        .click()
})

describe("Check nutrients screen", () => {
    it("should contain the page title", () => {
        cy.contains('Nutrients Consumed')
            .should('be.visible')
    })

    it("should contain a nutrients table", () => {
        cy.get('[data-testid="table"]')
            .should('be.visible')
    })

    it("table should contain a nutrient column", () => {
        cy.get('[data-testid="nutrient"]')
            .should('be.visible')
    })

    it("table should contain an amount column", () => {
        cy.get('[data-testid="amount"]')
            .should('be.visible')
    })

    it("table should contain a row with protein", () => {
        cy.contains('protein')
    })

    it("table should contain a row with sugar", () => {
        cy.contains('sugar')
    })

    it("table should contain a row with carbohydrates", () => {
        cy.contains('carbohydrates')
    })

    it("table should contain a row with fat", () => {
        cy.contains('fat')
    })

    it("nutrient values should not be empty", () => {
        cy.get('[data-testid="value"]')
            .should('not.have.text', '')
    })
})