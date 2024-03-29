interface dbInterface {
  // returns column of a table
  select: (db: any, table: string, column: any) => object

  // returns columns (defined by toBeSelected) of rows of the table where the column has value toBeFound
  // to return all columns of the table with a specific value, toBeSelected=='*'
  selectWhere: (
    db: any,
    table: string,
    column: string,
    toBeFound: any,
    toBeSelected: string
  ) => object

  // inserts a single record or bulk create into a table.

  insert: (db: any, table: string, data: object) => object

  // Delete data from a table where column value == value

  deleteFrom: (db: any, table: string, column: string, value: any) => void

  // Update table with updatingData where a given column has some value

  update: (
    db: any,
    table: string,
    updatingData: object,
    column: string,
    value: any
  ) => object

  // Select toBeSelected where a row in the given table matches 'match'
  match: (
    db: any,
    table: string,
    toBeSelected: string,
    toBeMatched: object
  ) => object
  // returns most recent data

  mostrecent: (
    db: any,
    table: string,
    firstcolumn: string,
    secondcolumn: string,
    id: string | string[] | undefined
  ) => object

  todays_data: (
    db: any,
    table: string,
    first_column: string,
    second_cloumn: string,
    toBeFoundFirst: any,
    toBeFoundSecond: any,
    toBeSelected: string
  ) => object
}

/**
 * For more information, look at the supabase JS client library: https://supabase.com/docs/reference/javascript/installing
 */
export class SupabaseQueryClass implements dbInterface {
  async select (
    supabaseDb: any,
    table: string,
    column: any
  ): Promise<object | undefined> {
    try {
      const { data, error } = await supabaseDb.from(table).select(column)

      if (error) return { data: null, error }
      else return { data, error: undefined }
    } catch (err: unknown) {
      return { data: null, error: err }
    }
  }

  async match (
    supabaseDb: any,
    table: string,
    toBeSelected: string,
    toBeMatched: object
  ): Promise<object | undefined> {
    try {
      const { data, error } = await supabaseDb
        .from(table)
        .select(toBeSelected)
        .match(toBeMatched)

      if (error) {
        return { data: null, error }
      } else {
        return { data, error: undefined }
      }
    } catch (err: unknown) {
      return { data: null, error: err }
    }
  }

  async selectIn (
    supabaseDb: any,
    table: string,
    column: string,
    toBeFound: any,
    toBeSelected: string[]
  ): Promise<object | undefined> {
    try {
      const { data, error } = await supabaseDb
        .from(table)
        .select(column)
        .in(toBeFound, toBeSelected)

      if (error) {
        return { data: null, error }
      } else {
        return { data, error: undefined }
      }
    } catch (err: unknown) {
      return { data: null, error: err }
    }
  }

  async selectWhere (
    supabaseDb: any,
    table: string,
    column: string,
    toBeFound: any,
    toBeSelected: string
  ): Promise<object | undefined> {
    try {
      const { data, error } = await supabaseDb
        .from(table)
        .select(toBeSelected)
        .eq(column, toBeFound)

      if (error) {
        return { data: null, error }
      } else return { data, error: undefined }
    } catch (err: unknown) {
      return { data: null, error: err }
    }
  }

  async insert (
    supabaseDb: any,
    table: string,
    dataToBeInserted: object
  ): Promise<object | undefined> {
    try {
      const { data, error } = await supabaseDb
        .from(table)
        .insert(dataToBeInserted)
        .select()

      if (error) {
        return { data: null, error }
      } else return { data, error: undefined }
    } catch (err: unknown) {
      return { data: null, error: err }
    }
  }

  async deleteFrom (
    supabaseDb: any,
    table: string,
    column: string,
    value: any
  ): Promise<object | undefined> {
    try {
      const { error } = await supabaseDb
        .from(table)
        .delete()
        .eq(column, value)

      if (error) return { error }
      else return { error: undefined }
    } catch (err: unknown) {
      return { error: err }
    }
  }

  async update (
    supabaseDb: any,
    table: string,
    updatingData: object,
    column: string,
    value: any
  ): Promise<object | undefined> {
    try {
      const { data, error } = await supabaseDb
        .from(table)
        .update(updatingData)
        .eq(column, value)
        .select()

      if (error) return { data: null, error }
      else {
        return { data, error: undefined }
      }
    } catch (err: unknown) {
      return { data: null, error: err }
    }
  }

  async selectWhereRange (
    supabaseDb: any,
    table: string,
    column: string,
    filterColumn: string,
    toBeFound: string,
    startValue: string,
    endValue: string,
    sortBy: string
  ): Promise<object | undefined> {
    try {
      const { data, error } = await supabaseDb
        .from(table)
        .select(column)
        .eq(filterColumn, toBeFound)
        .gte(sortBy, startValue)
        .lte(sortBy, endValue)
        .order(sortBy, { ascending: true })

      if (error) return { data: null, error }
      else return { data, error: undefined }
    } catch (err: unknown) {
      return { data: null, error: err }
    }
  }

  async mostrecent (
    supabaseDb: any,
    table: string,
    firstcolumn: string,
    secondcolumn: string,
    id: any
  ): Promise<object | undefined> {
    try {
      const { data, error } = await supabaseDb
        .from(table)
        .select('user_id')
        .eq('user_id', id)
        .select(firstcolumn, secondcolumn)
        .order(secondcolumn, { ascending: false })
        .range(0, 6)

      if (error) {
        return { data: null, error }
      } else {
        return { data, error: undefined }
      }
    } catch (err: unknown) {
      return { data: null, error: err }
    }
  }

  async todays_data (
    supabaseDb: any,
    table: string,
    firstColumn: string,
    secondColoumn: string,
    toBeFoundFirst: any,
    toBeFoundSecond: any,
    toBeSelected: string
  ): Promise<object | undefined> {
    try {
      const { data, error } = await supabaseDb
        .from(table)
        .select(toBeSelected)
        .eq(firstColumn, toBeFoundFirst)
        .select(toBeSelected)
        .eq(secondColoumn, toBeFoundSecond)

      if (error) {
        return { data: null, error }
      } else return { data, error: undefined }
    } catch (err: unknown) {
      return { data: null, error: err }
    }
  }
}

export {}
