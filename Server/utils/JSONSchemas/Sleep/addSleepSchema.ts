export const addSleepSchema =
    {
      $schema: 'http://json-schema.org/draft-04/schema#',
      type: 'object',
      properties: {
        userid: {
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
          type: 'string',
          format: 'date'
        }
      },
      required: [
        'userid',
        'hoursSlept',
        'sleepQuality',
        'timestamp'
      ]
    }
