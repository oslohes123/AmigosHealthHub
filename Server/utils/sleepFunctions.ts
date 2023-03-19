import { SupabaseQueryClass } from './databaseInterface';
import supabase from '../utils/supabaseSetUp';
const databaseQuery = new SupabaseQueryClass();

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

    const columnSelected = 'hoursSlept, timestamp, sleepQuality';
    const { data, error }: any = await databaseQuery.selectWhereRange(
        database,
        table,
        columnSelected,
        'userID',
        userID,
        startDate,
        endDate,
        'timestamp'
    );
    return { data, error };
};
