import { type Request, type Response } from 'express'
import supabase from '../../utils/supabaseSetUp'
import { SupabaseQueryClass } from '../../utils/databaseInterface'
import { schemaForCreateWorkoutJSON } from '../../utils/JSONSchemas/schemaForCreateWorkoutJSON'
import validateJSONSchema from '../../utils/validateJSONSchema'
import addExerciseToExercises from '../../utils/Exercise/addExerciseToExercises'
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
  //    const {errorPresent} = await deleteWorkoutPlansWithExercisesByID(workoutPlanToDel);
  //    if(errorPresent){
  //     return res.status(400).json({mssg:"Fail to delete WorkoutPlanByID", errorPresent})
  //    }

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
  // Add the exerciseID and userid of the exercise to each exercise object's property
  for (let i = 0; i < exercises.length; i++) {
    try {
      const { type, name, muscle, difficulty, instructions, equipment } = exercises[i]

      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      Object.keys(exercises[i]).forEach((k) => (exercises[i])[k] == null && delete (exercises[i])[k])
      console.log(`exercises[i] after delete for:  ${JSON.stringify(exercises[i])}`)
      const { errorPresent, ID } = await addExerciseToExercises(type, name, muscle, difficulty, instructions, equipment)
      if (errorPresent) {
        console.log(`errorPresent: ${errorPresent}`)
        return res.status(400).json({ mssg: errorPresent, error: 'error' })
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
      return res.status(400).json({ mssg: 'Failure', error })
    }
  }

  console.log(`exercises after mod: ${JSON.stringify(exercises)}`)

  // 1. Create a record in WorkoutPlans

  const { data, error }: any = await databaseQuery.match(supabase, 'WorkoutPlans', '*', { userid, workoutname })
  if (error) {
    console.log(error)
    return res.status(400).json({ mssg: 'Matching the WorkoutPlans table went wrong!', err: error })
  }
  if (data.length > 0) {
    // A workout of the same name already belongs to the user
    return res.status(400).json({ mssg: 'A workout of the same name already belongs to the user' })
  }
  else {
    const { data, error }: any = await databaseQuery.insert(supabase, 'WorkoutPlans', { userid, workoutname })
    if (error) {
      return res.status(400).json({ mssg: 'Inserting into WorkoutPlans table went wrong!', err: error })
    }
    console.log(`ln30: ${JSON.stringify(data)}`)
    const workoutPlanID = data[0].WorkoutPlanID

    // 2. For each item in the array of exercises of the workout plan,before adding to PossibleExercise, query whether it’s in the table,  add to PossibleExercise

    // Assuming that exercises is an array of JSON. eg. [{exercse: "bicep "}, {}], Each element must contain atleast some properties that allow it to be uniquely identified

    const numberOfExercises = exercises.length
    const workoutPEIDs = []
    for (let i = 0; i < numberOfExercises; i++) {
      // Check if exercises inputs are numbers!
      const { data, error }: any = await databaseQuery.match(supabase, 'PossibleExercises', 'PEID', exercises[i])
      console.log(`ln41: ${JSON.stringify(data)} `)
      if (error) {
        console.log(error)
        return res.status(400).json({ mssg: 'createWorkout Failed!', err: error })
      }

      else if (data.length > 0) {
        workoutPEIDs.push(data[0].PEID)
      }
      // if no possible exercise matches the one given, then insert into the table
      else {
        const { data, error }: any = await databaseQuery.insert(supabase, 'PossibleExercises', exercises[i])
        if (error) {
          console.log(error)
          return res.status(400).json({ mssg: 'createWorkout Failed!', err: error })
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
        console.log(error)
        return res.status(400).json({ mssg: 'Inserting into WorkoutPlansWithExercises failed!', err: error })
      }
    }

    return res.status(200).json({ mssg: 'Workout Plan created!' })
  }
}
