import app from "../../index";
const request = require('supertest');
const test = require('ava');
import {v4 as uuidv4} from 'uuid';
import { loginUser } from "../../routes/authentication.controller";
const bcrypt = require('bcrypt');
import supabase from "../../utils/supabaseSetUp";
import { supabaseQueryClass } from "../../utils/databaseInterface";
import { createHashedPassword } from "../../utils/userFunctions";
const supabaseQuery = new supabaseQueryClass();
import RouteNamesClass from "../../utils/routeNamesClass";
const routeNames = new RouteNamesClass()
/**
 * Refactor using objects, interfaces to prevent repeated code. 
 */
const loginRoute = routeNames.fullLoginURL;
let randomEmail:string;

test.before(async (t : any) => {
    const uuid = uuidv4();
    randomEmail = `${uuid}@gmail.com`
    console.log("In before")
    
    const hashedPassword = await createHashedPassword("CorrectPassword123!")
    const {data, error}:any = await supabaseQuery.insert(supabase, 'User',{firstName: "firstName", lastName:"lastName", 
    email:randomEmail, password: hashedPassword});
    
    if(error){
        t.fail()
    }
})

test.after(async() => {
    await supabaseQuery.deleteFrom(supabase, 'User', 'email', randomEmail);
})

test(`POST ${loginRoute} with missing email`, async (t: any) => {
    const response = await request(app)
   .post(loginRoute)
   .send({password: "Password123"});
 
   t.true(response.status === 400)
   t.true(response.headers['content-type'] === "application/json; charset=utf-8")
   t.true(JSON.stringify(response.body) === JSON.stringify({mssg: 'All Fields Must Be Filled'}));
 })


test(`POST ${loginRoute} with missing password`, async (t: any) => {
    const response = await request(app)
   .post(loginRoute)
   .send({email:"testemail@gmail.com"});
 
   t.true(response.status === 400)
   t.true(response.headers['content-type'] === "application/json; charset=utf-8")
   t.true(JSON.stringify(response.body) === JSON.stringify({mssg: 'All Fields Must Be Filled'}));
 })

 test(`POST ${loginRoute} with missing password and email`, async (t: any) => {
    const response = await request(app)
   .post(loginRoute)
   .send({});
 
   t.true(response.status === 400)
   t.true(response.headers['content-type'] === "application/json; charset=utf-8")
   t.true(JSON.stringify(response.body) === JSON.stringify({mssg: 'All Fields Must Be Filled'}));
 })


 test(`POST ${loginRoute} with non-existent email`, async (t: any) => {
    const response = await request(app)
   .post(loginRoute)
   .send({
    email: `${uuidv4()}@gmail.com`,
    password:`CorrectPassword123!`
   });
 
   t.true(response.status === 400)
   t.true(response.headers['content-type'] === "application/json; charset=utf-8")
   t.true(JSON.stringify(response.body) === JSON.stringify({mssg: 'Incorrect Email'}));
 })

 test(`POST ${loginRoute} with correct email and password`, async (t: any) => {
    const response = await request(app)
   .post(loginRoute)
   .send({
    email: randomEmail,
    password:`CorrectPassword123!`
   });
   
   t.true(response.status === 200)
   t.true(response.headers['content-type'] === "application/json; charset=utf-8")
   t.true(response.body.firstName === "firstName");
   t.true(response.body.email === randomEmail);
   t.true(response.body.mssg === "Successful Login");
 })


