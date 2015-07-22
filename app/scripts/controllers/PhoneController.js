'use strict';
angular.module('MainController').controller('PhoneController',phoneController);
phoneController.$inject = ['$rootScope','AuthFactory','PhoneFactory','VenueFactory','$sceDelegate','trace'];
function phoneController($rootScope,AuthFactory,PhoneFactory,VenueFactory,$sceDelegate,trace){
  var vm = this;
  vm.currentPhone = {};
  vm.venues = []

  PhoneFactory.fetch($rootScope.currentUser.venues[0].id).then(function(response){
    angular.copy(response[0], vm.currentPhone);
    trace(vm.currentPhone);
  });

  angular.forEach($rootScope.currentUser.venues, function(value,index,array){
    VenueFactory.fetchOne(value.id).then(function(response){
      vm.venues.push(response);
    });
  });
};