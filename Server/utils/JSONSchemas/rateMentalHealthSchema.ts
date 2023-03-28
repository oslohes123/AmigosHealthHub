export const rateMentalSchema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  type: 'object',
  properties: {
    face: {
      type: 'string'
    },
    word: {
      type: 'string'
    },
    userid: {
      type: 'string',
      format: 'uuid'
    }
  },
  required: [
    'face',
    'word',
    'userid'
  ]
}
