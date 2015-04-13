'use strict';
angular.module('phoneApp').config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
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
    .when('/confirm', {
      templateUrl: 'views/confirm.html',
      controller: 'LoginController',
      controllerAs: 'loginController'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);