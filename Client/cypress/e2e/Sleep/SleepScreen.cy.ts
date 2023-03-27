/// <reference types="cypress" />
import { v4 as uuidv4 } from 'uuid'
import supabase from "../../../supabaseSetUp";

const testEmail = `${uuidv4()}@example.com`

before(() => {
  async function createUser(){
    
    const { error } = await supabase
        .from('User')
        .insert({
          firstName: 'frontend',
          lastName: 'test',
          email: testEmail,
          password: 'TestPassword123!',
          age: 20
        })
        if(error){
          throw new Error(`Error creating user: ${JSON.stringify(error)}`)
        }
  }
  createUser();
  cy.visit('http://localhost:19006')
})

it('should show the login button', () => {
  cy.contains('Log into account')
    .should('be.visible')
})
  
// it('should show the sign up button', () => {
//   cy.contains('Sign up for account')
//     .should('be.visible')
// })

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

