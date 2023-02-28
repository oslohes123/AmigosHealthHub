require("dotenv").config();
import { Request, Response } from "express";
import { SearchCriteria, clientSearchMethods } from "../constants";
import brandedSearch from "../searches/brandedSearch";
import instantSearch from "../searches/instantFoodSearch";
import nutrientSearch from "../searches/nutrientSearch";
import transformBrandedSearchInterface from "../utils/parseBrandedSearch";
import transformInstantSearchInterface from "../utils/parseInstantSearch";
import transformNutrientSearchInterface from "../utils/parseNutritionSearch";
import genericSearchInterface from "./../interfaces/genericSearchInterface";
import specificFoodNutritionInterface from "./../interfaces/specificFoodNutritionInterface";

export const generalSearch = async (req: Request, res: Response) => {
  // const {value:inputData,code}:SearchCriteria = req.query.value
  const inputData = req.params.value;
  const clientCode: clientSearchMethods = parseInt(req.params.code);
  let data;
  let result: genericSearchInterface | specificFoodNutritionInterface = {
    items: [],
  };

  if (process.env.X_APP_ID === undefined) {
    console.log("X_APP_ID is undefined");
    return res.status(500).json({ message: "X_APP_ID is undefined" });
  }
  if (process.env.X_APP_KEY === undefined) {
    console.log("X_APP_KEY is undefined");
    return res.status(500).json({ message: "X_APP_KEY is undefined" });
  }

  let regex = /\d/;
  switch (clientCode) {
    case clientSearchMethods.genericSearch:
      data = await instantSearch(inputData);
      result = transformInstantSearchInterface(data);
      break;
    case clientSearchMethods.specificSearch:
      // If the input data contains a number or is greater or equal to 24 characters, it is a branded search
      if (regex.test(inputData) || inputData.length >= 24) {
        try {
          data = await brandedSearch(inputData);
          result = transformBrandedSearchInterface(data);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          data = await nutrientSearch(inputData);
          result = transformNutrientSearchInterface(data);
        } catch (error) {
            console.log(error);
        }
      }
      break;
    default:
      data = `The code was incorrect as ${clientCode} use literal searchMethods for correct code`;
      result = {
        items: [],
        errorMessage: `Invalid code: ${clientCode}. Use 0 for genericSearches and 1 for specificSearches.`,
      };
  }

  res.json(result);
};
