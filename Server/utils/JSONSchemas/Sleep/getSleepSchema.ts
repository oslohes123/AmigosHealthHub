export const getSleepSchema =
{
  $schema: 'http://json-schema.org/draft-04/schema#',
  type: 'object',
  properties: {
    userID: {
      type: 'string',
      format: 'uuid'
    },
    startDate: {
      type: 'string'
    },
    endDate: {
      type: 'string'
    }
  },
  required: [
    'userID',
    'startDate',
    'endDate'
  ]
}
