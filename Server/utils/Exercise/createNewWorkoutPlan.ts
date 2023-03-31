import addExerciseToExercises from './addExerciseToExercises'
import supabase from '../supabaseSetUp'
import { SupabaseQueryClass } from '../databaseInterface'
import validateJSONSchema from '../validateJSONSchema'
import { exercisesForWorkoutPlanTestSchema } from '../JSONSchemas/schemaForExercisesInCreatingAWorkoutPlan'
const databaseQuery = new SupabaseQueryClass()
/**
 * Creates a new workout plan for a user
 * @returns an object containing properties errorsCreatingNewWorkingPlan and success
 */
export default async function createNewWorkoutPlan (userid: string, workoutname: string, exercises: any) {
  // Add the exerciseID and userid of the exercise to each exercise object's property
  const errorsAndSuccess = { errorsCreatingNewWorkoutPlan: '', success: false }
  if (!validateJSONSchema(exercises, exercisesForWorkoutPlanTestSchema)) {
    errorsAndSuccess.errorsCreatingNewWorkoutPlan = 'JSON Schema did not validate exercises parameter'
    return errorsAndSuccess
  }
  exercises = exercises.exercises
  for (let i = 0; i < exercises.length; i++) {
    try {
      const { type, name, muscle, difficulty, instructions, equipment } = exercises[i]
      // JSON SCHEMA VALIDATION

      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      Object.keys(exercises[i]).forEach((k) => (exercises[i])[k] == null && delete (exercises[i])[k])
      const { errorPresent, ID } = await addExerciseToExercises(type, name, muscle, difficulty, instructions, equipment)
      if (errorPresent) {
        errorsAndSuccess.errorsCreatingNewWorkoutPlan = errorPresent
        return errorsAndSuccess
      }
      else {
        exercises[i].exerciseID = ID
        exercises[i].userID = userid
        delete exercises[i].type
        delete exercises[i].name
        delete exercises[i].muscle
        delete exercises[i].difficulty
        delete exercises[i].instructions
        delete exercises[i].equipment
      }
    }
    catch (error) {
      errorsAndSuccess.errorsCreatingNewWorkoutPlan = JSON.stringify(error)
      return errorsAndSuccess
    }
  }

  // 1. Create a record in WorkoutPlans

  const { data, error }: any = await databaseQuery.match(supabase, 'WorkoutPlans', '*', { userid, workoutname })
  if (error) {
    errorsAndSuccess.errorsCreatingNewWorkoutPlan = JSON.stringify(error)
    return errorsAndSuccess
  }
  if (data.length > 0) {
    errorsAndSuccess.success = false
    return errorsAndSuccess
  }
  else {
    const { data, error }: any = await databaseQuery.insert(supabase, 'WorkoutPlans', { userid, workoutname })
    if (error) {
      errorsAndSuccess.errorsCreatingNewWorkoutPlan = JSON.stringify(error)
      return errorsAndSuccess
    }
    const workoutPlanID = data[0].WorkoutPlanID

    // 2. For each item in the array of exercises of the workout plan,before adding to PossibleExercise, query whether it’s in the table,  add to PossibleExercise

    // Assuming that exercises is an array of JSON. eg. [{exercse: "bicep "}, {}], Each element must contain atleast some properties that allow it to be uniquely identified

    const numberOfExercises = exercises.length
    const workoutPEIDs = []
    for (let i = 0; i < numberOfExercises; i++) {
      const { data, error }: any = await databaseQuery.match(supabase, 'PossibleExercises', 'PEID', exercises[i])
      if (error) {
        errorsAndSuccess.errorsCreatingNewWorkoutPlan = JSON.stringify(error)
        return errorsAndSuccess
      }

      else if (data.length > 0) {
        workoutPEIDs.push(data[0].PEID)
      }
      // if no possible exercise matches the one given, then insert into the table
      else {
        const { data, error }: any = await databaseQuery.insert(supabase, 'PossibleExercises', exercises[i])
        if (error) {
          errorsAndSuccess.errorsCreatingNewWorkoutPlan = JSON.stringify(error)
          return errorsAndSuccess
        }
        workoutPEIDs.push(data[0].PEID)
      }
      // possible exercise already exists
    }
    // return res.status(200).json({mssg: "Step 2 done!"})

    // 3. Create a record in WorkoutPlansWithExercises for each exercise in the workoutplan.

    for (let j = 0; j < workoutPEIDs.length; j++) {
      const { error }: any = await databaseQuery.insert(supabase, 'WorkoutPlansWithExercises', { WorkoutPlanID: workoutPlanID, PEID: workoutPEIDs[j] })
      if (error) {
        errorsAndSuccess.errorsCreatingNewWorkoutPlan = JSON.stringify(error)
        return errorsAndSuccess
      }
    }
    errorsAndSuccess.success = true
    return errorsAndSuccess
  }
}
