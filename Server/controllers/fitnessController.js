const supabase = require('../dist/utils/supabaseSetUp.js');

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
async function searchDB(name){
    const supabase = require('../dist/utils/supabaseSetUp.js');
    const supabaseQueryClass = require('../dist/utils/databaseInterface.js');
    const supabaseQuery = new supabaseQueryClass()
    const {data,error} = await checker.findrow(supabase, "Exercises", "Name", name); //search Supabase database for exercise
    if(error) console.error(error);
    else if (data != null){
        console.log({data});
        //return info on exercise
        return data
    }
    else {
        const req = require('req');

        req.get({
        url: 'https://api.api-ninjas.com/v1/exercises?name=' + name, //API call
        headers: {
    'X-Api-Key': 'YOUR_API_KEY'
  },
},
  function(error, response, body) {
    if(error) return console.error('Request failed:', error);
    else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
    else console.log(body)
});
    const {data: insertData, error: insertError} = await supabaseQuery.insert(supabase, "Exercises", {Type: APIcallToArray(data)[1], Name:name, Muscle:APIcallToArray(data)[2], Difficulty: APIcallToArray(data)[4], Instructions: APIcallToArray(data[5])});
    if(insertError) console.error(insertError);
    else console.log({insertData})
    }
    return data
}


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

const workout = []
function addExercise(data){
    workout.push(data)
}

function getOccurrences(arr, v){
    var count = 0;
    arr.forEach((elem) => (elem === v && count++));
    return count;
}

function returnexercises(data){
    const ids = []
    const finalIDs = []
    var count = 0
    var result = JSON.stringify(data).split('},');
    for (const prop in result) {
        ids.push(prop[0])
    }
    for (const id in ids) {
        if (this.getOccurrences(ids, id) == 1){
            finalIDs.push(id)
        }
    }
    for (const elem in result){
        if (finalIDs.includes(elem[0])){
            // do nothing
        }
        else{
            result.pop(0)
        }
        count ++ 
    }
    let answer = result.toString
    return JSON.parse(answer)
}

function mostRecentData(){
    const {data, error} = supabaseQuery.mostRecent(supabase)
    if (data){
        return returnexercises(data)
    }
    else{
        return {mssg: "This is not possible. Maybe add some more workouts"}
    }
}

function fitnessMainPage(req,res){
    res.send("Fitness Page")
    res.send("Over here you can track a single exercise or create a workout plan.")
}
function trackExercises(req, res){
    res.send("Track Exercises")
    res.send("Select a single exercise to track")
    res.json(mostRecentData)
}
function workoutPlans(req, res){
    res.send("Workout Plans")
    addExercise(searchExercise(req, res))
}
function searchExercise(req, res){
    var isValid = true
    if (searchDB(req.exercise) == error){
        isValid = false
    }
    if(isValid){
        res.send(searchDB(req.exercise))
    }
    else{
        res.send("Input a valid exercise")
    }
}




module.exports.fitnessMainPage = fitnessMainPage;
module.exports.trackExercises = trackExercises;
module.exports.workoutPlans = workoutPlans;
module.exports.getOccurrences = getOccurrences;
module.exports.returnexercises = returnexercises;