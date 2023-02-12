interface dbInterface{
    //returns column of a table
    select: (db: any,table: string,column: any) => object;

    //inserts a single record or bulk create into a table.
 
    insert: (db: any, table:string, data:object) => object;


 //Delete data from a table where column value == value
 
    deleteFrom: (db: any, table:string, column: string, value: any) => void;


 //Update table with updatingData where a given column has some value
 
    update: (db: any, table: string, updatingData: object, column: string, value: any) => object;
 }


class supabaseQuery implements dbInterface{


    async select(supabaseDb: any,table: string,column: any): Promise<object | undefined >{
        try{
            const { data, error } = await supabaseDb
            .from(table)
            .select(column);
            
            if(error) console.error(error);
            else console.log({data});

            return {data};
        }

        catch(err: unknown){
            console.error(err);
        }
    }

    async insert(supabaseDb:any ,table: string, dataToBeInserted: object): Promise<object | undefined>{
        try{
            const {data, error} = await supabaseDb
            .from(table)
            .insert(dataToBeInserted)
            .select();

            if(error) console.error(error);
            else console.log({data});
            
            return {data};
    }
        catch(err: unknown){
            console.error(err);
        }
    }


    async deleteFrom(supabaseDb:any ,table: string, column: string, value: any): Promise<void | undefined>{
        try{
            const { error } = await supabaseDb
            .from(table)
            .delete()
            .eq(column, value);

            if(error) console.error(error);

        }

        catch(err: unknown){
            console.error(err);
        }

    }

    async update(supabaseDb: any,table: string,updatingData: object, column: string, value: any): Promise<object | undefined>{
        try{
            const {data, error} = await supabaseDb
            .from(table)
            .update(updatingData)
            .eq(column, value)
            .select();

            if(error) console.error(error);
            else{
                console.log({data});
                return {data}
            }

        }
        catch(err:unknown){
            console.error(err);
        }
    }


}

module.exports = supabaseQuery;