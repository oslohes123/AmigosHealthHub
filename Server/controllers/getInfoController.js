const express = require('express');
const userInfoRouter = express.Router();
const supabase = require('../dist/utils/supabaseSetUp');
userInfoRouter.use(express.json());
const supabaseQueryClass = require('../dist/utils/databaseInterface');
const supabaseQuery = new supabaseQueryClass();

async function getUser(databaseQuery, email) {
    const userRows = await databaseQuery.selectWhere(
        supabase,
        'User',
        'email',
        email,
        'firstName, lastName, email, age'
    );

    return userRows;
}

const getInfo = async (req, res) => {
    const { email } = req.body;
    console.log(`in getInfo controller:${JSON.stringify(req.body)}`)
    if (!email) {
        return res.status(400).json({ mssg: 'Email must be provided' });
    }
    const { data, error } = await getUser(supabaseQuery, email);
    if (error) {
        console.error(error);
        return res.status(400).json({ mssg: error.message });
    }
    if (data.length === 0) {
        console.log('User not found');
        return res.status(400).json({ mssg: 'User not found' });
    }
    console.log(`in info controller: ${JSON.stringify(data)}`);
    return res.status(200).json({ user: data[0] });
};

module.exports.getInfo = getInfo;
