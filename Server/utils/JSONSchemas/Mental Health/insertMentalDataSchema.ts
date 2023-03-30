export const insertMentalData = {
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
  required: ['face', 'word', 'userid']
}
