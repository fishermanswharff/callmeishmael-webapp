'use strict';

/**
 * @ngdoc overview
 * @name phoneApp
 * @description
 * # phoneApp
 *
 * Main module of the application.
 */
angular.module('phoneApp', [
  'ngAnimate',
  'ngAria',
  'ngCookies',
  'ngMessages',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  '720kb.datepicker',
  'MainDirective',
  'MainController'
]).run(function($rootScope,$routeParams,$window,$http,$location,AuthFactory,VenueFactory,PhoneFactory,StoryFactory,ButtonFactory,trace){

  VenueFactory.fetch();
  PhoneFactory.get();
  StoryFactory.fetch();
  StoryFactory.fetchData();
  ButtonFactory.indexStar();
  ButtonFactory.indexHash();
  ButtonFactory.indexZero();
  ButtonFactory.indexPostroll();
  ButtonFactory.indexFixed();
  AuthFactory.fetchUsers();

  if(!AuthFactory.isAuthenticated() && $location.path() === '/confirm'){
    trace('all is well');
  } else if(!AuthFactory.isAuthenticated() && $location.path() === '/passwordreset'){
    trace('location is /passwordreset and there is no currentUser');
  } else if(AuthFactory.isAuthenticated()){
    var data = JSON.parse($window.localStorage.getItem('cmi-user'));
    $http.defaults.headers.common.Authorization = 'Token token=' + data.token;
  } else {
    $location.path('/');
  }

  $rootScope.$on('$routeChangeStart',function(event,next){
    if($location.path() === '/confirm' && !AuthFactory.isAuthenticated()){
      trace('all is well');
    } else if(!AuthFactory.isAuthenticated() && $location.path() === '/passwordreset'){
      trace('location is /passwordreset and there is no currentUser');
    } else if(AuthFactory.isAuthenticated()) {
      var data = JSON.parse($window.localStorage.getItem('cmi-user'));
      $http.defaults.headers.common.Authorization = 'Token token=' + data.token;
    } else {
      $location.path('/');
    }
    if(AuthFactory.isAuthenticated() && AuthFactory.currentUser().role === 'venue_admin' && $location.path() === '/dashboard'){
      $location.path('/phones');
    }
  });

  if(AuthFactory.isAuthenticated() && AuthFactory.currentUser().role === 'venue_admin'){
    if($location.path() === '/dashboard'){
      $location.path('/phones');
    }
  }

}).config(function($sceDelegateProvider){
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    // Allow loading from our assets domain. Notice the difference between * and **.
    'https://s3-us-west-2.amazonaws.com/**',
    'https://callmeishmael-files-v2.s3.amazonaws.com/**',
    'https://callmeishmael-files.s3.amazonaws.com/**',
    'https://54.69.177.30/**'
  ]);
});
