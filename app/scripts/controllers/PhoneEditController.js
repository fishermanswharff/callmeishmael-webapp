'use strict';

function PhoneEditController($location, PhoneFactory, phone) {
  var vm = this;
  vm.id = phone.id;
  vm.venueId = phone.venue.id;
  vm.unique_identifier = phone.unique_identifier;
  vm.name = phone.venue.name;
  vm.status = phone.status;

  vm.save = function() {
    var obj = {phone: {id: vm.id, venue: {id: vm.venueId}, status: vm.status}};
    PhoneFactory.patch(obj).then(function() {
      $location.path('/phone-stats')
    });
  }
}

PhoneEditController.$inject = ['$location', 'PhoneFactory', 'phone'];
angular.module('MainController').controller('PhoneEditController', PhoneEditController);
