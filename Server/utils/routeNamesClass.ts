export default class RouteNamesClass {
  // All Base Routes
  readonly userBaseURL = '/api/user'
  readonly changeDetailsBaseURL = this.userBaseURL + '/changeProfileDetails'
  readonly mentalHealthBaseURL = this.userBaseURL + '/mentalHealth'
  readonly sleepBaseURL = this.userBaseURL + '/sleep';

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

    // Sleep Routes
    readonly partialAddSleepURL = '/add';
    readonly fullAddSleepURL = this.sleepBaseURL + this.partialAddSleepURL;

    readonly partialGetSleepURL = '/get';
    readonly fullGetSleepURL = this.sleepBaseURL + this.partialGetSleepURL
  //  Get Info Route
  readonly partialGetInfoURL = '/getInfo'
  readonly fullGetInfoURL = this.userBaseURL + this.partialGetInfoURL

  // Mental Health Routes
  readonly partialWordCloud = '/wordCloud'
  // http://localhost:3001/api/user/mentalHealth/wordCloud
  readonly fullWordCloudURL = this.mentalHealthBaseURL + this.partialWordCloud
  readonly partialFaceGraph = '/faceGraph'
  readonly fullFaceGraphURL = this.mentalHealthBaseURL + this.partialFaceGraph
  readonly partialTodaysWord = '/todaysWord'
  readonly fullTodaysWordURL = this.mentalHealthBaseURL + this.partialTodaysWord
  readonly partialGetDates = '/dateValues'
  readonly fullDateValues = this.mentalHealthBaseURL + this.partialGetDates

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
  readonly partialGetSpecificTrackedFoodURL = '/getSpecificTrackedFood/:logID'
  readonly fullGetSpecificTrackedFoodURL = this.foodBaseURL + this.partialGetSpecificTrackedFoodURL

  // Food database get routes
  readonly partialGetFoodURL = '/getFood/:FoodID'
  readonly fullGetFoodURL = this.foodBaseURL + this.partialGetFoodURL

  readonly partialGetMultipleFoodURL = '/getMultipleFood'

  // Food database delete routes
  readonly partialDeleteTrackedFoodURL = '/deleteTrackedFood'
  readonly fullDeleteFoodURL = this.foodBaseURL + this.partialDeleteTrackedFoodURL
}
