'use strict';
function loginController($rootScope,$location,AuthFactory,trace){
  var vm = this;

  vm.login = function(credentials){
    $(loginForm).find('button[type=submit] i.fa').addClass('fa-cog fa-spin');
    AuthFactory.login(credentials).then(function(response){
      $location.path('/dashboard');
    });
  };

  vm.confirm = function(credentials){
    var userParams = $location.search();
    var user = {
      id: userParams.userId,
      email: userParams.userEmail,
      password: credentials.password,
      password_confirmation: credentials.password_confirmation,
      confirmed: true
    };
    AuthFactory.updateUser(user).then(function(response){
      trace('response from updateUser: ', response);
      $location.url('/');
    });
  };

  vm.showPasswordForm = function(){
    vm.forgotPassword = !vm.forgotPassword;
  };

  vm.sendPasswordLink = function(credentials){
    $(resetPasswordForm).find('button[type=submit] i.fa').addClass('fa-cog fa-spin');
    AuthFactory.sendPasswordLink(credentials).then(function(response){
      if(response.status === 200){
        $rootScope.$broadcast('alert', { alert: 'Your email has been sent. If you did not receive it please check your spam box.', status: response.status});
        $(resetPasswordForm).find('button[type=submit] i.fa').addClass('fa-check').removeClass('fa-cog fa-spin');
      } else {
        $rootScope.$broadcast('alert', { alert:'We do not have a record of your email address.', status: response.status });
        $(resetPasswordForm).find('button[type=submit] i.fa').addClass('fa-times').removeClass('fa-cog fa-spin');
      }
    });
  };

  vm.resetPassword = function(credentials){
    trace('resetting password');
    var userParams = $location.search();
    var user = {
      id: userParams.userId,
      email: userParams.userEmail,
      password: credentials.password,
      password_confirmation: credentials.password_confirmation,
      confirmed: true
    };
    AuthFactory.submitNewPassword(user).then(function(response){
      $location.url('/');
    });
  };

}
angular.module('MainController').controller('LoginController',loginController);
loginController.$inject = ['$rootScope','$location','AuthFactory','trace'];

