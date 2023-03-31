/// <reference types="cypress" />

beforeEach(() => {
    cy.visit('http://localhost:19006');
    cy.contains('Log into account').click()
    cy.get('input[placeholder="Email"]').click().type('shazeen@gmail.com');
    cy.get('input[placeholder="Password"]').click().type('Password123!');
    cy.contains('Login').click({force:true})
    cy.get('a[href="/Diet"]').click();
    cy.get('input[placeholder="Find food..."]').click().type('apple', {force: true})
    cy.contains('apple').click()
    cy.get('[data-testid="add"]').click()
    cy.get('input[placeholder="Find food..."]').clear({force:true})
    cy.get('[data-testid="foodHistory"]').click()
})

describe("Check food history page", () => {
    it("should contain all elements and functionality", () => {
        cy.contains('Food History')

        //open calendar
        cy.get('[data-testid="calendarIcon"]')
            .should('be.visible').click()

        //close calendar
        cy.get('[data-testid="calendarIcon"]')
            .should('be.visible').click()
            
        cy.get('[data-testid="foods"]').eq(0)
            .should('be.visible').click()
        
        cy.get('[data-testid="caloriesName1"]')
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

        cy.get('[data-testid="update"]')
            .should('be.visible').click()

        cy.get('[data-testid="foodHistory"]').click()
        cy.get('[data-testid="foods"]').eq(0)
            .should('be.visible').click()
        
        cy.get('[data-testid="delete"]')
            .should('be.visible').click()
    })
})