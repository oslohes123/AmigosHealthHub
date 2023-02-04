
/**
 * 
 * @param {object} supabaseDb which supabase database is to be used
 * @param {string} table 
 * @param {object} data 
 * 
 * insert data into a given table of a given supabase database 
 */
async function insert(supabaseDb,table, data){

    const { err } = await supabaseDb
    .from(table)
    .insert(data)

    if(err) console.error(err);
}

/**
 * 
 * @param {object} supabaseDb which supabase database is to be used
 * @param {string} table which table
 * @param {string} column  
 * @param {any} value
 * 
 * Delete data from a specific table of supabaseDb, where 
 * column value == value
 */
async function deleteFrom(supabaseDb,table, column, value){

    const { err } = await supabaseDb
    .from(table)
    .delete()
    .eq(column, value);
    
    if(err) console.error(err);
}


exports.insert = insert;
exports.delete = deleteFrom;