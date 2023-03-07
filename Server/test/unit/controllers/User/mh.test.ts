import { Request, Response } from 'express';
import sinon from "sinon";
import { faceValues } from "../../../../controllers/mhcontroller";
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
// test("Return last 7 words and their frequencies", async (t: any) => {

//     console.log("In returning last 7 words and their frequencies")
//     const req = mockRequest({id: '9d-1852-4c2d-802c-e10d3ebdc05b'});
//     const res = mockResponse();
//         await faceValues(req as Request, res as Response)

//         t.true(res.status.calledWith(400))
//         t.true(res.json.calledWith({mssg : "Failed to return last 7 faces"}))
// })

test("Return last 7 faces")