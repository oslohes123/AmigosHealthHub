import supabase from '../utils/supabaseSetUp';
import { supabaseQueryClass } from './databaseInterface';
const databaseQuery = new supabaseQueryClass();

export const addSleepFunc = async (
    sleepData: Object,
    database = supabase,
    table = 'Sleep Data'
) => {
    console.log(sleepData);
    const { data, error }: any = await databaseQuery.insert(
        database,
        table,
        sleepData
    );
    return { data, error };
};
