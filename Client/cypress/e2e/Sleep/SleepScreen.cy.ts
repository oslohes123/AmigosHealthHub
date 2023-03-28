/// <reference types="cypress" />
import { v4 as uuidv4 } from 'uuid'
import supabase from "../../../supabaseSetUp";

const testEmail = `${uuidv4()}@example.com`
const testPassword = 'TestPassword123!'

before(() => {
  async function createUser(){
    
    const { error } = await supabase
        .from('User')
        .insert({
          firstName: 'frontend',
          lastName: 'test',
          email: testEmail,
          password: testPassword,
          age: 20
        })
        if(error){
          throw new Error(`Error creating user: ${JSON.stringify(error)}`)
        }
  }
  createUser();
})

beforeEach(() => {
  cy.visit('http://localhost:19006');
});

it('should show the login button', () => {
  cy.contains('Log into account')
    .should('be.visible')
})
  
it('should show the sign up button', () => {
  cy.contains('Sign up for account')
    .should('be.visible')
})

it('should be able to click on the login button', () => {
  cy.contains('Log into account')
    .click()
    .contains('Log in')
})

it('should be able to sign in', () => {
  cy.contains('Log into account')
    .click()
  cy.get('input[placeholder="Email"]').click().type(testEmail);
  cy.get('input[placeholder="Password"]').click().type(testPassword);
  cy.contains('Login').click()
})

after(() => {
  async function deleteUser(){
    const { error } = await supabase
      .from('User')
      .delete()
      .eq('email',testEmail)
      if(error){
      throw new Error(`Error deleting user: ${JSON.stringify(error)}`)
      }
  }
  console.log(`Deleted user`)
})

