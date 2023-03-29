/// <reference types="cypress" />

beforeEach(() => {
    cy.visit('http://localhost:19006');
    cy.contains('Log into account').click()
    cy.get('input[placeholder="Email"]').click().type('shazeen@gmail.com');
    cy.get('input[placeholder="Password"]').click().type('Password123!');
    cy.contains('Login').click()
})

describe("Check navigation to diet dashboard", () => {
    it("Should navigate from main dashboard to diet dashboard" ,() => {
      cy.get('a[href="/Diet"]').click()
    })
})

describe("Check if elements are visible on diet dashboard", () => {
    beforeEach(() => {
      cy.get('a[href="/Diet"]').click();
    })

    it("Diet dashboard title should be visible", () => {
        cy.contains('Diet Dashboard')
            .should('be.visible')
    })

    it("Calorie goal should be visible", () => {
        cy.get('[data-testid="goal"]')
            .should('be.visible')
    })

    it("Calories remaining should be visible", () => {
        cy.get('[data-testid="remaining"]')
            .should('be.visible')
    })

    it("View Food History button should be visible", () => {
        cy.get('[data-testid="foodHistory"]')
            .should('be.visible')
    })
})




  


//   // cy.get('svg').eq(0).click()

//   // cy.contains('Nutrients Consumed')

//   //   cy.go('back')

//   cy.get('[data-testid="foodHistory"]')
//     .click({force: true})
//   //cy.get('.css-view-175oi2r')