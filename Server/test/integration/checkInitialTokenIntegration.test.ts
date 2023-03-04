import app from "../../index";
const request = require('supertest');
const test = require('ava');
import { createHashedPassword, createToken, deleteUserRow } from "../../utils/userFunctions";
import { Request, Response } from 'express';
const sinon = require('sinon');
import { getInfo } from "../../routes/getUserInfo.controller";
import {v4 as uuidv4} from 'uuid';
const bcrypt = require('bcrypt');
import supabase from "../../utils/supabaseSetUp";
import { supabaseQueryClass } from "../../utils/databaseInterface"; 
const supabaseQuery = new supabaseQueryClass();
import RouteNamesClass from "../../utils/routeNamesClass";
const routeNames = new RouteNamesClass()

const checkInitialTokenRoute = routeNames.fullCheckInitialTokenURL

test(`GET ${checkInitialTokenRoute} with missing authorization`, async (t: any) => {

    const response = await request(app)
   .get(checkInitialTokenRoute);

 
   t.true(response.status === 401)
   t.true(response.headers['content-type'] === "application/json; charset=utf-8")
   t.true(JSON.stringify(response.body) === JSON.stringify({mssg: "No Authorization Header"}));
})

test(`GET ${checkInitialTokenRoute} with authorization header with no spaces results in error`, async (t: any) => {

    const response = await request(app)
   .get(checkInitialTokenRoute)
   .set("authorization", "tokenValue")

 
   t.true(response.status === 401)
   t.true(response.headers['content-type'] === "application/json; charset=utf-8")
   t.true(JSON.stringify(response.body) === JSON.stringify({mssg: "Authorization header must have format 'bearer token'."}));
})

test(`GET ${checkInitialTokenRoute} with authorization header with no bearer substring results in error`, async (t: any) => {

    const response = await request(app)
   .get(checkInitialTokenRoute)
   .set("authorization", " tokenValue")

 
   t.true(response.status === 401)
   t.true(response.headers['content-type'] === "application/json; charset=utf-8")
   t.true(JSON.stringify(response.body) === JSON.stringify({mssg: "Authorization header must have format 'bearer token'."}));
})

test(`GET ${checkInitialTokenRoute} with illegitimate token in authorization header results in error`, async (t: any) => {

    const response = await request(app)
   .get(checkInitialTokenRoute)
   .set("authorization", "bearer tokenValue")

 
   t.true(response.status === 401)
   t.true(response.headers['content-type'] === "application/json; charset=utf-8")
   t.true(JSON.stringify(response.body) === JSON.stringify({mssg: "Request Failed due to Authentication"}));
})

test(`GET ${checkInitialTokenRoute} with incorrect payload results in error`, async (t: any) => {

    const uuid = uuidv4();
    const token = createToken(uuid);

    const response = await request(app)
   .get(checkInitialTokenRoute)
   .set("authorization", `${token}`)

 
   t.true(response.status === 401)
   t.true(response.headers['content-type'] === "application/json; charset=utf-8")
   t.true(JSON.stringify(response.body) === JSON.stringify({mssg: "Request Failed due to Authentication"}));
})

test(`GET ${checkInitialTokenRoute} with legitimate token results in success`, async (t: any) => {

    
    const uuid = uuidv4();
    const testUser = `${uuid}@gmail.com`;

    const hashedPassword = await createHashedPassword("User1Password123!")
    await supabaseQuery.insert(supabase, 'User',{firstName: "Test", lastName:"User", 
    email:testUser, password: hashedPassword, age: 31});
    
    const{data, error}:any = await supabaseQuery.selectWhere(supabase,'User'
    ,'email',testUser,'id');

    const token = createToken(data[0].id)

    const response = await request(app)
   .get(checkInitialTokenRoute)
   .set("authorization", `${token}`)

 
   t.true(response.status === 200)
   t.true(response.headers['content-type'] === "application/json; charset=utf-8")
   t.true(JSON.stringify(response.body) === JSON.stringify({mssg: "Legitimate token"}));
   await deleteUserRow(testUser)
})

