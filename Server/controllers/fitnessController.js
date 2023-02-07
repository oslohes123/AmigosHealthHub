async function searchDB(){
    const supabase = require('../dist/utils/supabaseSetUp.js');
    const supabaseQuery = require('../dist/utils/databaseInterface.js');
    const checker = new supabaseQuery()
    var name = 'Incline Hammer Curls';
    const {data,error} = await checker.select(supabase, "Exercises", "Name");
    if(error) console.error(error);
    else if (data.includes(name)){
        console.log({data});
        //Run Exercise
    }
    else {
        const req = require('req');

        req.get({
        url: 'https://api.api-ninjas.com/v1/exercises?name=' + name,
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