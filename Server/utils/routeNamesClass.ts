export default class RouteNamesClass {
    // All Base Routes
    readonly userBaseURL = '/api/user';
    readonly changeDetailsBaseURL = this.userBaseURL + '/changeProfileDetails';
    readonly sleepBaseURL = this.userBaseURL + '/sleep';

    // Auth Routes
    readonly partialSignupURL = '/sign_up';
    readonly partialLoginURL = '/login';

    readonly fullSignupURL = this.userBaseURL + this.partialSignupURL;
    readonly fullLoginURL = this.userBaseURL + this.partialLoginURL;

    //Change Profile Routes

    readonly partialChangeStatsURL = '/stats';
    readonly partialChangePasswordURL = '/password';
    readonly partialDeleteAccountURL = '/deleteAccount';

    readonly fullChangeStatsURL =
        this.changeDetailsBaseURL + this.partialChangeStatsURL;
    readonly fullChangePasswordURL =
        this.changeDetailsBaseURL + this.partialChangePasswordURL;
    readonly fullDeleteAccountURL =
        this.changeDetailsBaseURL + this.partialDeleteAccountURL;

    // Check Initial Token Route

    readonly partialCheckInitialTokenURL = '/checkInitialToken';
    readonly fullCheckInitialTokenURL =
        this.userBaseURL + this.partialCheckInitialTokenURL;

    //  Get Info Route
    readonly partialGetInfoURL = '/getInfo';
    readonly fullGetInfoURL = this.userBaseURL + this.partialGetInfoURL;

    // Sleep Routes
    readonly partialAddSleepURL = '/add';
    readonly fullAddSleepURL = this.sleepBaseURL + this.partialAddSleepURL;

    readonly partialGetSleepURL = '/get';
    readonly fullGetSleepURL = this.sleepBaseURL + this.partialGetSleepURL
}
