export const schemaForCreateWorkoutJSON = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  type: 'object',
  properties: {
    userid: {
      type: 'string',
      format: 'uuid'
    },
    workoutname: {
      type: 'string',
      minLength: 1,
      pattern: '[A-Za-z]\\s*[A-Za-z]'
    },
    exercises: {
      type: 'array',
      items: [
        {
          type: 'object',
          properties: {
            sets: {
              type: ['null', 'string']
            },
            weight: {
              type: ['null', 'string']
            },
            warmUpSet: {
              type: 'boolean'
            },
            reps: {
              type: ['null', 'string']
            },
            calories: {
              type: ['null', 'string']
            },
            distance: {
              type: ['null', 'string']
            },
            duration: {
              type: ['null', 'string']
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
    'userid',
    'workoutname',
    'exercises'
  ]
}
