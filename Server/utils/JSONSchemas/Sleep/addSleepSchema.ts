export const addSleepSchema =
{
  $schema: 'http://json-schema.org/draft-04/schema#',
  type: 'object',
  properties: {
    userID: {
      type: 'string',
      format: 'uuid'
    },
    hoursSlept: {
      type: 'integer'
    },
    sleepQuality: {
      type: 'integer'
    },
    timestamp: {
      type: 'string'
    }
  },
  required: [
    'userID',
    'hoursSlept',
    'sleepQuality',
    'timestamp'
  ]
}
