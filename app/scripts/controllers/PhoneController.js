'use strict';
angular.module('MainController').controller('PhoneController',phoneController);
phoneController.$inject = ['$rootScope','AuthFactory','PhoneFactory','$sceDelegate','trace'];
function phoneController($rootScope,AuthFactory,PhoneFactory,$sceDelegate,trace){
  var vm = this;
  vm.currentPhone = {};

  PhoneFactory.fetch($rootScope.currentUser.venues[0].id).then(function(response){
    angular.copy(response[0], vm.currentPhone);
  });
};