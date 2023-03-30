export const useridAndDateSchema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  type: 'object',
  properties: {
    userid: {
      type: 'string',
      format: 'uuid'
    },
    date: {
      type: 'string',
      format: 'date'
    }
  },
  required: [
    'userid',
    'date'
  ]
}
