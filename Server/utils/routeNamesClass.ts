export default class RouteNamesClass{

    // All Base Routes
    readonly userBaseURL = '/api/user'
    readonly changeDetailsBaseURL = this.userBaseURL + '/changeProfileDetails'
    readonly exerciseBaseURL = this.userBaseURL + '/exercise'
    readonly workoutBaseURL = this.userBaseURL + '/workout'
    readonly caloriesBaseURL = this.workoutBaseURL + '/calories'
    readonly completedWorkoutBaseURL = this.userBaseURL + '/completedWorkouts'
    // Auth Routes
    readonly partialSignupURL = '/sign_up';
    readonly partialLoginURL = '/login';

    readonly fullSignupURL = this.userBaseURL + this.partialSignupURL;
    readonly fullLoginURL = this.userBaseURL + this.partialLoginURL;

    //Change Profile Routes
     
    readonly partialChangeStatsURL = '/stats';
    readonly partialChangePasswordURL = '/password';
    readonly partialDeleteAccountURL = '/deleteAccount';

    readonly fullChangeStatsURL = this.changeDetailsBaseURL + this.partialChangeStatsURL;
    readonly fullChangePasswordURL = this.changeDetailsBaseURL + this.partialChangePasswordURL;
    readonly fullDeleteAccountURL = this.changeDetailsBaseURL + this.partialDeleteAccountURL;
    
    // Check Initial Token Route

    readonly partialCheckInitialTokenURL = '/checkInitialToken';
    readonly fullCheckInitialTokenURL = this.userBaseURL + this.partialCheckInitialTokenURL;

    //  Get Info Route
    readonly partialGetInfoURL = '/getInfo';
    readonly fullGetInfoURL = this.userBaseURL + this.partialGetInfoURL;

    //Exercise And Workout Routes

        //Exercise Routes
            readonly partialSearchExercise = '/search';
            readonly fullSearchExerciseURL = this.exerciseBaseURL + this.partialSearchExercise;
            readonly partialAddToExercises = '/add';
            readonly fullAddToExercisesURL = this.exerciseBaseURL + this.partialAddToExercises;
            readonly partialGetExercise = '/get';
            readonly fullGetExerciseURL = this.exerciseBaseURL + this.partialAddToExercises;
            readonly partialGetExerciseHistory = '/history';
            readonly fullGetExerciseHistoryURL = this.exerciseBaseURL + this.partialGetExerciseHistory;
            readonly partialGetAllExercises = '/getAll';
            readonly fullGetAllExercisesURL = this.exerciseBaseURL + this.partialGetAllExercises;
        //Workout Routes
            readonly partialAddWorkout = '/add';
            readonly fullAddWorkoutURL = this.workoutBaseURL + this.partialAddWorkout;
            readonly partialGetWorkout = '/get';
            readonly fullGetWorkoutURL = this.workoutBaseURL + this.partialGetWorkout;
            readonly partialDeleteWorkout = '/delete';
            readonly fullDeleteWorkoutURL = this.workoutBaseURL + this.partialDeleteWorkout;
            readonly partialGetAllWorkoutNames = '/getAllWorkoutNames';
            readonly fullGetAllWorkoutNames = this.workoutBaseURL + this.partialGetAllWorkoutNames;
        
        //Calories Routes
        readonly partialGetCaloriesToday = '/getToday';
        readonly fullGetCaloriesToday = this.caloriesBaseURL + this.partialGetCaloriesToday;
            
        
        //Completed Workouts Routes
        readonly partialgetCompletedWorkout = '/get';
        readonly fullGetCompletedWorkoutURL = this.completedWorkoutBaseURL + this.partialgetCompletedWorkout;
        readonly partialGetAllCompletedWorkout = '/getAll';
        readonly fullGetAllCompletedWorkoutURL = this.completedWorkoutBaseURL + this.partialgetCompletedWorkout;
        readonly partialaddCompletedWorkout = '/add';
        readonly fullAddCompletedWorkoutURL = this.completedWorkoutBaseURL + this.partialaddCompletedWorkout;
        readonly partialDeleteCompletedWorkout = '/delete';
        readonly fullDeleteCompletedWorkoutURL = this.completedWorkoutBaseURL + this.partialDeleteCompletedWorkout;
        readonly partialGetWorkoutFrequency = '/workoutFreq';
        readonly fullGetWorkoutFrequencyURL = this.completedWorkoutBaseURL + this.partialGetWorkoutFrequency;
        readonly partialGetExerciseNameFrequency = '/exerciseNameFreq';
        readonly fullGetExerciseNameFrequencyURL = this.completedWorkoutBaseURL + this.partialGetExerciseNameFrequency;
        readonly partialGetExerciseTypeFrequency = '/exerciseTypeFreq';
        readonly fullGetExerciseTypeFrequencyURL = this.completedWorkoutBaseURL + this.partialGetExerciseTypeFrequency;
        readonly partialGetWorkoutHistoryByDate = '/workoutHistoryByDate';
        readonly fullGetWorkoutHistoryByDateURL = this.completedWorkoutBaseURL + this.partialGetWorkoutHistoryByDate;
        readonly partialLastCompletedWorkout = '/lastTrackedWorkout';
        readonly fullLastCompletedWorkoutURL = this.completedWorkoutBaseURL + this.partialLastCompletedWorkout;
    }   