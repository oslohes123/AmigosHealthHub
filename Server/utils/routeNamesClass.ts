export default class RouteNamesClass{

    // All Base Routes
    readonly userBaseURL = '/api/user'
    readonly changeDetailsBaseURL = this.userBaseURL + '/changeProfileDetails'

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

    // Food Search Routes
    readonly foodBaseURL = '/api/food'
    readonly partialFoodSearchURL = '/:code.:value'
    readonly fullFoodSearchURL = this.foodBaseURL + this.partialFoodSearchURL

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

    // Food database delete routes
    readonly partialDeleteTrackedFoodURL = '/deleteTrackedFood'
    readonly fullDeleteFoodURL = this.foodBaseURL + this.partialDeleteTrackedFoodURL
    

}