/// <reference types="cypress" />

import { forEach } from "cypress/types/lodash";

beforeEach(() => {
  cy.visit('http://localhost:19006');
  cy.contains('Log into account').click()
  cy.get('input[placeholder="Email"]').click().type('ethan@gmail.com');
  cy.get('input[placeholder="Password"]').click().type('P4ssw0rd!');
  cy.contains('Login').click()
})

describe("Check navigate to fitness dashboard", () => {
  it("Should navigate from main dashboard to fitness dashboard" ,() => {
    cy.get('a[href="/Fitness"]').click()
  })
})

describe("Check dashboard widgets", () => {
  beforeEach(() => {
    cy.get('a[href="/Fitness"]').click();
  })

  it("Can navigate to workout history", () => {
    cy.get('[data-testid="historyWidget"]')
    .click()
  })

  it("Can navigate to workout stats", () => {
    cy.get('[data-testid="statsWidget"]')
    .click()
  })

  it("Can navigate to workout plans", () => {
    cy.get('[data-testid="plansWidget"]')
    .click()
  })
})

describe("Check workout history", () => {
  beforeEach(() => {
    cy.get('a[href="/Fitness"]').click();
  })
  it("Checks if the tracked workouts are clickable", () => {
      cy.get('[data-testid="historyWidget"]')
      .click()
      // let results = cy.get("results")
  })
})