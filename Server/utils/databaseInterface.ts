interface dbInterface{
    //returns column of a table
    select: (db: any,table: string,column: any) => object;

    //inserts a single record or bulk create into a table.
 
    insert: (db: any, table:string, data:object) => object;


 //Delete data from a table where column value == value
 
    deleteFrom: (db: any, table:string, column: string, value: any) => void;


 //Update table with updatingData where a given column has some value
 
    update: (db: any, table: string, updatingData: object, column: string, value: any) => object;
 
 //returns specific row of a table
    findrow: (db: any, table: string, column: string, value: any) => object;

    //returns last 5 rows inserted in table
    mostRecent: (db: any) => object;

    //removes exercises with duplicates
    returnexercises: (data: JSON) => string

    //returns the count of a certain value in an array
    getOccurences: (arr: Array<any>, val: any) => BigInteger
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
    async findrow(supabaseDb: any, table: string, row: string, value: any): Promise<object | undefined>{
        try{
            const {data, error} = await supabaseDb
            .from(table)
            .select("*")
            .eq(row, value)

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

    getOccurrences(arr: Array<any>, v: any) {
        var count = 0;
        arr.forEach((elem) => (elem === v && count++));
        return count;
    }

    returnexercises(data: JSON){
        const ids = []
        const finalIDs = []
        var count = 0
        var result = JSON.stringify(data).split('},');
        for (const prop in result) {
            ids.push(prop[0])
        }
        for (const id in ids) {
            if (this.getOccurrences(ids, id) == 1){
                finalIDs.push(id)
            }
        }
        for (const elem in result){
            if (finalIDs.includes(elem[0])){
                // do nothing
            }
            else{
                result.pop(0)
            }
            count ++ 
        }
        let answer = result.toString
        return JSON.parse(answer)
    }

    async mostRecent(supabaseDb: any): Promise<object | undefined>{
        const { data, error } = await supabaseDb
            .from('CompleteWorkouts')
            .select('CompleteWorkoutsID', 'Timestamp')
            .order('Timestamp', { ascending: false })
            .range(0, 4)
        if(error) console.error(error);
        else{
        console.log({data});
        return this.returnexercises(data)
        }
    }



}

module.exports = supabaseQuery;

