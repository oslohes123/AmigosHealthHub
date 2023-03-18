export default class RouteNamesClass{

    // All Base Routes
    readonly userBaseURL = '/api/user'
    readonly changeDetailsBaseURL = this.userBaseURL + '/changeProfileDetails'
    readonly mentalHealthBaseURL = this.userBaseURL + '/mentalHealth';

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
    

    //Mental Health Routes
    readonly partialWordCloud = '/wordCloud';
    // http://localhost:3001/api/user/mentalHealth/wordCloud
    readonly fullWordCloudURL = this.mentalHealthBaseURL + this.partialWordCloud;
    readonly partialFaceGraph = '/faceGraph';
    readonly fullFaceGraphURL = this.mentalHealthBaseURL + this.partialFaceGraph;
    readonly partialTodaysWord = '/todaysWord';
    readonly fullTodaysWordURL = this.mentalHealthBaseURL + this.partialTodaysWord;
    readonly partialGetDates = '/dateValues';
    readonly fullDateValues = this.mentalHealthBaseURL + this.partialGetDates;

    //Mental Health Route

    readonly partialRateMental = '/rateMental';
    readonly fullRateMentalURL = this.mentalHealthBaseURL + this.partialRateMental;

}