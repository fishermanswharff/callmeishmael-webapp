'use strict';
angular.module('phoneApp').config(['$routeProvider', function($routeProvider) {
  $routeProvider
    // landing page, parallax scene
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeController',
      controllerAs: 'homeController'
    })
    // admin dashboard, shows network stats
    .when('/dashboard', {
      templateUrl: 'views/dashboard.html'
    })
    // venue management for admins
    .when('/venue-stats',{
      templateUrl: 'views/venue.html'
    })
    // phone management for admins
    .when('/phone-stats',{
      templateUrl: 'views/admin-phone.html'
    })
    // story management for admins
    .when('/story-stats',{
      templateUrl: 'views/stories.html'
    })
    // user management for admins
    .when('/user-stats', {
      templateUrl: 'views/user-management.html',
      controller: 'UserController',
      controllerAs: 'userController'
    })
    // venue default view
    .when('/phones',{
      templateUrl: 'views/phone-show.html',
    })
    // venue_admin view, edit phone view (drag/drop)
    .when('/manage-phone',{
      templateUrl: 'views/manage-phone.html',
      controller: 'PhoneController',
      controllerAs: 'phoneController'
    })
    // confirm your account
    .when('/confirm', {
      templateUrl: 'views/confirm.html',
      controller: 'LoginController',
      controllerAs: 'loginController'
    })
    // visible for both admins && venue_admins
    .when('/your-account', {
      templateUrl: 'views/user.html',
      controller: 'UserController',
      controllerAs: 'userController'
    })
    .when('/passwordreset', {
      templateUrl: 'views/resetpassword.html',
      controller: 'LoginController',
      controllerAs: 'loginController'
    })
    // venue_admin route, default view
    .otherwise({
      redirectTo: '/phones'
    });
}]);