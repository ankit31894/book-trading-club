angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

    // home page
    .when('/', {
        templateUrl: 'views/allbooks.html',
        controller: 'AllBooksController'
   })
    .when('/mybooks', {
        templateUrl: 'views/mybooks.html',
        controller: 'MyMainController'
    })
    .when('/book/:string', {
        templateUrl: 'views/book.html',
        controller: 'BookController'
    })
    .when('/received', {
        templateUrl: 'views/received.html',
        controller: 'ReceivedController'
    })
    .when('/sent', {
        templateUrl: 'views/sent.html',
        controller: 'SentController'
    })
    .when('/account', {
        templateUrl: 'views/account.html',
        controller: 'AccountController'
    })
    .when('/login/google', {
        controller : function(){
            window.location.replace('/login/google');
        },
        template : "<div></div>"
    })
    .when('/logout', {
        controller : function(){
            window.location.replace('/logout');
        },
        template : "<div></div>"
    });

    $locationProvider.html5Mode(true);

}]);
