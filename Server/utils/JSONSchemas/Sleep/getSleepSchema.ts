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
      type: 'string',
      format: 'date'
    },
    endDate: {
      type: 'string',
      format: 'date'
    }
  },
  required: [
    'userID',
    'startDate',
    'endDate'
  ]
}
