import supabase from "../utils/supabaseSetUp";
import { supabaseQueryClass } from "./databaseInterface";
const bcrypt = require("bcrypt");
const jwttoken = require("jsonwebtoken");
const databaseQuery = new supabaseQueryClass();

export const createUser = async (
  informationToInsert: Object,
  database = supabase,
  table = "User"
) => {
  const { data, error }: any = await databaseQuery.insert(
    database,
    table,
    informationToInsert
  );
  return { data, error };
};

export const getUserByEmail = async (
  email: string,
  toBeSelected = "*",
  database = supabase,
  table = "User"
) => {
  const { data, error }: any = await databaseQuery.selectWhere(
    database,
    table,
    "email",
    email,
    toBeSelected
  );

  return { data, error };
};

export const updateUser = async(
  email: string,
  newInfo: Object,
  database = supabase,
  table = "User"
) => {
  const {data, error}:any = await databaseQuery.update(database, table, newInfo, 
    'email', email);

    return {data, error}
}

export const verifyPassword = async (
  inputtedPassword: String,
  actualPassword: String
) => {
  const match = await bcrypt.compare(inputtedPassword, actualPassword);
  return match;
};

export const createHashedPassword = async (passwordToBeHashed: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(passwordToBeHashed, salt);
  return hashedPassword;
};

export const createToken = (id: string, secret = process.env.JWTSECRET) => {
  return "bearer " + jwttoken.sign({ id }, secret, { expiresIn: "1h" });
};
