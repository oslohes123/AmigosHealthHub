import { Validator, type Schema } from 'jsonschema'
const jsonValidator = new Validator()

export default function validateJSONSchema (instance: any, schema: Schema): boolean {
  return jsonValidator.validate(instance, schema).valid
}
