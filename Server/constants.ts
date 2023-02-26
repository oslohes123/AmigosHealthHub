export const baseUrl = "https://trackapi.nutritionix.com/v2/";

export const enum searchMethods  {
    instantSearch = 0,
    nutrientSearch = 1,
    brandedSearch = 2,
}
export interface SearchCriteria {
    value:string,
    code:searchMethods,
}
