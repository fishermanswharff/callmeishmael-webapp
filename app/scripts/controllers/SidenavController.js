'use strict';
function sidenavController(trace,$location,$routeParams){

  var vm = this;

  vm.isActive = function(params){
    return $location.path().slice(0, params.length) === params;
  };
}

angular.module('MainController').controller('SidenavController',sidenavController);
sidenavController.$inject = ['trace','$location','$routeParams'];
