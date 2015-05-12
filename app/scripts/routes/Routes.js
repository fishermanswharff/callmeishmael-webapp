'use strict';
angular.module('phoneApp').config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeController',
      controllerAs: 'homeController'
    })
    .when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl'
    })
    .when('/confirm', {
      templateUrl: 'views/confirm-account.html'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginController',
      controllerAs: 'loginController'
    })
    .when('/dashboard', {
      templateUrl: 'views/dashboard.html'
    })
    .when('/venue-stats',{
      templateUrl: 'views/venue.html'
    })
    .when('/phone-stats',{
      templateUrl: 'views/phone.html'
    })
    .when('/story-stats',{
      templateUrl: 'views/story.html'
    })
    .when('/post-roll-stats',{
      templateUrl: 'views/post-roll.html'
    })
    .when('/fixed',{
      templateUrl: 'views/fixed.html'
    })
    .when('/add-new',{
      templateUrl: 'views/add-new.html'
    })
    .when('/confirm', {
      templateUrl: 'views/confirm.html',
      controller: 'LoginController',
      controllerAs: 'loginController'
    })
    .when('/passwordreset', {
      templateUrl: 'views/resetpassword.html',
      controller: 'LoginController',
      controllerAs: 'loginController'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);