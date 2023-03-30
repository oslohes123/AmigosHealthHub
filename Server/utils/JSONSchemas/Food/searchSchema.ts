export const generalSearch = {
  type: 'object',
  properties: {
    value: {
      type: 'string'
    },
    code: {
      type: 'string'
    }
  },
  required: ['value', 'code']
}
