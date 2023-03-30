export const rateMentalSchema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  type: 'object',
  properties: {
    face: {
      type: 'integer'
    },
    word: {
      type: 'string'
    },
    userid: {
      type: 'string'
    }
  },
  required: [
    'face',
    'word',
    'userid'
  ]
}
