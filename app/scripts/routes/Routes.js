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
    .when('/venues',{
      templateUrl: 'views/venue.html'
    })
    // single-venue editing
    .when('/venues/:venueId', {
      templateUrl: 'views/venue-edit.html',
      controller: 'VenueEditController',
      controllerAs: 'venueEditController',
      resolve: {
        venue: ['$route', 'VenueFactory', function($route, VenueFactory) {
          var venueId = $route.current.pathParams.venueId;
          return VenueFactory.fetchOne(venueId);
        }]
      }
    })
    // phone management for admins
    .when('/phone-stats',{
      templateUrl: 'views/admin-phone.html'
    })
    // single-phone editing for admins
    .when('/phone-stats/:phoneId',{
      templateUrl: 'views/admin-phone-edit.html',
      controller: 'PhoneEditController',
      controllerAs: 'phoneEditController',
      resolve: {
        phone: ['$route', 'PhoneFactory', function($route, PhoneFactory) {
          var phoneId = $route.current.pathParams.phoneId;
          return PhoneFactory.fetchOne(phoneId);
        }]
      }
    })
    // story management for admins
    .when('/story-stats',{
      templateUrl: 'views/stories.html'
    })
    .when('/fixed-stories', {
      templateUrl: 'views/fixed-stories.html',
      controller: 'PhoneController',
      controllerAs: 'phoneController'
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
