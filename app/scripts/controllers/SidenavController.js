'use strict';
angular.module('MainController').controller('SidenavController',sidenavController);
sidenavController.$inject = ['trace','$location','$routeParams'];
function sidenavController(trace,$location,$routeParams){

  var vm = this;

  vm.isActive = function(params){
    return $location.path() === params;
  };
}