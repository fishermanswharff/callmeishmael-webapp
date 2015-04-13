'use strict';

/**
 * @ngdoc function
 * @name phoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the phoneApp
 */
angular.module('phoneApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
