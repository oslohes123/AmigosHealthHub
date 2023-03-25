import { addSleep } from '../../../../routes/Sleep/sleep.controller';
import { SupabaseQueryClass } from '../../../../utils/databaseInterface';
import supabase from '../../../../utils/supabaseSetUp';
import { v4 as uuidv4 } from 'uuid';
import { createHashedPassword } from '../../../../utils/userFunctions';
import type { Request, Response } from 'express';
import test from 'ava';
const sinon = require('sinon');

const databaseQuery = new SupabaseQueryClass();

const uuid = uuidv4();
const randomEmail = `${uuid}@gmail.com`;

test.serial.before(async (t: any) => {
    const hashedPassword = await createHashedPassword('CorrectPassword123!');
    // console.log('Inserting user')
    const { error }: any = await databaseQuery.insert(supabase, 'User', {
        id: uuid,
        firstName: 'addSleep',
        lastName: 'TestUser',
        email: randomEmail,
        password: hashedPassword,
        age: 20
    });
    if (error) {
        // console.log(`MHtesterror:${error}`);
        t.fail(`Inserting user: ${JSON.stringify(error)}`);
    }
});

test.after.always('guaranteed cleanup', async (t: any) => {
    await databaseQuery.deleteFrom(supabase, 'User', 'id', uuid);
});

const mockResponse = () => {
    const res: any = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    return res;
};

const mockRequest = (sessionData: any) => {
    return {
        body: sessionData
    };
};

test('Attempt to insert data without UserID', async (t: any) => {
    const req = mockRequest({
        userID: null,
        timestamp: '20/03/2023',
        hoursSlept: 7
    });
    const res = mockResponse();
    await addSleep(req as Request, res as Response);

    t.true(res.status.calledWith(400));
    t.true(res.json.calledWith({ mssg: 'UserID must be provided' }));
});

test('Attempt to insert data without timestamp', async (t: any) => {
    const req = mockRequest({
        userID: uuid,
        timestamp: null,
        hoursSlept: 7
    });
    const res = mockResponse();
    await addSleep(req as Request, res as Response);

    t.true(res.status.calledWith(400));
    t.true(res.json.calledWith({ mssg: 'timestamp must be provided' }));
});

test('Attempt to insert data without hoursSlept', async (t: any) => {
    const req = mockRequest({
        userID: uuid,
        timestamp: '20/03/2023',
        hoursSlept: null
    });
    const res = mockResponse();
    await addSleep(req as Request, res as Response);

    t.true(res.status.calledWith(400));
    t.true(res.json.calledWith({ mssg: 'hoursSlept must be provided' }));
});

test('Successful insertion of sleep data', async (t: any) => {
    const req = mockRequest({
        userID: uuid,
        timestamp: '20/03/2023',
        hoursSlept: 7
    });
    const res = mockResponse();
    await addSleep(req as Request, res as Response);

    t.true(res.status.calledWith(200));
    t.true(
        res.json.calledWith({
            sleep: 'Sleep data added.'
        })
    );
});
