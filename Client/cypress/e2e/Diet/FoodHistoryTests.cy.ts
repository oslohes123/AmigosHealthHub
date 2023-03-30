/// <reference types="cypress" />

beforeEach(() => {
    cy.visit('http://localhost:19006');
    cy.contains('Log into account').click()
    cy.get('input[placeholder="Email"]').click().type('shazeen@gmail.com');
    cy.get('input[placeholder="Password"]').click().type('Password123!');
    cy.contains('Login').click({force:true})
    cy.get('a[href="/Diet"]').click();
    cy.get('[data-testid="foodHistory"]').click()
})

describe("Check food history page", () => {
    it("should contain the page title", () => {
        cy.contains('Food History')
    })

    it("should contain a calender icon", () => {
        cy.get('[data-testid="calendarIcon"]')
            .should('be.visible')
    })

    it("calender icon should be clickable", () => {
        cy.get('[data-testid="calendarIcon"]')
            .click()
    })
})