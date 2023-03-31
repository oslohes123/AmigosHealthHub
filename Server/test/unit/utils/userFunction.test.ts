import test from 'ava'
import { type ExecutionContext } from 'ava'
import supabase from '../../../utils/General/supabaseSetUp'
import { createUser, getUserByEmail, deleteUserRow } from '../../../utils/User/userFunctions'
import { type UserInterface } from '../../../utils/General/userInterface'

const user: UserInterface = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'jane.doe@example.com',
  password: 'Password123!',
  age: 30
}
test.serial('createUser with invalid parameters results in error', async (t: ExecutionContext) => {
  const { error } = await createUser(user, supabase, 'INCORRECT_TABLE_NAME')
  const { data } = await getUserByEmail(user.email, 'firstName, lastName, email, password, age')
  t.true(error !== null)
  t.true(data.length === 0)
})

test.serial('createUser with valid informationToInsert results in user created', async (t: ExecutionContext) => {
  await createUser(user)
  const { data } = await getUserByEmail(user.email, 'firstName, lastName, email, password, age')

  if (data.length === 0) t.fail('Failed either due to error or user was not created')
  const { error } = await deleteUserRow(user.email)
  if (error) t.fail('Error deleting user row!')
  t.true(JSON.stringify(data[0]) === JSON.stringify(user))
})

export {}
