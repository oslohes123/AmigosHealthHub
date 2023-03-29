export const schemaForNewTrackedWorkout = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  type: 'object',
  properties: {
    userid: {
      type: 'string',
      format: 'uuid'
    },
    workoutname: {
      type: 'string'
    },
    exercises: {
      type: 'array',
      items: [
        {
          type: 'object',
          properties: {
            name: {
              type: 'string'
            },
            sets: {
              type: ['null', 'integer', 'string']
            },
            weight: {
              type: ['null', 'array']
            },
            warmUpSet: {
              type: ['boolean', 'string']
            },
            reps: {
              type: ['null', 'array']
            },
            calories: {
              type: ['null', 'number']
            },
            distance: {
              type: ['null', 'number']
            },
            duration: {
              type: ['null', 'number']
            }
          },
          required: [
            'name',
            'sets',
            'weight',
            'warmUpSet',
            'reps',
            'calories',
            'distance',
            'duration'
          ]
        },
        {
          type: 'object',
          properties: {
            name: {
              type: 'string'
            },
            sets: {
              type: ['null', 'integer', 'string']
            },
            weight: {
              type: ['null', 'array']
            },
            warmUpSet: {
              type: ['boolean', 'string']
            },
            reps: {
              type: ['null', 'array']
            },
            calories: {
              type: ['null', 'number']
            },
            distance: {
              type: ['null', 'number']
            },
            duration: {
              type: ['null', 'number']
            }
          },
          required: [
            'name',
            'sets',
            'weight',
            'warmUpSet',
            'reps',
            'calories',
            'distance',
            'duration'
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
