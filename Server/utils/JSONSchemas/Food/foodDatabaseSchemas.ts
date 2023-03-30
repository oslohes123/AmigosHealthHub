export const addTrackedFood = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    input: {
      type: 'object',
      properties: {
        foodData: {
          type: 'object',
          properties: {
            food_name: {
              type: 'string'
            },
            brand_name: {
              oneOf: [
                {
                  type: 'null'
                },
                {

                  type: 'string'
                }
              ]
            },
            serving_qty: {
              type: 'string'
            },
            serving_unit: {
              type: 'string'
            },
            serving_weight_grams: {
              type: 'number'
            },
            calories: {
              type: 'number'
            },
            fat: {
              type: 'number'
            },
            protein: {
              type: 'number'
            },
            carbohydrates: {
              type: 'number'
            },
            sugar: {
              type: 'number'
            },
            fiber: {
              type: 'number'
            },
            alt_measures: {
              oneOf: [
                {
                  type: 'null'
                },
                {
                  type: 'array'
                }
              ]
            }
          },
          required: [
            'food_name',
            'serving_qty',
            'serving_unit',
            'serving_weight_grams',
            'calories',
            'fat',
            'protein',
            'carbohydrates',
            'sugar',
            'fiber'
          ]
        },
        foodIdentifier: {
          type: 'string'
        }
      },
      required: [
        'foodData',
        'foodIdentifier'
      ]
    },
    userID: {
      type: 'string'
    }
  },
  required: [
    'input',
    'userID'
  ]
}
export const getTrackedFood = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    date: {
      type: 'string',
      format: 'date'
    },
    userID: {
      type: 'string'
    }
  },
  required: [
    'date',
    'userID'
  ]
}

export const getSpecificTrackedFood = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    LogID: {
      type: 'string'
    }
  },
  required: [
    'LogID'
  ]
}

export const updateTrackedFood = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    Quantity: {
      type: 'number'
    },
    Measure: {
      type: 'string'
    },
    LogID: {
      type: 'string'
    },
    Calories: {
      type: 'number'
    }
  },
  required: [
    'Quantity',
    'Measure',
    'LogID',
    'Calories'
  ]
}

export const deleteTrackedFood = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    LogID: {
      type: 'string'
    }
  },
  required: [
    'LogID'
  ]
}
export const getFood = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    FoodID: {
      type: 'string'
    }
  },
  required: [
    'FoodID'
  ]
}

export const getMultipleFood = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    foodIDs: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  },
  required: [
    'foodIDs'
  ]
}
