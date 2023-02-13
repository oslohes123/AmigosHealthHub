require('dotenv').config();
const supabase = require('../dist/utils/supabaseSetUp');
const supabaseQueryClass = require('../dist/utils/databaseInterface');
const bcrypt = require('bcrypt');
const validator = require('validator');
const supabaseQuery = new supabaseQueryClass();

const getInfo = async (req, res) => {
    const { email } = req.body;
    console.log(`email: ${email}`);
};
