/// <reference types="cypress" />
const { ipAddress, port } = process.env;

describe('example to-do app', () => {
    cy.visit(`https://${ipAddress}:${port}`);
    // cy.get("div[id='root']").should('have.text', 'HEALTH HUB');
});
