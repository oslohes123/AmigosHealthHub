//  Force json to have a property named userid that has 36 characters like the UUID format
export const schemaForRequireduserid = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  type: 'object',
  properties: {
    userid: {
      type: 'string',
      format: 'uuid'
    }
  },
  required: [
    'userid'
  ]
}
