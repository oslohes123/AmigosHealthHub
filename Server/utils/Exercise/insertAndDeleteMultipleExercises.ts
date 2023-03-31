import supabase from '../General/supabaseSetUp'
import { SupabaseQueryClass } from '../General/databaseInterface'
// import validateJSONSchema from '../validateJSONSchema'
// import { schemaForAnExercise } from '../JSONSchemas/schemaForAnExercise'
const databaseQuery = new SupabaseQueryClass()
export async function insertMultipleExercises (arrayOfExercisesToInsert: object[]) {
  const insertMultipleExercisesError = { errorInsertingMultipleExercises: '' }
  const { error }: any = await databaseQuery.insert(supabase, 'Exercises', arrayOfExercisesToInsert)

  if (error) {
    insertMultipleExercisesError.errorInsertingMultipleExercises = error
    return insertMultipleExercisesError
  }
  return insertMultipleExercisesError
}

export async function deleteMultipleExercises (arrayOfExercisesToDelete: object[]) {
  const deleteMultipleExercisesError = { errorDeletingMultipleExercises: '' }

  for (let i = 0; i < arrayOfExercisesToDelete.length; i++) {
    //  @ts-expect-error name will exist on the object, will have to validate
    if (!arrayOfExercisesToDelete[i].name) {
      deleteMultipleExercisesError.errorDeletingMultipleExercises = 'JSON schema did not validate'
      return deleteMultipleExercisesError
    }
    //  @ts-expect-error name will exist on the object, will have to validate
    const { error }: any = await databaseQuery.deleteFrom(supabase, 'Exercises', 'name', arrayOfExercisesToDelete[i].name)
    if (error) {
      deleteMultipleExercisesError.errorDeletingMultipleExercises = error
      return deleteMultipleExercisesError
    }
  }
  return deleteMultipleExercisesError
}
