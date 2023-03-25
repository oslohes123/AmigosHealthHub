export const schemaForAnExercise = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  type: 'object',
  properties: {
    type: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    muscle: {
      type: 'string'
    },
    difficulty: {
      type: 'string'
    },
    instructions: {
      type: 'string'
    },
    equipment: {
      type: 'string'
    }
  },
  required: [
    'type',
    'name',
    'muscle',
    'difficulty',
    'instructions',
    'equipment'
  ]
}
