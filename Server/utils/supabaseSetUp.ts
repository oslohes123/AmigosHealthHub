require('dotenv').config();
const myDatabase = require("@supabase/supabase-js");
const supabase = myDatabase.createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
export default supabase;
export {};