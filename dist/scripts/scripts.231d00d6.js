"use strict";function navbarController(a,b,c){var d=this;c.currentUser(),d.isLoggedIn=function(){return c.isAuthenticated()},d.logout=function(){c.logout().then(function(a){b.path("/login")})}}function loginController(a,b,c,d){var e=this;e.login=function(a){$(loginForm).find("button[type=submit] i.fa").addClass("fa-cog fa-spin"),c.login(a).then(function(a){b.path("/dashboard")})},e.confirm=function(a){var e=b.search(),f={id:e.userId,email:e.userEmail,password:a.password,password_confirmation:a.password_confirmation,confirmed:!0};c.updateUser(f).then(function(a){d("response from updateUser: ",a),b.url("/login")})},e.showPasswordForm=function(){e.forgotPassword=!e.forgotPassword},e.sendPasswordLink=function(b){$(resetPasswordForm).find("button[type=submit] i.fa").addClass("fa-cog fa-spin"),c.sendPasswordLink(b).then(function(b){200==b.status?(a.alert="Your email has been sent. If you did not receive it please check your spam box.",$(resetPasswordForm).find("button[type=submit] i.fa").addClass("fa-check").removeClass("fa-cog fa-spin")):(a.alert="We do not have a record of your email address.",$(resetPasswordForm).find("button[type=submit] i.fa").addClass("fa-times").removeClass("fa-cog fa-spin"))})},e.resetPassword=function(a){d("resetting password");var e=b.search(),f={id:e.userId,email:e.userEmail,password:a.password,password_confirmation:a.password_confirmation,confirmed:!0};c.submitNewPassword(f).then(function(a){b.url("/login")})}}function sidenavController(a,b,c){var d=this;d.isActive=function(a){return b.path()===a}}function dashboardController(a,b,c,d,e){var f=this;f.venues=[],f.phones=[],f.stories=[],f.storyTypes=e();var g=function(){b.fetch().then(function(a){angular.copy(a,f.venues)})},h=function(){d.fetch().then(function(b){angular.copy(b,f.stories),a(f.stories)})},i=function(){c.get().then(function(a){angular.copy(a,f.phones)})};f.activeVenues=function(){var a=[];return f.venues.map(function(b,c){"active"===b.status&&a.push(b)}),a.length},f.pausedVenues=function(){var a=[];return f.venues.map(function(b,c){"paused"===b.status&&a.push(b)}),a.length},f.deleteObject=function(e){a(e);for(var f in e)switch(f){case"story":d.destroy(e).then(function(a){h()});break;case"venue":b.destroy(e).then(function(a){g()});break;case"phone":c.destroy(e).then(function(a){i()})}},g(),h(),i()}function homeController(a,b,c){{var d=this,e=document.getElementById("scene");new Parallax(e)}d.login=function(a){c.login(a).then(function(a){b.path("/dashboard")})},d.showPasswordForm=function(){d.forgotPassword=!d.forgotPassword},d.sendPasswordLink=function(a){c.sendPasswordLink(a)}}function formsController(a,b,c,d,e){var f=this;f.storyTypes=["Fixed","Venue","Surprise","Ishmael’s","Post Roll"],f.phoneStatus=["active","inactive","retired","fixable"],f.venues=[],f.phones=[],f.stories=[],f.users=[],f.story={},f.venueStory={},f.phone={},f.venue={},e.fetch().then(function(a){for(var b=0;b<a.length;b++)"active"==a[b].status&&f.venues.push(a[b])}),b.fetchUsers().then(function(b){angular.copy(b,f.users),a(f.users)}),c.get().then(function(a){angular.copy(a,f.phones)}),d.fetch().then(function(a){angular.copy(a,f.stories)}),f.submit=function(b){for(var g in b)switch(g){case"story":d.post(b).then(function(b){a(b)}),f.story={};break;case"phone":c.post(b).then(function(b){a(b)}),f.phone={},a("phone is the object");break;case"venue":e.post(b).then(function(b){a(b)}),f.venue={},a("venue is the object")}},f.hasUser=function(a){}}function venueController(a,b,c,d,e,f,g,h){var i=this;if(i.venue={},i.userVenues=e.currentUser().venues,i.venuePhones=[],i.stories=[],i.buttonAssignments=["1","2","3","4","5","6","7","8","9"],i.getVenue=function(a){f.fetchOne(a).then(function(a){angular.copy(a,i.venue),i.getPhones(i.venue.id)})},i.getPhones=function(a){g.fetch(a).then(function(a){angular.copy(a,i.venuePhones)})},i.getStories=function(){h.fetch().then(function(a){angular.copy(a,i.stories)})},i.isActive=function(a){return c.path()===a},i.submit=function(a){for(var b in a)switch(b){case"button":g.assignButton(a).then(function(a){i.buttonToEdit=null,i.getPhones(i.venue.id)})}},i.editButton=function(a,b,c){i.buttonToEdit=b,i.buttonToEdit.assignment=a,i.buttonToEdit.phone_id=c},d.venueId)i.getVenue(d.venueId);else{var j=i.userVenues.filter(function(a){return null!==a.number_phones?a:void 0});i.getVenue(j[0].id)}i.getStories()}angular.module("MainController",[]),angular.module("MainDirective",[]),angular.module("phoneApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","MainDirective","MainController"]).run(["$rootScope","$routeParams","$window","$http","$location","AuthFactory","VenueFactory","PhoneFactory","StoryFactory","trace",function(a,b,c,d,e,f,g,h,i,j){if(f.isAuthenticated()||"/confirm"!==e.path())if(f.isAuthenticated()||"/passwordreset"!==e.path())if(f.isAuthenticated()){var k=JSON.parse(c.localStorage.getItem("cmi-user"));d.defaults.headers.common.Authorization="Token token="+k.token}else e.path("/");else j("location is /passwordreset and there is no currentUser");else j("all is well");a.$on("$routeChangeStart",function(a,b){if("/confirm"!==e.path()||f.isAuthenticated())if(f.isAuthenticated()||"/passwordreset"!==e.path())if(f.isAuthenticated()){var g=JSON.parse(c.localStorage.getItem("cmi-user"));d.defaults.headers.common.Authorization="Token token="+g.token}else e.path("/");else j("location is /passwordreset and there is no currentUser");else j("all is well");f.isAuthenticated()&&"venue_admin"==f.currentUser().role&&"/dashboard"===e.path()&&e.path("/venues")}),f.isAuthenticated()&&"venue_admin"==f.currentUser().role&&("/dashboard"===e.path()&&e.path("/phones"),e.path("/phones"))}]),angular.module("phoneApp").config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/home.html",controller:"HomeController",controllerAs:"homeController"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/confirm",{templateUrl:"views/confirm-account.html"}).when("/login",{templateUrl:"views/login.html",controller:"LoginController",controllerAs:"loginController"}).when("/dashboard",{templateUrl:"views/dashboard.html"}).when("/venue-stats",{templateUrl:"views/venue.html"}).when("/phone-stats",{templateUrl:"views/phone.html"}).when("/story-stats",{templateUrl:"views/story.html"}).when("/fixed",{templateUrl:"views/fixed.html"}).when("/add-new",{templateUrl:"views/add-new.html"}).when("/phones",{templateUrl:"views/phone-show.html"}).when("/venues/:venueId",{templateUrl:"views/venue-show.html"}).when("/confirm",{templateUrl:"views/confirm.html",controller:"LoginController",controllerAs:"loginController"}).when("/passwordreset",{templateUrl:"views/resetpassword.html",controller:"LoginController",controllerAs:"loginController"}).otherwise({redirectTo:"/phones"})}]),angular.module("phoneApp").constant("_",window._).constant("ServerUrl","https://callmeishmael-api.herokuapp.com"),angular.module("phoneApp").service("trace",function(){return function(){for(var a=0;a<arguments.length;a++)console.log(arguments[a])}}),angular.module("phoneApp").service("storyTypes",["trace",function(a){return function(){return["Fixed","Venue","Surprise","Ishmael’s"]}}]),angular.module("phoneApp").filter("storyFilter",["trace","StoryFactory",function(a,b){return function(a,b){var c=[],d=b||"^$",e=new RegExp("("+d+")","ig");return angular.forEach(a,function(a,b){var d=a.title.search(e),f=a.author_last.search(e);(-1!==d||-1!==f)&&c.push(a)}),c}}]),angular.module("phoneApp").factory("AuthFactory",["$location","$rootScope","$http","$window","$q","ServerUrl","trace",function(a,b,c,d,e,f,g){var h=[],i=function(){return e(function(a,d){c.get(f+"/admin/users").success(function(b){angular.copy(b,h),a(b)}).error(function(a,c,e,f){d(a),b.alert="Unsuccessful attempt to retreive all users because:"+a+"\n"+c})})},j=function(a){return c.post(f+"/login",a).success(function(a){r(a),b.currentUser=JSON.parse(d.localStorage.getItem("cmi-user")),b.alert=null}).error(function(a,c,d,e){g(a,c,d,e),b.alert="Username and Password combination is invalid. Please try again."})},k=function(){return c.get(f+"/logout").success(function(a){g(a),d.localStorage.removeItem("cmi-user"),b.currentUser=null,b.alert="You have successfully logged out"})},l=function(){return!!d.localStorage.getItem("cmi-user")},m=function(a){return c.post(f+"/users",{user:a}).success(function(a){g(a)}).error(function(a,b,c,d){g(a,b,c,d,"you are so stupid, you are doing it wrong")})},n=function(a){return c.patch(f+"/admin/users/"+a.id,{user:a}).success(function(a){b.confirmed=!0,g("success on updateUser: ",a)}).error(function(a,c,d,e){g(a,c,d,e),b.alert="Your password did NOT save successfully, please try again"})},o=function(){return b.currentUser=JSON.parse(d.localStorage.getItem("cmi-user"))},p=function(a){return c.get(f+"/resetpassword?email="+a.email)},q=function(a){return c.patch(f+"/admin/users/"+a.id,{user:a}).success(function(a){g(a)}).error(function(a,b,c,d){g(a,b,c,d)})},r=function(a){d.localStorage.setItem("cmi-user",JSON.stringify(a)),c.defaults.headers.common.Authorization="Token token="+a.token};return{users:h,fetchUsers:i,login:j,logout:k,isAuthenticated:l,postNewUser:m,updateUser:n,currentUser:o,sendPasswordLink:p,submitNewPassword:q}}]),angular.module("phoneApp").factory("PhoneFactory",["trace","$rootScope","$http","$q","ServerUrl",function(a,b,c,d,e){var f=[],g=function(b){return d(function(d,g){c.get(e+"/venues/"+b+"/phones").success(function(a){d(a),angular.copy(a,f)}).error(function(b,c,d,e){a(b,c,d,e,"phone request failed.")})})},h=function(){return d(function(a,b){c.get(e+"/phones").success(function(b){a(b)}).error(function(a,c,d,e){b(a)})})},i=function(a){return d(function(d,f){c.post(e+"/venues/"+a.phone.venueId+"/phones",a).success(function(a){b.alert="Your phone was successfully created",d(a)}).error(function(a,c,d,e){b.alert="Sorry, there was an issue with that request: Status "+c,f(a,c,d,e)})})},j=function(a){return d(function(d,f){c["delete"](e+"/venues/"+a.phone.venue.id+"/phones/"+a.phone.id).success(function(a){b.alert="Your phone was successfully deleted",d(a)}).error(function(a,c,d,e){b.alert="Sorry, there was an issue with that request: Status "+c,f(a,c,d,e)})})},k=function(a){var f={assignment:a.button.assignment,phone_id:a.button.phone_id,story_id:a.button.story_id};return d(function(d,g){c.patch(e+"/buttons/"+a.button.button_id,{button:f}).success(function(a){b.alert="Your button was successfully changed",d(a)}).error(function(a,c,d,e){b.alert="Sorry, there was an issue with that request: Status "+c,g(a,c,d,e)})})};return{fetch:g,phones:f,get:h,post:i,assignButton:k,destroy:j}}]),angular.module("phoneApp").factory("VenueFactory",["trace","$window","$rootScope","ServerUrl","$q","$http",function(a,b,c,d,e,f){var g=[],h=function(){return e(function(a,b){f.get(d+"/venues").success(function(b){angular.copy(b,g),a(b)}).error(function(a,c,d,e){b(a,c,d,e)})})},i=function(a){return e(function(b,c){f.get(d+"/venues/"+a).success(function(a){b(a)}).error(function(a,b,d,e){c(a,b,d,e)})})},j=function(a){return a.venue.user_ids=l(a.venue.user_ids),e(function(b,e){f.post(d+"/venues",a).success(function(a){c.alert="Your venue was successfully created",b(a)}).error(function(a,b,d,f){c.alert="Sorry, there was an issue with that request: Status "+b,e(a)})})},k=function(a){return e(function(b,e){f["delete"](d+"/venues/"+a.venue.id).success(function(a){c.alert="Your venue was successfully deleted",b(a)}).error(function(a,b,d,f){c.alert="Sorry, there was an issue with that request: Status "+b,e(a)})})},l=function(a){var b=[];for(var c in a)a[c].checked&&b.push(c);return b};return{fetch:h,fetchOne:i,venues:g,post:j,destroy:k}}]),angular.module("phoneApp").factory("StoryFactory",["trace","$window","$rootScope","ServerUrl","$q","$http",function(a,b,c,d,e,f){var g=[],h=function(){return e(function(b,c){f.get(d+"/stories").success(function(a){angular.copy(a,g),b(a)}).error(function(b,c,d,e){a(b,c,d,e)})})},i=function(b){return b.story.story_type=k(b.story.story_type),e(function(e,g){f.post(d+"/stories",b).success(function(a){c.alert="Your story was successfully created",e(a)}).error(function(b,c,d,e){a(b,c,d,e),g(b,c,d,e)})})},j=function(a){return e(function(b,e){f["delete"](d+"/stories/"+a.story.id).success(function(a){c.alert="Your venue was successfully deleted",b(a)}).error(function(a,b,c,d){e({data:a,status:b,headers:c,config:d})})})},k=function(a){return a.toLowerCase().replace(/[\-\s\—\–\”’“‘\',;]/,"")};return{fetch:h,stories:g,post:i,destroy:j}}]),angular.module("phoneApp").filter("venuesFilter",["trace",function(a){}]),angular.module("MainDirective").directive("navbar",["trace",function(a){return{restrict:"E",templateUrl:"views/navbar.html",controller:"NavbarController",controllerAs:"navbarController",bindToController:!0,link:function(a,b,c){}}}]),angular.module("MainDirective").directive("sidenav",["trace",function(a){return{restrict:"E",templateUrl:"views/sidenav.html",controller:"SidenavController",controllerAs:"sidenavController",bindToController:!0,link:function(a,b,c){}}}]),angular.module("MainDirective").directive("cmiDashboard",["trace",function(a){return{restrict:"E",templateUrl:"views/admin-dashboard.html",controller:"DashboardController",controllerAs:"dashboardController",bindToController:!0,link:function(a,b,c){}}}]),angular.module("MainDirective").directive("cmiPhoneShowDashboard",["trace",function(a){return{restrict:"E",scope:"=",templateUrl:"views/phone-show-dashboard.html",controller:"VenueController",controllerAs:"venueController",bindToController:!0,link:function(a,b,c){}}}]),angular.module("MainDirective").directive("cmiAdminPhoneDashboard",["PhoneFactory","trace",function(a,b){return{restrict:"E",templateUrl:"views/admin-phone-dashboard.html",controller:"DashboardController",controllerAs:"dashboardController",bindToController:!0,link:function(a,b,c){}}}]),angular.module("MainDirective").directive("cmiStoryDashboard",["trace",function(a){return{restrict:"E",templateUrl:"views/story-dashboard.html",controller:"DashboardController",controllerAs:"dashboardController",bindToController:!0,scope:"=",link:function(a,b,c){}}}]),angular.module("MainDirective").directive("cmiFormsDashboard",["trace",function(a){return{restrict:"E",templateUrl:"views/forms-dashboard.html",controller:"FormsController",controllerAs:"formsController",bindToController:!0,link:function(a,b,c){}}}]),angular.module("MainDirective").directive("ngConfirmClick",["trace","$window",function(a,b){return{restrict:"A",replace:!1,scope:"=",link:function(a,c,d){var e=d.ngConfirmClick||"Are you sure?",f=d.confirmedClickAction;c.bind("click",function(c){b.confirm(e)&&a.$eval(f)})}}}]),angular.module("MainDirective").directive("cmiVenueDashboard",["VenueFactory","trace",function(a,b){return{restrict:"E",templateUrl:"views/venue-dashboard.html",controller:"DashboardController",controllerAs:"dashboardController",bindToController:!0,link:function(a,b,c){}}}]),angular.module("MainDirective").directive("ajaxSpinner",["trace","$http",function(a,b){return{restrict:"A",link:function(a,c,d){a.isLoading=function(){return b.pendingRequests.length>0},a.$watch(a.isLoading,function(a){a?c.addClass("active").find("i.fa").addClass("fa-cog fa-spin"):c.removeClass("active").find("i.fa").removeClass("fa-cog fa-spin")})}}}]),angular.module("phoneApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("MainController").controller("NavbarController",navbarController),navbarController.$inject=["trace","$location","AuthFactory"],angular.module("MainController").controller("LoginController",loginController),loginController.$inject=["$rootScope","$location","AuthFactory","trace"],angular.module("MainController").controller("SidenavController",sidenavController),sidenavController.$inject=["trace","$location","$routeParams"],angular.module("MainController").controller("DashboardController",dashboardController),dashboardController.$inject=["trace","VenueFactory","PhoneFactory","StoryFactory","storyTypes"],angular.module("MainController").controller("HomeController",homeController),homeController.$inject=["trace","$location","AuthFactory"],angular.module("MainController").controller("FormsController",formsController),formsController.$inject=["trace","AuthFactory","PhoneFactory","StoryFactory","VenueFactory"],angular.module("MainController").controller("VenueController",venueController),venueController.$inject=["trace","$rootScope","$location","$routeParams","AuthFactory","VenueFactory","PhoneFactory","StoryFactory"];