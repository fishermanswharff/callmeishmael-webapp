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
  'MainDirective',
  'MainController'
]).run(function($rootScope,$routeParams,$window,$http,$location,AuthFactory,trace){

  if(!AuthFactory.isAuthenticated() && $location.path() === '/confirm'){
    trace('all is well');
  } else if(AuthFactory.isAuthenticated()){
    var data = JSON.parse($window.localStorage.getItem('cmi-user'));
    $http.defaults.headers.common.Authorization = 'Token token=' + data.token;
  } else {
    $location.path('/login');
  }

  $rootScope.$on('$routeChangeStart',function(event,next){
    if($location.path() === '/confirm' && !AuthFactory.isAuthenticated()){
      trace('all is well');
    } else if(AuthFactory.isAuthenticated()) {
      var data = JSON.parse($window.localStorage.getItem('cmi-user'));
      $http.defaults.headers.common.Authorization = 'Token token=' + data.token;
    } else {
      $location.path('/login');
    }
  });
});