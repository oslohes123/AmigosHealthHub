const port = process.env.PORT;
const ipaddress = process.env.IP_ADDRESS;
function APIcallToArray(data){
    var result = JSON.parse(data);
    var arr = [];
    var temp = "";
    for (var i = 0; i < result.length; i++){
        temp = result[i];
        arr[i] = temp;
    }
    return arr
}
async function APItodatabase(data){
    const {data: insertData, error: insertError} = await supabaseQuery.insert(supabase, "Exercises", {Type: APIcallToArray(resjson)[1], Name:name, Muscle:APIcallToArray(resjson)[2], Difficulty: APIcallToArray(resjson)[4], Instructions: APIcallToArray(resjson[5])});
    if(insertError) console.error(insertError);
    else console.log({insertData})
}


async function searchDB(name){
    const supabase = require('../dist/utils/supabaseSetUp.js');
    const supabaseQueryClass = require('../dist/utils/databaseInterface.js');
    const supabaseQuery = new supabaseQueryClass()
    const {data,error} = await supabaseQuery.findrow(supabase, "Exercises", "Name", name); //search Supabase database for exercise
    if(error) return null;
    // console.error(error)
    else if (data != null){
        console.log({data});
        //return info on exercise
        return data
    }
    else {
        const res = await fetch(`https://api.api-ninjas.com/v1/exercises?name=${name}`, {
            method: 'GET',
            headers: {
                'X-Api-key': 'MJIJot8zJvjqN881cfM7/A==uUVjsJou0izgtlB5',
                'Content-Type': 'application/json'
            }      
        })
        if (res.ok){
        const resjson = await res.json()
        APItodatabase(resjson)
        return resjson
        }
        else{
            return {mssg: "The request for the Exercise API failed"}
        }
//         req.get({
//         url: `https://api.api-ninjas.com/v1/exercises?name=${name}`, //API call
//         headers: {
//     'X-Api-Key': 'YOUR_API_KEY'
//   },
}
}

async function workoutPlanNameFind(name){
    const supabase = require('../dist/utils/supabaseSetUp.js');
    const supabaseQueryClass = require('../dist/utils/databaseInterface.js');
    const supabaseQuery = new supabaseQueryClass()
    const {data,error} = await supabaseQuery.findrow(supabase, "WorkoutPlans", "WorkoutPlanName", name); //search Supabase database for exercise
    if(error) console.error(error);
    else if (data != null){
        console.log({data});
        //return info on exercise
        return data
    }
    else return {mssg: "This name has not been saved"}
}

// async function trackedWorkoutsnNameFind(name){
//     const supabase = require('../dist/utils/supabaseSetUp.js');
//     const supabaseQueryClass = require('../dist/utils/databaseInterface.js');
//     const supabaseQuery = new supabaseQueryClass()
//     const {data,error} = await supabaseQuery.findrow(supabase, "CompleteWorkouts", "WorkoutPlanName", name); //search Supabase database for exercise
//     if(error) console.error(error);
//     else if (data != null){
//         console.log({data});
//         //return info on exercise
//         return data
//     }
//     else return {mssg: "This name has not been saved"}
// }

async function trackOneExercise(req, res){
    const supabase = require('../dist/utils/supabaseSetUp.js');
    const supabaseQueryClass = require('../dist/utils/databaseInterface.js');
    const supabaseQuery = new supabaseQueryClass()
    const {data: insertData, error: insertError} = await supabaseQuery.insert(supabase, "Completed Workouts", {Reps: req.reps, Sets: req.sets, Duration: req.duration, Distance: req.distance});
    if(insertError) {
        console.error(insertError);
        return {mssg: "Tracking exercise failed"}
    }
    else console.log({insertData})
    return res.json({'search': insertData})
}

async function addTrackedWorkout(name, type, muscle, difficulty, instructions){
    const supabase = require('../dist/utils/supabaseSetUp.js');
    const supabaseQueryClass = require('../dist/utils/databaseInterface.js');
    const supabaseQuery = new supabaseQueryClass()
    const {data: insertData, error: insertError} = await supabaseQuery.insert(supabase, "Completed Workouts", {Type: type, Name:name, Muscle:muscle, Difficulty: difficulty, Instructions: instructions});
    if(insertError) console.error(insertError);
    else console.log({insertData})
    return insertData
    // do a for loop here
}




//   function(error, response, body) {
//     if(error) return console.error('Request failed:', error);
//     else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
//     else console.log(body)
// });



//for (var i = 0; i < dict.length-1; i++) {
//    if dict[i] 
//}

    //const { data, error } = await supabase
   // .select('CompleteWorkoutsID')
 //   .eq('CompleteWorkoutsID(count)', 1) 
//if(error) console.error(error);
//else{
//console.log({data});
    
//    return data
//}
//}


function addExercise(req, res, data){
    if (data == null){
        return {mssg: 'We cannot add this exercise.'}
    }
    else{
    const workoutlist = req.body.workout
    return res.json(workoutlist.push(data))
    }
}



function getOccurrences(arr, v){
    var count = 0;
    arr.forEach((elem) => (elem === v && count++));
    return count;
}

// function returnexercises(data){
//     const ids = []
//     const finalIDs = []
//     var count = 0
//     var result = JSON.stringify(data).split('},');
//     for (const prop in result) {
//         ids.push(prop[0])
//     }
//     for (const id in ids) {
//         if (this.getOccurrences(ids, id) == 1){
//             finalIDs.push(id)
//         }
//     }
//     for (const elem in result){
//         if (finalIDs.includes(elem[0])){
//             // do nothing
//         }
//         else{
//             result.pop(0)
//         }
//         count ++ 
// //     }
//     let answer = result.toString
//     return JSON.parse(answer)
// }

function mostRecentData(){
    const supabase = require('../dist/utils/supabaseSetUp.js');
    const supabaseQueryClass = require('../dist/utils/databaseInterface.js');
    const supabaseQuery = new supabaseQueryClass()
    const {data, error} = supabaseQuery.mostRecent(supabase)
    if (data){
        return JSON.stringify(data)
    }
    else{
        return {mssg: "This is not possible. Maybe add some more workouts"}
    }
}

async function addCustomExercise(req, res){
    const supabase = require('../dist/utils/supabaseSetUp.js');
    const supabaseQueryClass = require('../dist/utils/databaseInterface.js');
    const supabaseQuery = new supabaseQueryClass()
    const {data: insertData, error: insertError} = await supabaseQuery.insert(supabase, "Exercises", {Type: req.type, Name:req.name, Muscle:req.muscle, Difficulty: req.difficulty, Instructions: req.instructions});
    if(insertError) console.error(insertError);
    else console.log({insertData})
    return res.json({'search': insertData})
}

function searchExercise(req, res){
    var isValid = true
    if (searchDB(req.body.exercise) == null){
        isValid = false
    }
    if(isValid){
        res.send(searchDB(req.body.exercise))
    }
    else{
        res.json('Input a valid exercise')
    }
}


function fitnessMainPage(req,res){
    return res.status(200).json({'mssg': "Fitness Page. Over here you can track a single exercise or create a workout plan."})
}
function trackExercises(req, res){
    return res.status(200).json({'mssg': "Track Exercises. Over here you can track a single exercise.", 'display': mostRecentData(), 'search': searchExercise(req, res), 'addEx': addCustomExercise(req, res), 'track': trackOneExercise(req, res)})
}
function workoutPlans(req, res){
    return res.status(200).json({'mssg': 'Workout Plans. Over here you can access your own workout plans.', 'search': workoutPlanNameFind(req.body.name), 'addEx': addExercise(req, res, searchExercise(req, res)), 'workoutlist':req.body.workoutlist})    
}





module.exports.fitnessMainPage = fitnessMainPage;
module.exports.trackExercises = trackExercises;
module.exports.workoutPlans = workoutPlans;
module.exports.getOccurrences = getOccurrences;
// module.exports.returnexercises = returnexercises;