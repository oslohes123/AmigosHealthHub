import app from '../../../index'
import test from 'ava'
import { type ExecutionContext } from 'ava'
import request from 'supertest'
import { v4 as uuidv4 } from 'uuid'
import { createUserWithID, deleteUserRow, createHashedPassword, createToken } from '../../../utils/userFunctions'
import cloneDeep from 'lodash/cloneDeep'
import RouteNamesClass from '../../../utils/routeNamesClass'
import { deleteAllWorkoutPlansWithExercises } from '../../../utils/Exercise/deleteWorkoutPlans'
import { matchWorkoutPlanAndUser } from '../../../utils/Exercise/exerciseFunctions'
import setUpWorkoutPlan from '../../../utils/Exercise/setUpWorkoutPlanForTests'
const routeNames = new RouteNamesClass()
const deleteWorkoutPlanRoute = routeNames.fullDeleteWorkoutURL

let token: string
let randomEmail: string
const uuid = uuidv4()
test.before(async (t: ExecutionContext) => {
  randomEmail = `${uuid}@gmail.com`

  const hashedPassword = await createHashedPassword('CorrectPassword123!')

  const { error }: any = await createUserWithID({
    id: uuid,
    firstName: 'Jane',
    lastName: 'Doe',
    email: randomEmail,
    password: hashedPassword,
    age: 20
  })

  if (error) {
    t.fail('Inserting user went wrong!')
  }
  token = createToken(uuid)
})

test.after.always('guaranteed cleanup of user and delete exercises', async (t: ExecutionContext) => {
  const { errorPresent } = await deleteAllWorkoutPlansWithExercises(uuid)
  if (errorPresent) {
    t.fail(errorPresent)
  }
  const { error } = await deleteUserRow(randomEmail)
  if (error) {
    t.fail(`deleteUserRow of ${randomEmail} failed`)
  }
})

interface deleteWorkoutPlanRequest {
  userid?: string
  workoutname?: string
}
const validRequest: deleteWorkoutPlanRequest = {
  userid: uuid,
  workoutname: 'Test Track Workout Name'
}

test('deleteWorkoutPlanRoute is correct', (t: ExecutionContext) => {
  t.true(deleteWorkoutPlanRoute === '/api/user/workout/delete')
})
test.serial(`DELETE ${deleteWorkoutPlanRoute} results in error when userid is missing`, async (t: ExecutionContext) => {
  const invalidReqWithNouserid = cloneDeep(validRequest)
  delete invalidReqWithNouserid.userid
  const response = await request(app)
    .delete(deleteWorkoutPlanRoute)
    .set({ authorization: token })
    .send({ ...invalidReqWithNouserid })
  t.true(response.status === 400)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})

test.serial(`DELETE ${deleteWorkoutPlanRoute} results in error when workoutname is missing`, async (t: ExecutionContext) => {
  const invalidReqWithNoWorkoutname = cloneDeep(validRequest)
  delete invalidReqWithNoWorkoutname.workoutname
  const response = await request(app)
    .delete(deleteWorkoutPlanRoute)
    .set({ authorization: token })
    .send({ ...invalidReqWithNoWorkoutname })
  t.true(response.status === 400)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})

test.serial(`DELETE ${deleteWorkoutPlanRoute} with non-existent workoutplan results in error`, async (t: ExecutionContext) => {
  const response = await request(app)
    .delete(deleteWorkoutPlanRoute)
    .set({ authorization: token })
    .send({ ...validRequest })
  t.true(response.status === 400)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'User does not have a plan of that name!' }))
})

test.serial(`DELETE ${deleteWorkoutPlanRoute} with valid workout plan results in success`, async (t: ExecutionContext) => {
  const nameOfWorkout = 'Test Cannot create a Workoutplan with same name'
  const { errorsSettingUpWorkoutPlan, success } = await setUpWorkoutPlan(uuid, nameOfWorkout)
  if (errorsSettingUpWorkoutPlan || !success) {
    t.fail(errorsSettingUpWorkoutPlan)
  }
  const validReqWithDiffWorkoutName = cloneDeep(validRequest)
  validReqWithDiffWorkoutName.workoutname = nameOfWorkout
  const response = await request(app)
    .delete(deleteWorkoutPlanRoute)
    .set({ authorization: token })
    .send({ ...validReqWithDiffWorkoutName })
  const { dataMatchingWorkoutPlanAndUser, errorMatchingWorkoutPlanAndUser } = await matchWorkoutPlanAndUser(uuid, nameOfWorkout)
  if (errorMatchingWorkoutPlanAndUser) {
    t.fail('matchWorkoutPlanAndUser failed!')
  }

  t.true(response.status === 200)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: `Workout Plan ${String(nameOfWorkout)} Deleted!` }))
  t.true(dataMatchingWorkoutPlanAndUser.length === 0)
})
