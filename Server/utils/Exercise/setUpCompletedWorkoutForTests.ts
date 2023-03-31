import { insertMultipleExercises } from './insertAndDeleteMultipleExercises'
import { addCompletedWorkoutUnit } from './createNewTrackedWorkout'
import { getTimeStamp } from '../General/convertTimeStamptz'
export function getExercisesForTests (uuid: string) {
  return {
    exercises: [
      {
        name: `Test Curl ${uuid}`,
        sets: 3,
        weight: [12, 12, 12],
        warmUpSet: false,
        reps: [12, 6, 5],
        calories: 500,
        distance: null,
        duration: null
      },
      {
        name: `Slow Jog ${uuid}`,
        sets: null,
        weight: null,
        warmUpSet: 'false',
        reps: null,
        calories: 500,
        distance: 5000,
        duration: 23.00
      }
    ]
  }
}

export function exercisesToInsert (uuid: string) {
  const exercises = [
    { type: 'strength', name: `Test Curl ${uuid}`, muscle: 'bicep', difficulty: 'beginner', instructions: 'curl the weight', equipment: 'dumbbell' },
    { type: 'cardio', name: `Slow Jog ${uuid}`, muscle: 'legs', difficulty: 'beginner', instructions: 'jog', equipment: 'none' }]
  return exercises
}
// set up for a completed workout in tests
export async function setUpCompletedWorkoutForTests (uuid: string, nameOfWorkout: string = 'Test Tracked Workout', timestamp: string = getTimeStamp()) {
  const exercises = exercisesToInsert(uuid)
  const exerciseWorkouts = getExercisesForTests(uuid)
  const resultOfSetUpCompletedWorkoutForTests = { errorSetUpCompletedWorkoutForTests: '', successSetUpCompletedWorkoutForTests: false }
  const { errorInsertingMultipleExercises } = await insertMultipleExercises(exercises)

  if (errorInsertingMultipleExercises) {
    resultOfSetUpCompletedWorkoutForTests.errorSetUpCompletedWorkoutForTests = errorInsertingMultipleExercises
    return resultOfSetUpCompletedWorkoutForTests
  }
  const { errorAddCompletedWorkouts, success } = await addCompletedWorkoutUnit(uuid, nameOfWorkout, exerciseWorkouts, timestamp)
  if (errorAddCompletedWorkouts) {
    resultOfSetUpCompletedWorkoutForTests.errorSetUpCompletedWorkoutForTests = errorAddCompletedWorkouts
    return resultOfSetUpCompletedWorkoutForTests
  }
  if (!success) {
    return resultOfSetUpCompletedWorkoutForTests
  }
  resultOfSetUpCompletedWorkoutForTests.successSetUpCompletedWorkoutForTests = true
  return resultOfSetUpCompletedWorkoutForTests
}
