import { type Request, type Response } from 'express'
import { clientSearchMethods } from '../../constants'
import brandedSearch from '../../utils/Food/searches/brandedSearch'
import instantSearch from '../../utils/Food/searches/instantFoodSearch'
import nutrientSearch from '../../utils/Food/searches/nutrientSearch'
import transformBrandedSearchInterface from '../../utils/Food/parseBrandedSearch'
import transformInstantSearchInterface from '../../utils/Food/parseInstantSearch'
import transformNutrientSearchInterface from '../../utils/Food/parseNutritionSearch'
import type genericSearchInterface from '../../interfaces/Food/genericSearchInterface'
import type specificFoodNutritionInterface from '../../interfaces/Food/specificFoodNutritionInterface'
import { isBranded } from '../../utils/Food/genericOrBrandedIdentifier'
import validateJSONSchema from './../../utils/validateJSONSchema'
import * as searchSchema from '../../utils/JSONSchemas/Food/searchSchema'
require('dotenv').config()

export const generalSearch = async (req: Request, res: Response) => {
  // const {value:inputData,code}:SearchCriteria = req.query.value
  if (!validateJSONSchema(req.params, searchSchema.generalSearch)) {
    return res.status(400).json({ message: 'Invalid JSON Schema', whatWeGot: req.params, schema: searchSchema.generalSearch })
  }
  const inputData = req.params.value
  const clientCode: clientSearchMethods = parseInt(req.params.code)
  const code: number = clientCode
  let data
  let result: genericSearchInterface | specificFoodNutritionInterface = {
    items: []
  }

  if (process.env.X_APP_ID === undefined) {
    return res.status(500).json({ message: 'X_APP_ID is undefined' })
  }
  if (process.env.X_APP_KEY === undefined) {
    return res.status(500).json({ message: 'X_APP_KEY is undefined' })
  }

  switch (clientCode) {
    case clientSearchMethods.genericSearch:
      try {
        data = await instantSearch(inputData)
        result = transformInstantSearchInterface(data)
      } catch (error) {

      }

      break
    case clientSearchMethods.specificSearch:
      // If the input data contains a number or is greater or equal to 24 characters, it is a branded search
      if (isBranded(inputData)) {
        try {
          data = await brandedSearch(inputData)
          result = transformBrandedSearchInterface(data)
        } catch (error) {

        }
      } else {
        try {
          data = await nutrientSearch(inputData)
          result = transformNutrientSearchInterface(data)
        } catch (error) {

        }
      }
      break
    default:
      data = `The code was incorrect as ${code} use literal searchMethods for correct code`
      result = {
        items: [],
        errorMessage: `Invalid code: ${code}. Use 0 for genericSearches and 1 for specificSearches.`
      }
      res.status(500).json(result)
  }
  res.status(200).json(result)
}
