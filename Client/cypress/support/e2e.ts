// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// before(() => {
//   cy.visit('http://localhost:19006');
//   cy.contains('Sign up for account')
//     .click()
//   cy.get('input[placeholder="First Name"]').click().type('Test')
//   cy.get('input[placeholder="Last Name"]').click().type('Manik')
//   cy.get('input[placeholder="Email"]').click().type('testmanik@gmail.com')
//   cy.get('input[placeholder="Age"]').click().type('50')
//   cy.get('[data-testid="calorieInput"]').click().type('2500')
//   cy.get('input[placeholder="Password"]').click().type('Password123!')
//   cy.get('input[placeholder="Confirm Password"]').click().type('Password123!')
//   cy.contains('Sign Up').click().wait(1000)
// })

// after(() => {
//   cy.get('a[href="/Settings"]').click()
//   cy.contains('test@gmail.com').click()
//   cy.contains("Delete Account").click()
//   cy.get('input[placeholder="Your password:"]').click().type('Password123!', {force: true})
//   cy.get('[data-testid="deletePasswordCheck"]').click()
//   cy.contains("CONFIRM DELETE ACCOUNT").click()
// })


// Alternatively you can use CommonJS syntax:
// require('./commands')