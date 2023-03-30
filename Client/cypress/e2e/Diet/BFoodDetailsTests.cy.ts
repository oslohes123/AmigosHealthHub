/// <reference types="cypress" />

beforeEach(() => {
    cy.visit('http://localhost:19006');
    cy.contains('Log into account').click()
    cy.get('input[placeholder="Email"]').click().type('shazeen@gmail.com');
    cy.get('input[placeholder="Password"]').click().type('Password123!');
    cy.contains('Login').click({force:true})
})

describe("Check branded food details screen", () => {
    beforeEach(() => {
        cy.get('a[href="/Diet"]').click();
        cy.get('input[placeholder="Find food..."]')
            .click()
            .type('Mango Chunks', {force: true})
        cy.get('[data-testid="branded"]')
            .click()
        cy.contains('Mango Chunks')
            .click()
    })

    it("should contain the page title", () => {
        cy.contains('Food Details')
            .should('be.visible')
    })

    it("should contain the name of the food clicked", () => {
        cy.contains('Mango Chunks')
            .should('be.visible')
    })

    it("should contain a row with calorie details for the item", () => {
        cy.contains('Calories')
            .should('be.visible')
    })

    it("should contain a row with protein details for the item", () => {
        cy.contains('Protein')
            .should('be.visible')
    })

    it("should contain a row with carbs details for the item", () => {
        cy.contains('Carbs')
            .should('be.visible')
    })

    it("should contain a row with fat details for the item", () => {
        cy.contains('Fat')
            .should('be.visible')
    })

    it("should contain a row with sugars details for the item", () => {
        cy.contains('Sugars')
            .should('be.visible')
    })

    it("should contain a row with fibre details for the item", () => {
        cy.contains('Fibre')
            .should('be.visible')
    })

    it("should contain a row with details of serving units for the item", () => {
        cy.contains('Serving units')
            .should('be.visible')
    })

    it("should contain a row with details of serving quantity for the item", () => {
        cy.contains('Serving Quantity')
            .scrollIntoView()
            .should('be.visible')
    })

    it("should contain a row with details of brand name for the item", () => {
        cy.contains('Brand name')
            .scrollIntoView()
            .should('be.visible')
    })

    it("calories should not be empty", () => {
        cy.get('[data-testid="calories"]')
            .should('not.have.text', '')
    })

    it("protein should not be empty", () => {
        cy.get('[data-testid="protein"]')
            .should('not.have.text', '')
    })

    it("carbs should not be empty", () => {
        cy.get('[data-testid="carbs"]')
            .should('not.have.text', '')
    })

    it("fat should not be empty", () => {
        cy.get('[data-testid="fat"]')
            .should('not.have.text', '')
    })

    it("sugars should not be empty", () => {
        cy.get('[data-testid="sugars"]')
            .should('not.have.text', '')
    })

    it("fibre should not be empty", () => {
        cy.get('[data-testid="fibre"]')
            .should('not.have.text', '')
    })

    it("serving unit is clickable and it displays list of available units", () => {
        cy.get('[data-testid="viewUnits"]')
            .click()
        cy.get('[data-testid="modal"]')
            .should('be.visible')
    })

    it("serving quantity can be changed using text input", () => {
        cy.get('[data-testid="quantityInput"]')
            .scrollIntoView()
            .should('be.visible')
            .click()
            .type('5')
    })

    it("brand name should not be empty", () => {
        cy.get('[data-testid="brandName"]')
            .should('not.have.text', '')
    })

    it("should contain add food button", () => {
        cy.get('[data-testid="add"]')
            .should('be.visible')
    })

    it("add food button should navigate to the diet dashboard", () => {
        cy.get('[data-testid="add"]')
            .click()
        cy.contains('Diet Dashboard')
    })
})
