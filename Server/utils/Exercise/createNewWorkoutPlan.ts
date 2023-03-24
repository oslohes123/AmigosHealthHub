// /**
//  * Inserts a workoutplan for a user
//  */

// export async function createNewWorkoutPlan (userid: string, workoutname: string, exercises: any) {
//   // Add the exerciseID and userid of the exercise to each exercise object's property
//   exercises = exercises.exercises
//   for (let i = 0; i < exercises.length; i++) {
//     try {
//       const { type, name, muscle, difficulty, instructions, equipment } = exercises[i]
//       //  const propertiesOfExercise= Object.keys(exercises[i]);
//       //  for(let k = 0; k<propertiesOfExercise.length; k++){

//       //  }
//       // check if exercises has all of the destructured properties above and make sure name is not the empty string
//       if (!(Object.prototype.hasOwnProperty.call(exercises[i], 'type')) || !(Object.prototype.hasOwnProperty.call(exercises[i], 'name')) || !(Object.prototype.hasOwnProperty.call(exercises[i], 'muscle')) || !(Object.prototype.hasOwnProperty.call(exercises[i], 'difficulty')) || !(Object.prototype.hasOwnProperty.call(exercises[i], 'equipment')) || !(Object.prototype.hasOwnProperty.call(exercises[i], 'instructions'))) {
//         return res.status(400).json({ mssg: "Exercise doesn't have one of the following properties:type, name, muscle, difficulty, equipment" })
//       }
//       console.log(`exercises[i] before delete for: ${JSON.stringify(exercises[i])}`)

//       Object.keys(exercises[i]).forEach((k) => (exercises[i])[k] == null && delete (exercises[i])[k])
//       console.log(`exercises[i] after delete for:  ${JSON.stringify(exercises[i])}`)
//       const { errorPresent, ID } = await addExerciseToExercises(type, name, muscle, difficulty, instructions, equipment)
//       if (errorPresent) {
//         console.log(`errorPresent: ${errorPresent}`)
//         return res.status(400).json({ mssg: errorPresent, error: 'error' })
//       }
//       else {
//         exercises[i].exerciseID = ID
//         exercises[i].userID = userid
//         delete exercises[i].type
//         delete exercises[i].name
//         delete exercises[i].muscle
//         delete exercises[i].difficulty
//         delete exercises[i].instructions
//         delete exercises[i].equipment
//       }
//     }
//     catch (error) {
//       return res.status(400).json({ mssg: 'Failure', error })
//     }
//   }

//   console.log(`exercises after mod: ${JSON.stringify(exercises)}`)

//   // 1. Create a record in WorkoutPlans

//   const { data, error }: any = await databaseQuery.match(supabase, 'WorkoutPlans', '*', { userid, workoutname })
//   if (error) {
//     console.log(error)
//     return res.status(400).json({ mssg: 'Matching the WorkoutPlans table went wrong!', err: error })
//   }
//   if (data.length > 0) {
//     // A workout of the same name already belongs to the user
//     return res.status(400).json({ mssg: 'A workout of the same name already belongs to the user' })
//   }
//   else {
//     const { data, error }: any = await databaseQuery.insert(supabase, 'WorkoutPlans', { userid, workoutname })
//     if (error) {
//       return res.status(400).json({ mssg: 'Inserting into WorkoutPlans table went wrong!', err: error })
//     }
//     console.log(`ln30: ${JSON.stringify(data)}`)
//     const workoutPlanID = data[0].WorkoutPlanID

//     // 2. For each item in the array of exercises of the workout plan,before adding to PossibleExercise, query whether it’s in the table,  add to PossibleExercise

//     // Assuming that exercises is an array of JSON. eg. [{exercse: "bicep "}, {}], Each element must contain atleast some properties that allow it to be uniquely identified

//     const numberOfExercises = exercises.length
//     const workoutPEIDs = []
//     for (let i = 0; i < numberOfExercises; i++) {
//       // Check if exercises inputs are numbers!
//       if (exercises[i].calories && typeof (exercises[i].calories) === 'string' && !(eitherIsFloatOrInt(exercises[i].calories))) {
//         return res.status(400).json({ mssg: 'Make sure calories is a number!' })
//       }

//       if (exercises[i].sets && typeof (exercises[i].sets) === 'string' && !(eitherIsFloatOrInt(exercises[i].sets))) {
//         return res.status(400).json({ mssg: 'Make sure sets is a number!' })
//       }
//       if (exercises[i].reps && typeof (exercises[i].reps) === 'string' && !(eitherIsFloatOrInt(exercises[i].reps))) {
//         return res.status(400).json({ mssg: 'Make sure reps is a number!' })
//       }
//       if (exercises[i].weight && typeof (exercises[i].weight) === 'string' && !(eitherIsFloatOrInt(exercises[i].weight))) {
//         return res.status(400).json({ mssg: 'Make sure weight is a number!' })
//       }
//       if (exercises[i].distance && typeof (exercises[i].distance) === 'string' && !(eitherIsFloatOrInt(exercises[i].distance))) {
//         return res.status(400).json({ mssg: 'Make sure distance is a number!' })
//       }
//       if (exercises[i].duration && typeof (exercises[i].duration) === 'string' && !(eitherIsFloatOrInt(exercises[i].duration))) {
//         return res.status(400).json({ mssg: 'Make sure duration is a number!' })
//       }
//       // Check if exercises inputs are numbers!
//       const { data, error }: any = await databaseQuery.match(supabase, 'PossibleExercises', 'PEID', exercises[i])
//       console.log(`ln41: ${JSON.stringify(data)} `)
//       if (error) {
//         console.log(error)
//         return res.status(400).json({ mssg: 'createWorkout Failed!', err: error })
//       }

//       else if (data.length > 0) {
//         workoutPEIDs.push(data[0].PEID)
//       }
//       // if no possible exercise matches the one given, then insert into the table
//       else {
//         const { data, error }: any = await databaseQuery.insert(supabase, 'PossibleExercises', exercises[i])
//         if (error) {
//           console.log(error)
//           return res.status(400).json({ mssg: 'createWorkout Failed!', err: error })
//         }
//         workoutPEIDs.push(data[0].PEID)
//       }
//       // possible exercise already exists
//     }
//     // return res.status(200).json({mssg: "Step 2 done!"})

//     // 3. Create a record in WorkoutPlansWithExercises for each exercise in the workoutplan.

//     for (let j = 0; j < workoutPEIDs.length; j++) {
//       const { error }: any = await databaseQuery.insert(supabase, 'WorkoutPlansWithExercises', { WorkoutPlanID: workoutPlanID, PEID: workoutPEIDs[j] })
//       if (error) {
//         console.log(error)
//         return res.status(400).json({ mssg: 'Inserting into WorkoutPlansWithExercises failed!', err: error })
//       }
//     }

//     return res.status(200).json({ mssg: 'Workout Plan created!' })
//   }
// }
