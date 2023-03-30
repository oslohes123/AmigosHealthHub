export const getMentalHealthStats = {
  type: 'object',
  properties: {
    userid: {
      type: 'string',
      format: 'uuid'
    }
  },
  required: ['userid']
}
