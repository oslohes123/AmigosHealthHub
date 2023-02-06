async function checkDB(){
    const supabase = require('../dist/utils/supabaseSetUp.js');
    const supabaseQuery = require('../dist/utils/databaseInterface.js');
    const checker = new supabaseQuery()
    const {data,error} = await checker.select(supabase, "Exercises", {Type:"Cardio", Name:"Run", Muscle:"", Difficulty:"Advanced", Instructions:"Run"}, "Muscle","");
    if(error) console.error(error);
    else if (data == ""){
        //API CALL
    }
    else{
        console.log({data});
        //Run Exercise
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