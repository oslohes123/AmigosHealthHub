export const enum apiSearchMethods  {
    instantSearch = 0,
    nutrientSearch = 1,
    brandedSearch = 2,
}

export const enum clientSearchMethods  {
    genericSearch = 0,
    specificSearch = 1,
}
export interface SearchCriteria {
    value:String,
    code:apiSearchMethods,
}

//When true, routes are running on deployedServer
export const deployedServer = true;



