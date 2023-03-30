/// <reference types="cypress" />

beforeEach(() => {
    cy.visit('http://localhost:19006');
    cy.contains('Log into account').click()
    cy.get('input[placeholder="Email"]').click().type('shazeen@gmail.com');
    cy.get('input[placeholder="Password"]').click().type('Password123!');
    cy.contains('Login').click({force:true})
    cy.get('a[href="/Diet"]').click();
})

describe("Check diet pie chart", () => {
    beforeEach(() => {
        cy.get('input[placeholder="Find food..."]').click().type('apple', {force: true})
        cy.contains('apple').click()
        cy.get('[data-testid="add"]').click()
        cy.get('input[placeholder="Find food..."]').clear({force:true})
    })
    it("pie chart should be visible on diet dashboard, clickable and navigates correctly", () => {
        cy.get('[data-testid="pie"]')
            .should('be.visible')
            .click()
            cy.contains('Nutrients Consumed')
    })
})

describe("Check nutrients screen", () => {
    beforeEach(() => {
        cy.get('[data-testid="pie"]')
        .click()
    })
    it("should contain all required elements and functionality", () => {
        cy.contains('Nutrients Consumed')
            .should('be.visible')

        cy.get('[data-testid="table"]')
            .should('be.visible')

        cy.get('[data-testid="nutrient"]')
            .should('be.visible')

        cy.get('[data-testid="amount"]')
            .should('be.visible')

        cy.contains('protein')
        cy.contains('sugar')
        cy.contains('carbohydrates')
        cy.contains('fat')
        
        cy.get('[data-testid="value"]')
            .should('not.have.text', '')
    })
})