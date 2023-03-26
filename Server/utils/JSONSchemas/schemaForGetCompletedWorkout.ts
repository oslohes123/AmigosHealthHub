export const schemaForGetCompletedWorkout = {
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
    date: {
      type: 'string',
      format: 'date'
    },
    time: {
      type: 'string'
    }
  },
  required: [
    'userid',
    'workoutname',
    'date',
    'time'
  ]
}
