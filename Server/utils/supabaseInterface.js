/*
This is the interface for supabase. For more detail, view https://supabase.com/docs/reference/javascript/select .
*/



/**
 * 
 * @param {object} supabaseDb which supabase database is to be used
 * @param {string} table 
 * @param {object} data 
 * @return the records created by this method
 * 
 * insert a single record or bulk create into a table of a supabase database.
 */
async function insert(supabaseDb,table, data){

    const { err } = await supabaseDb
    .from(table)
    .insert(data)
    .select();

    if(err) console.error(err);
    else{
        console.log({data});
        return {data};
    }
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

/**
 * 
 * @param {object} supabaseDb 
 * @param {string} table 
 * @param {string} column 
 * @returns {data} data to be returned
 * 
 * Select a specific column of a table. 
 * column = '*' to return entire table
 */
async function select(supabaseDb,table,column){

    const { data, err } = await supabaseDb
    .from(table)
    .select(column)

    if(err) console.error(err);
    else{
        console.log({data});
        return {data}
    }
}

/**
 * 
 * @param {Object} supabaseDb 
 * @param {string} table 
 * @param {Object} updatingData 
 * @param {string} column 
 * @param {any} value 
 * @returns the updated record
 * 
 * Update table of supabaseDb with updatingData where a given column has some value
 */
async function update(supabaseDb,table,updatingData, column, value){

    const { data, err } = await supabaseDb
    .from(table)
    .update(updatingData)
    .eq(column, value)
    .select();

    if(err) console.error(err);
    else{
        console.log({data});
        return {data}
    }
}









exports.insert = insert;
exports.delete = deleteFrom;
exports.select = select;
exports.update = update;