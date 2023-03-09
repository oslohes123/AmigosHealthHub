const test = require('ava');
import { Request, Response } from 'express';
const sinon = require('sinon');
import { faceValues, wordValues } from "../../../../controllers/mhcontroller";
import { supabaseQueryClass } from '../../../../utils/databaseInterface';
import supabase from '../../../../utils/supabaseSetUp';

const supabaseQuery = new supabaseQueryClass();

const mockResponse = () => {
    let res: any = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    return res;
};

const mockRequest = (sessionData: any) => {
    return {
        body: sessionData
    }
}
test("Return last 7 words and their frequencies", async (t: any) => {

    console.log("In returning last 7 words and their frequencies")
    const req = mockRequest({
        id: '9d-1852-4c2d-802c-e10d3ebdc05b',
    });
    const res = mockResponse();
    await wordValues(req as Request, res as Response)

    t.true(res.status.calledWith(400))
    t.true(res.json.calledWith({mssg : "Failed to return last 7 words"}));
});
test("Return last 7 faces and their frequencies", async (t: any) => {

    console.log("In returning last 7 words and their average")
    const req = mockRequest({
        id: '9d-1852-4c2d-802c-e10d3ebdc05b',
    });
    const res = mockResponse();
    await wordValues(req as Request, res as Response)

    t.true(res.status.calledWith(200))
});
test("Return last 7 words and their frequencies", async (t: any) => {

    console.log("In returning last 7 words and their frequencies")
    const req = mockRequest({
        id: 'e9a8a99d-1852-4c2d-802c-e10d3ebdc05b',
    });
    const res = mockResponse();
    await wordValues(req as Request, res as Response)

    t.true(res.status.calledWith(400))
    t.true(res.json.calledWith({mssg : "Failed to return last 7 words"}));
});

test("Return last 7 faces", async (t: any) => {

    console.log("In returning last 7 faces and their average")
    const req = mockRequest({
        id: 'e9a8a99d-1852-4c2d-802c-e10d3ebdc05b',
    });
    const res = mockResponse();
    await faceValues(req as Request, res as Response)

    t.true(res.status.calledWith(200))

})