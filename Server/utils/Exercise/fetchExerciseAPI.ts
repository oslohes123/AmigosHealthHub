import { config } from 'dotenv'
config()
const EXERCISE_API_KEY = process.env.EXERCISE_API_KEY as string

export default async function searchAPIForExercise (wordtosearch: string | string[]) {
  const nameFitnessURL = 'https://api.api-ninjas.com/v1/exercises?name=' + String(wordtosearch)
  const response = await fetch(
    nameFitnessURL,
    {
      method: 'GET',
      headers: { 'X-Api-Key': EXERCISE_API_KEY }
    })
  return response
}
