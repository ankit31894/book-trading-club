angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

    // home page
    .when('/', {
        templateUrl: 'views/allbooks.html',
        controller: 'AllBooksController',
        css: 'css/books.css'
   })
    .when('/mybooks', {
        templateUrl: 'views/mybooks.html',
        controller: 'MyMainController',
        css: 'css/books.css'
    })
    .when('/book/:string', {
        templateUrl: 'views/book.html',
        controller: 'BookController',
        css: 'css/books.css'
    })
    .when('/received', {
        templateUrl: 'views/received.html',
        controller: 'ReceivedController',
        css: 'css/books.css'
    })
    .when('/sent', {
        templateUrl: 'views/sent.html',
        controller: 'SentController',
        css: 'css/books.css'
    })
    .when('/account', {
        templateUrl: 'views/account.html',
        controller: 'AccountController',
        css: 'css/books.css'
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
