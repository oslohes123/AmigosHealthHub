import { type Request, type Response } from 'express'
import supabase from '../../utils/supabaseSetUp'
import { SupabaseQueryClass } from '../../utils/databaseInterface'
import { schemaForCreateWorkoutJSON } from '../../utils/JSONSchemas/schemaForCreateWorkoutJSON'
import validateJSONSchema from '../../utils/validateJSONSchema'
import createNewWorkoutPlan from '../../utils/Exercise/createNewWorkoutPlan'
const databaseQuery = new SupabaseQueryClass()
const deleteWorkoutPlanByID = async (workoutPlanID: string) => {
  const errorAndIDs = { deleteError: '' }
  const { error }: any = await databaseQuery.deleteFrom(supabase, 'WorkoutPlans', 'WorkoutPlanID', workoutPlanID)
  if (error) {
    errorAndIDs.deleteError = error
    return errorAndIDs
  }
  return errorAndIDs
}

export const deleteWorkoutPlan = async (req: Request, res: Response) => {
  const { userid, workoutname } = req.body
  if (!userid || !workoutname) {
    return res.status(400).json({ mssg: 'Either userid or workoutname is missing!' })
  }

  const { data, error }: any = await databaseQuery.match(supabase, 'WorkoutPlans', 'WorkoutPlanID', { userid, workoutname })
  if (error) {
    return res.status(400).json({ mssg: error })
  }
  if (data.length === 0) {
    return res.status(400).json({ mssg: 'User does not have a plan of that name!' })
  }
  const workoutPlanToDel = data[0].WorkoutPlanID

  const { deleteError } = await deleteWorkoutPlanByID(workoutPlanToDel)
  if (deleteError) {
    return res.status(400).json({ mssg: 'Fail to delete WorkoutPlanByID', deleteError })
  }
  else {
    return res.status(200).json({ mssg: `Workout Plan ${String(workoutname)} Deleted!` })
  }
}
/**
 * Creates a WorkoutPlan, adds each exercise to PossibleExercises and adds
 * multiple records to WorkoutPlansWithExercises
 *
 * exercises should be an array of objects containing userid and other properties specific to an exercise
 */

// Array of objects where each exercise will have the properties type,name,muscle, difficulty, instructions, equipment,
// and sets, reps, possible exercise data.
// Workoutname
// Empty string
export const createWorkout = async (req: Request, res: Response) => {
  const { userid, workoutname, exercises } = req.body
  if (!validateJSONSchema(req.body, schemaForCreateWorkoutJSON)) {
    return res.status(400).json({ mssg: 'Something went wrong!', dev: 'req.body does not match the JSON Schema!' })
  }
  const { errorsCreatingNewWorkoutPlan, success }: any = await createNewWorkoutPlan(userid, workoutname, { exercises })
  if (errorsCreatingNewWorkoutPlan) {
    return res.status(400).json({ mssg: 'Something went wrong!', dev: errorsCreatingNewWorkoutPlan })
  }
  if (!success) {
    return res.status(400).json({ mssg: 'A workout of the same name already belongs to the user' })
  }
  return res.status(200).json({ mssg: 'Successfully created a workout plan!' })
}
