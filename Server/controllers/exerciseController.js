function exerciseMainPage(req,res){
    res.send("Exercise Page");
}
function addWorkout(req, res){
    res.send("Add Workout Page")
}
function savedWorkouts(req, res){
    res.send("Saved Workouts Page")
}


module.exports.exerciseMainPage = exerciseMainPage;
module.exports.addWorkout = addWorkout;
module.exports.savedWorkouts = savedWorkouts;