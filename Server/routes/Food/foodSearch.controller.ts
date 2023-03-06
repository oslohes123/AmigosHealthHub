require("dotenv").config();
import { Request, Response } from "express";
import { clientSearchMethods } from "../../constants";
import brandedSearch from "../../utils/Food/searches/brandedSearch";
import instantSearch from "../../utils/Food/searches/instantFoodSearch";
import nutrientSearch from "../../utils/Food/searches/nutrientSearch";
import transformBrandedSearchInterface from "../../utils/Food/parseBrandedSearch";
import transformInstantSearchInterface from "../../utils/Food/parseInstantSearch";
import transformNutrientSearchInterface from "../../utils/Food/parseNutritionSearch";
import genericSearchInterface from "../../interfaces/Food/genericSearchInterface";
import specificFoodNutritionInterface from "../../interfaces/Food/specificFoodNutritionInterface";

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
      try {
        data = await instantSearch(inputData);
        result = transformInstantSearchInterface(data);
      } catch (error) {
        console.log(error);
      }

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
      res.status(500).json(result);
  }

  res.status(200).json(result);
};
