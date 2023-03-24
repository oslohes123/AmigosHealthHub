export const exercisesForWorkoutPlanTestSchema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  type: 'object',
  properties: {
    exercises: {
      type: 'array',
      items: [
        {
          type: 'object',
          properties: {
            sets: {
              type: 'null'
            },
            weight: {
              type: 'null'
            },
            warmUpSet: {
              type: 'string'
            },
            reps: {
              type: 'null'
            },
            calories: {
              type: 'integer'
            },
            distance: {
              type: 'integer'
            },
            duration: {
              type: 'integer'
            },
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
            'sets',
            'weight',
            'warmUpSet',
            'reps',
            'calories',
            'distance',
            'duration',
            'type',
            'name',
            'muscle',
            'difficulty',
            'instructions',
            'equipment'
          ]
        }
      ]
    }
  },
  required: [
    'exercises'
  ]
}
