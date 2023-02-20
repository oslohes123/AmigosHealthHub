const express = require('express');
const userInfoRouter = express.Router();

import { Request, Response } from 'express';

import supabase from '../utils/supabaseSetUp';
import { supabaseQueryClass } from '../utils/databaseInterface';
userInfoRouter.use(express.json());
const supabaseQuery = new supabaseQueryClass();

// async function getUser(databaseQuery, email) {
//     const userRows = await databaseQuery.selectWhere(
//         supabase,
//         'User',
//         'email',
//         email,
//         'firstName, lastName, email, age'
//     );

//     return userRows;
// }

export const getInfo = async (req: Request, res: Response) => {
    const { email } = req.body;
    console.log(`in getInfo controller:${JSON.stringify(req.body)}`);
    if (!email) {
        return res.status(400).json({ mssg: 'Email must be provided' });
    }
    const { data, error }: any = await supabaseQuery.selectWhere(
        supabase,
        'User',
        'email',
        email,
        'firstName, lastName, email, age'
    );
    if (error) {
        console.error(error);
        return res.status(400).json({ mssg: error });
    }
    if (data.length === 0) {
        console.log('User not found');
        return res.status(400).json({ mssg: 'User not found' });
    }
    console.log(`in info controller: ${JSON.stringify(data)}`);
    return res.status(200).json({ user: data[0] });
};

// module.exports.getInfo = getInfo;
export {};
