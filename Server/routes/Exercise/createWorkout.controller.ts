import { type Request, type Response } from 'express'
// import supabase from '../../utils/supabaseSetUp'
// import { SupabaseQueryClass } from '../../utils/databaseInterface'
import { schemaForCreateWorkoutJSON } from '../../utils/JSONSchemas/schemaForCreateWorkoutJSON'
import validateJSONSchema from '../../utils/JSONSchemas/validateJSONSchema'
import createNewWorkoutPlan from '../../utils/Exercise/createNewWorkoutPlan'
import { deleteWorkoutPlanRowByID, matchWorkoutPlanAndUser } from '../../utils/Exercise/exerciseFunctions'
// const databaseQuery = new SupabaseQueryClass()

export const deleteWorkoutPlan = async (req: Request, res: Response) => {
  const { userid, workoutname } = req.body
  if (!userid || !workoutname) {
    return res.status(400).json({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' })
  }

  // const { data, error }: any = await databaseQuery.match(supabase, 'WorkoutPlans', 'WorkoutPlanID', { userid, workoutname })
  const { dataMatchingWorkoutPlanAndUser, errorMatchingWorkoutPlanAndUser } = await matchWorkoutPlanAndUser(userid, workoutname)
  if (errorMatchingWorkoutPlanAndUser) {
    return res.status(400).json({ mssg: 'Something went wrong!', dev: errorMatchingWorkoutPlanAndUser })
  }
  if (dataMatchingWorkoutPlanAndUser.length === 0) {
    return res.status(400).json({ mssg: 'User does not have a plan of that name!' })
  }
  const workoutPlanToDel = dataMatchingWorkoutPlanAndUser[0].WorkoutPlanID

  const { deleteError } = await deleteWorkoutPlanRowByID(workoutPlanToDel)
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
    return res.status(400).json({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' })
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
