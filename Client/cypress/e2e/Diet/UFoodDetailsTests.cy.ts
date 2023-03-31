/// <reference types="cypress" />

beforeEach(() => {
    cy.visit('http://localhost:19006');
    cy.contains('Log into account').click()
    cy.get('input[placeholder="Email"]').click().type('shazeen@gmail.com');
    cy.get('input[placeholder="Password"]').click().type('Password123!');
    cy.contains('Login').click({force:true})
})

describe("Check Unbranded food details screen", () => {
    beforeEach(() => {
        cy.get('a[href="/Diet"]').click();
        cy.get('input[placeholder="Find food..."]')
            .click()
            .type('apple', {force: true})
        cy.get('[data-testid="Unbranded"]')
            .click()
        cy.contains('apple')
            .click()
    })

    it("should contain all required elements and functionality", () => {
        cy.contains('Food Details')
            .should('be.visible')

        cy.get('[data-testid="caloriesName"]')
            .should('be.visible')

        cy.contains('Protein')
            .should('be.visible')

        cy.contains('Carbs')
            .should('be.visible')

        cy.contains('Fat')
            .should('be.visible')

        cy.contains('Sugars')
            .should('be.visible')

        cy.contains('Fibre')
            .should('be.visible')

        cy.contains('Serving units')
            .should('be.visible')

        cy.contains('Serving Quantity')
            .scrollIntoView()
            .should('be.visible')

        cy.get('[data-testid="calories"]')
            .should('not.have.text', '')

        cy.get('[data-testid="protein"]')
            .should('not.have.text', '')

        cy.get('[data-testid="carbs"]')
            .should('not.have.text', '')

        cy.get('[data-testid="fat"]')
            .should('not.have.text', '')

        cy.get('[data-testid="sugars"]')
            .should('not.have.text', '')

        cy.get('[data-testid="fibre"]')
            .should('not.have.text', '')

        cy.get('[data-testid="add"]')
            .should('be.visible')
            
        cy.get('[data-testid="quantityInput"]')
            .scrollIntoView()
            .should('be.visible')
            .click()
            .type('5')

        cy.get('[data-testid="viewUnits"]').click()

        cy.get('[data-testid="modal"]')
            .should('be.visible')
        cy.get('[data-testid="add"]')
            .click({force:true})

        cy.contains('Diet Dashboard')
    })
})