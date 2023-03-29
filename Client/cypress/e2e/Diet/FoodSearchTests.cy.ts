/// <reference types="cypress" />

beforeEach(() => {
    cy.visit('http://localhost:19006');
    cy.contains('Log into account').click()
    cy.get('input[placeholder="Email"]').click().type('shazeen@gmail.com');
    cy.get('input[placeholder="Password"]').click().type('Password123!');
    cy.contains('Login').click()
})

describe("Check diet food search", () => {
    beforeEach(() => {
      cy.get('a[href="/Diet"]').click();
    })

    it("food search text input should be visible", () => {
        cy.get('input[placeholder="Find food..."]')
            .should('be.visible')
    })

    it("unbranded segmented button should be visible when food is searched", () => {
        cy.get('input[placeholder="Find food..."]')
            .click().type('apple', {force: true})
        cy.get('[data-testid="Unbranded"]')
            .should('be.visible')
    })

    it("branded segmented button should be visible when food is searched", () => {
        cy.get('input[placeholder="Find food..."]')
            .click().type('apple', {force: true})
        cy.get('[data-testid="branded"]')
            .should('be.visible')
    })

    it("can select unbranded segmented button when food is searched", () => {
        cy.get('input[placeholder="Find food..."]')
            .click().type('apple', {force: true})
        cy.get('[data-testid="Unbranded"]')
            .click()
    })

    it("can select branded segmented button when food is searched", () => {
        cy.get('input[placeholder="Find food..."]')
            .click().type('apple', {force: true})
        cy.get('[data-testid="branded"]')
            .click()
    })

    it("can search unbranded food", () => {
        cy.get('input[placeholder="Find food..."]')
            .click()
            .type('apple', {force: true})
    })

    it("can search branded food", () => {
        cy.get('input[placeholder="Find food..."]')
            .click()
            .type('Burger', {force: true})
        cy.get('[data-testid="branded"]')
            .click()
    })

    it("scroll view containing list of branded items should be displayed", () => {
        cy.get('input[placeholder="Find food..."]')
            .click()
            .type('Burger', {force: true})
        cy.get('[data-testid="branded"]')
            .click()
        cy.get('[data-testid="brandedScroll"]')
            .should('be.visible')
    })

    it("scroll view containing list of unbranded items should be displayed", () => {
        cy.get('input[placeholder="Find food..."]')
            .click()
            .type('apple', {force: true})
        cy.get('[data-testid="UnbrandedScroll"]')
            .should('be.visible')
    })

    it("clicking unbranded food should navigate to food details page", () => {
        cy.get('input[placeholder="Find food..."]')
            .click()
            .type('apple', {force: true})
        cy.contains('apple')
            .click()
        cy.contains('Food Details')
            .should('be.visible')
    })

    it("clicking branded food should navigate to food details page", () => {
        cy.get('input[placeholder="Find food..."]')
            .click()
            .type('Mango Chunks', {force: true})
        cy.get('[data-testid="branded"]')
            .click()
        cy.contains('Mango Chunks')
            .click()
        cy.contains('Food Details')
            .should('be.visible')
    })
})