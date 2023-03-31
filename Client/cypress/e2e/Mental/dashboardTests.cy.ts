//This file is to test the components and user interactions of the mental dashboard 
/// <reference types="cypress" />

beforeEach(() => {
    cy.visit('http://localhost:19006');
    cy.contains('Log into account').click()
    cy.get('input[placeholder="Email"]').click().type('sasha@gmail.com');
    cy.get('input[placeholder="Password"]').click().type('Password123!');
    cy.contains('Login').click({force:true})
}) 

describe("Check navigation to mental dashboard", () => {
    it("Should navigate from main dashboard to mental dashboard" ,() => {
      cy.get('a[href="/Mental"]').click()

    })
})

describe("Check if elements are visible on mental dashboard", () => {
    beforeEach(() => {
      cy.get('a[href="/Mental"]').click();
    })
    it("Mental dashboard title should be visible", () => {
        cy.contains("h1", "Mental Health Dashboard").should("be.visible")
    })
    it("Mental dashboard title should be visible", () => {
        cy.contains('Mental Health Dashboard')
            .should('be.visible')
    })

    it("review past widget/button should be visible and clickable", () => {
        cy.get('[data-testid="reviewPast"]')
            .should('be.visible')
    })

    it("review day widget/button should be visible and clickable", () => {
        cy.get('[data-testid="reviewDay"]')
            .should('be.visible')
    })
})