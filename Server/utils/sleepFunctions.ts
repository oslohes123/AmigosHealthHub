import supabase from '../utils/supabaseSetUp';
import { supabaseQueryClass } from './databaseInterface';
const databaseQuery = new supabaseQueryClass();

export const addSleepFunc = async (
    sleepData: Object,
    database = supabase,
    table = 'Sleep Data'
) => {
    console.log(`Sleep data TO ADD: ${sleepData}`);
    const { data, error }: any = await databaseQuery.insert(
        database,
        table,
        sleepData
    );
    return { data, error };
};

export const getSleepFunc = async (
    userID: String,
    startDate: String,
    endDate: String,
    database = supabase,
    table = 'Sleep Data'
) => {
    console.log(
        `Getting sleep data from ${startDate} to ${endDate} for user ${userID}`
    );

    const columnSelected = 'hoursSlept, timestamp';
    const { data, error }: any = await databaseQuery.selectWhereRange(
        database,
        table,
        columnSelected,
        'userID',
        userID,
        startDate,
        endDate
    );
    return { data, error };
};
