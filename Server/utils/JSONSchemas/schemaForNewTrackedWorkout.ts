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
              type: ['null', 'string']
            },
            weight: {
              type: ['null', 'array']
            },
            warmUpSet: {
              type: 'boolean'
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
              type: 'number'
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
