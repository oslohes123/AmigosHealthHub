import createNewWorkoutPlan from './createNewWorkoutPlan'

export default async function setUpWorkoutPlan (userid: string, workoutname: string) {
  const errorsAndSuccessSettingUpWorkoutPlan: any = { errorsSettingUpWorkoutPlan: '', success: false }
  const exercises = {
    exercises: [
      {
        sets: null,
        weight: null,
        warmUpSet: false,
        reps: null,
        calories: '50',
        distance: '5000',
        duration: '60',
        name: 'Jog',
        muscle: 'Legs',
        difficulty: 'Beginner',
        instructions: '',
        equipment: 'body_only',
        type: 'cardio'
      }
    ]
  }
  const { errorsCreatingNewWorkoutPlan, success } = await createNewWorkoutPlan(userid, workoutname, exercises)
  if (!success || errorsCreatingNewWorkoutPlan) {
    errorsAndSuccessSettingUpWorkoutPlan.errorsSettingUpWorkoutPlan = errorsAndSuccessSettingUpWorkoutPlan
    errorsAndSuccessSettingUpWorkoutPlan.success = false
    return errorsAndSuccessSettingUpWorkoutPlan
  }
  errorsAndSuccessSettingUpWorkoutPlan.success = true
  return errorsAndSuccessSettingUpWorkoutPlan
}
