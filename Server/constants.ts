export const baseUrl = 'https://trackapi.nutritionix.com/v2/'

export const enum apiSearchMethods {
  instantSearch = 0,
  nutrientSearch = 1,
  brandedSearch = 2,
}

export const enum clientSearchMethods {
  genericSearch = 0,
  specificSearch = 1,
}
export interface SearchCriteria {
  value: string
  code: apiSearchMethods
}
