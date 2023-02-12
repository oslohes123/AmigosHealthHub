async function searchDB(){
    const supabase = require('../dist/utils/supabaseSetUp.js');
    const supabaseQuery = require('../dist/utils/databaseInterface.js');
    const checker = new supabaseQuery()
    var name = 'Incline Hammer Curls'; //input from search bar
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
    const {data,error} = await checker.insert(supabase, "Exercises", {Type:"Weight", Name:name, Muscle:"biceps", Difficulty:"Advanced", Instructions:"Run"});
    if(error) console.error(error);
    else console.log({data})
    }
    return data
}
function addExercise(){

}
function getOccurrence(arr, v) {
    var count = 0;
    arr.forEach((elem) => (elem === v && count++));
    return count;
}
async function returnexercises(data){
    const ids = []
    const finalIDs = []
    var result = JSON.parse(data);
    for (const prop in result) {
        ids.push(prop["CompleteWorkoutID"])
    }
    for (const id in ids) {
        if (getOccurrence(ids, id) == 1){
            finalIDs.push(id)
        }
    }
    for (const elem in result){
        if (finalIDs.includes(elem["CompleteWorkoutID"])){
            pass
        }
        else{
            result.delete(elem)
        }
    }
    return JSON.stringify(result)
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
async function mostRecent(){
    const { data, error } = await supabase
        .from('CompleteWorkouts')
        .select('CompleteWorkoutsID', 'Timestamp')
        .order('Timestamp', { ascending: false })
        .range(0, 4)
    if(error) console.error(error);
    else{
    console.log({data});
        
        return data
    }
}
function fitnessMainPage(req,res){
    res.send("Fitness Page");
}
function trackExercises(req, res){
    res.send("Track Exercises")
}
function workoutPlans(req, res){
    res.send("Workout Plans")
}


module.exports.fitnessMainPage = fitnessMainPage;
module.exports.trackExercises = trackExercises;
module.exports.workoutPlans = workoutPlans;