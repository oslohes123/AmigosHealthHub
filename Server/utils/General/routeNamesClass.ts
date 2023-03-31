export default class RouteNamesClass {
  // All Base Routes
  readonly userBaseURL = '/api/user'
  readonly changeDetailsBaseURL = this.userBaseURL + '/changeProfileDetails'
  readonly mentalHealthBaseURL = this.userBaseURL + '/mentalHealth'
  readonly sleepBaseURL = this.userBaseURL + '/sleep'
  readonly exerciseBaseURL = this.userBaseURL + '/exercise'
  readonly workoutBaseURL = this.userBaseURL + '/workout'
  readonly caloriesBaseURL = this.workoutBaseURL + '/calories'
  readonly completedWorkoutBaseURL = this.userBaseURL + '/completedWorkouts'
  // Auth Routes
  readonly partialSignupURL = '/sign_up'
  readonly partialLoginURL = '/login'

  readonly fullSignupURL = this.userBaseURL + this.partialSignupURL
  readonly fullLoginURL = this.userBaseURL + this.partialLoginURL

  // Change Profile Routes

  readonly partialChangeStatsURL = '/stats'
  readonly partialChangePasswordURL = '/password'
  readonly partialDeleteAccountURL = '/deleteAccount'

  readonly fullChangeStatsURL = this.changeDetailsBaseURL + this.partialChangeStatsURL
  readonly fullChangePasswordURL = this.changeDetailsBaseURL + this.partialChangePasswordURL
  readonly fullDeleteAccountURL = this.changeDetailsBaseURL + this.partialDeleteAccountURL

  // Check Initial Token Route

  readonly partialCheckInitialTokenURL = '/checkInitialToken'
  readonly fullCheckInitialTokenURL = this.userBaseURL + this.partialCheckInitialTokenURL

  // Exercise And Workout Routes

  // Exercise Routes
  readonly partialSearchExercise = '/search'
  readonly fullSearchExerciseURL = this.exerciseBaseURL + this.partialSearchExercise
  // readonly partialAddToExercises = '/add';
  // readonly fullAddToExercisesURL = this.exerciseBaseURL + this.partialAddToExercises;
  readonly partialGetExercise = '/get'
  readonly fullGetExerciseURL = this.exerciseBaseURL + this.partialGetExercise
  readonly partialGetExerciseHistory = '/history'
  readonly fullGetExerciseHistoryURL = this.exerciseBaseURL + this.partialGetExerciseHistory
  readonly partialGetAllExercises = '/getAll'
  readonly fullGetAllExercisesURL = this.exerciseBaseURL + this.partialGetAllExercises
  // Workout Routes
  readonly partialAddWorkout = '/add'
  readonly fullAddWorkoutURL = this.workoutBaseURL + this.partialAddWorkout
  readonly partialGetWorkout = '/get'
  readonly fullGetWorkoutURL = this.workoutBaseURL + this.partialGetWorkout
  readonly partialDeleteWorkout = '/delete'
  readonly fullDeleteWorkoutURL = this.workoutBaseURL + this.partialDeleteWorkout
  readonly partialGetAllWorkoutNames = '/getAllWorkoutNames'
  readonly fullGetAllWorkoutNamesURL = this.workoutBaseURL + this.partialGetAllWorkoutNames

  // Calories Routes
  readonly partialGetCaloriesToday = '/getToday'
  readonly fullGetCaloriesToday = this.caloriesBaseURL + this.partialGetCaloriesToday

  // Completed Workouts Routes
  readonly partialgetCompletedWorkout = '/get'
  readonly fullGetCompletedWorkoutURL = this.completedWorkoutBaseURL + this.partialgetCompletedWorkout
  readonly partialGetAllCompletedWorkout = '/getAll'
  readonly fullGetAllCompletedWorkoutURL = this.completedWorkoutBaseURL + this.partialGetAllCompletedWorkout
  readonly partialaddCompletedWorkout = '/add'
  readonly fullAddCompletedWorkoutURL = this.completedWorkoutBaseURL + this.partialaddCompletedWorkout
  readonly partialDeleteCompletedWorkout = '/delete'
  readonly fullDeleteCompletedWorkoutURL = this.completedWorkoutBaseURL + this.partialDeleteCompletedWorkout
  readonly partialGetWorkoutFrequency = '/workoutFreq'
  readonly fullGetWorkoutFrequencyURL = this.completedWorkoutBaseURL + this.partialGetWorkoutFrequency
  readonly partialGetExerciseNameFrequency = '/exerciseNameFreq'
  readonly fullGetExerciseNameFrequencyURL = this.completedWorkoutBaseURL + this.partialGetExerciseNameFrequency
  readonly partialGetExerciseTypeFrequency = '/exerciseTypeFreq'
  readonly fullGetExerciseTypeFrequencyURL = this.completedWorkoutBaseURL + this.partialGetExerciseTypeFrequency
  readonly partialGetWorkoutHistoryByDate = '/workoutHistoryByDate'
  readonly fullGetWorkoutHistoryByDateURL = this.completedWorkoutBaseURL + this.partialGetWorkoutHistoryByDate
  readonly partialLastTrackedWorkout = '/lastTrackedWorkout'
  readonly fullLastTrackedWorkoutURL = this.completedWorkoutBaseURL + this.partialLastTrackedWorkout

  // Sleep Routes
  readonly partialAddSleepURL = '/add'
  readonly fullAddSleepURL = this.sleepBaseURL + this.partialAddSleepURL

  readonly partialGetSleepURL = '/get'
  readonly fullGetSleepURL = this.sleepBaseURL + this.partialGetSleepURL
  //  Get Info Route
  readonly partialGetInfoURL = '/getInfo'
  readonly fullGetInfoURL = this.userBaseURL + this.partialGetInfoURL

  // Mental Health Routes
  readonly partialWordCloud = '/wordCloud'
  readonly fullWordCloudURL = this.mentalHealthBaseURL + this.partialWordCloud
  readonly partialFaceGraph = '/faceGraph'
  readonly fullFaceGraphURL = this.mentalHealthBaseURL + this.partialFaceGraph
  readonly partialTodaysWord = '/todaysWord'
  readonly fullTodaysWordURL = this.mentalHealthBaseURL + this.partialTodaysWord
  readonly partialGetDates = '/dateValues'
  readonly fullDateValuesURL = this.mentalHealthBaseURL + this.partialGetDates

  // Mental Health Route

  readonly partialRateMental = '/rateMental'
  readonly fullRateMentalURL = this.mentalHealthBaseURL + this.partialRateMental

  // Food Search Routes
  readonly foodBaseURL = '/api/food'
  readonly partialFoodSearchURL = '/:code.:value'
  readonly fullFoodSearchURL = this.foodBaseURL + this.partialFoodSearchURL

  // Calorie Track Routes
  readonly partialReadSpecificCaloriesURL = '/calorieTrack/Specific.:id'
  readonly partialReadCaloriesURL = '/calorieTrack/General.:UserID'
  readonly partialUpdateSpecificCaloriesURL = '/calorieTrack/updateCalories'
  readonly partialCreateCalorieLogURL = '/calorieTrack/createCalorieLog'
  readonly partialDeleteCalorieLogURL = '/calorieTrack/deleteCalorieLog'

  // Food Update Routes
  readonly partialUpdateFoodURL = '/updateTrackedFood'
  readonly fullFoodUpdateURL = this.foodBaseURL + this.partialUpdateFoodURL

  // Food Add Routes
  readonly partialAddTrackedFood = '/addTrackedFood'
  readonly fullAddTrackedFoodURL = this.foodBaseURL + this.partialAddTrackedFood

  // Food database get tracked routes
  readonly partialGetTrackedFoodURL = '/getTrackedFood/:date.:userID'
  readonly fullGetTrackedFoodURL = this.foodBaseURL + this.partialGetTrackedFoodURL

  // Food database get specific tracked routes
  readonly partialGetSpecificTrackedFoodURL = '/getSpecificTrackedFood/:LogID'
  readonly fullGetSpecificTrackedFoodURL = this.foodBaseURL + this.partialGetSpecificTrackedFoodURL

  // Food database get routes
  readonly partialGetFoodURL = '/getFood/:FoodID'
  readonly fullGetFoodURL = this.foodBaseURL + this.partialGetFoodURL

  readonly partialGetMultipleFoodURL = '/getMultipleFood'

  // Food database delete routes
  readonly partialDeleteTrackedFoodURL = '/deleteTrackedFood'
  readonly fullDeleteFoodURL = this.foodBaseURL + this.partialDeleteTrackedFoodURL
}
