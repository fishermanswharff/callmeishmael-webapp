"use strict";function navbarController(a,b,c){var d=this;c.currentUser(),d.isLoggedIn=function(){return c.isAuthenticated()},d.logout=function(){c.logout().then(function(a){b.path("/login")})}}function loginController(a,b,c,d){var e=this;e.login=function(a){$(loginForm).find("button[type=submit] i.fa").addClass("fa-cog fa-spin"),c.login(a).then(function(a){b.path("/dashboard")})},e.confirm=function(a){var e=b.search(),f={id:e.userId,email:e.userEmail,password:a.password,password_confirmation:a.password_confirmation,confirmed:!0};c.updateUser(f).then(function(a){d("response from updateUser: ",a),b.url("/")})},e.showPasswordForm=function(){e.forgotPassword=!e.forgotPassword},e.sendPasswordLink=function(b){$(resetPasswordForm).find("button[type=submit] i.fa").addClass("fa-cog fa-spin"),c.sendPasswordLink(b).then(function(b){200===b.status?(a.$broadcast("alert",{alert:"Your email has been sent. If you did not receive it please check your spam box.",status:b.status}),$(resetPasswordForm).find("button[type=submit] i.fa").addClass("fa-check").removeClass("fa-cog fa-spin")):(a.$broadcast("alert",{alert:"We do not have a record of your email address.",status:b.status}),$(resetPasswordForm).find("button[type=submit] i.fa").addClass("fa-times").removeClass("fa-cog fa-spin"))})},e.resetPassword=function(a){d("resetting password");var e=b.search(),f={id:e.userId,email:e.userEmail,password:a.password,password_confirmation:a.password_confirmation,confirmed:!0};c.submitNewPassword(f).then(function(a){b.url("/")})}}function sidenavController(a,b,c){var d=this;d.isActive=function(a){return b.path()===a}}function dashboardController(a,b,c,d,e){var f=this;f.phones=[],f.stories=[],f.storyData=d.storyData,f.storyTypes=e(),f.venues=b.venues,f.phones=c.phones,f.stories=d.stories,f.pausedVenues=function(){var a=[];return f.venues.map(function(b,c){"paused"===b.status&&a.push(b)}),a.length},f.deleteObject=function(a){for(var e in a)switch(e){case"story":d.destroy(a).then(function(a){j()});break;case"venue":b.destroy(a).then(function(a){k()});break;case"phone":c.destroy(a).then(function(a){l()})}},f.activeVenues=function(){return f.venues.filter(g).length},f.pausedVenues=function(){return f.venues.filter(h).length},f.cancelledVenues=function(){return f.venues.filter(i).length};var g=function(a,b,c){return"active"===a.venue_status},h=function(a,b,c){return"paused"===a.venue_status},i=function(a,b,c){return"cancelled"===a.venue_status},j=function(){d.fetch().then(function(a){angular.copy(a.stories,f.stories)})},k=function(){b.fetch().then(function(a){angular.copy(a,f.venues)})},l=function(){c.get().then(function(a){angular.copy(a,f.phones)})};console.log(f.venues)}function homeController(a,b,c){{var d=document.getElementById("scene");new Parallax(d)}}function formsController(a,b,c,d,e,f,g,h,i){var j=function(a,b,c){return"active"===a.venue_status},k=this;k.storyTypes=["Fixed","Venue","Ishmael’s","Post Roll"],k.phoneStatus=["active","inactive","retired","fixable"],k.venueStatus=["active","paused","cancelled"],k.phones=d.phones,k.stories=e.stories,k.users=c.users,f.fetch().then(function(a){k.venues=a.filter(j)}),k.story={explicit:!1,child_appropriate:!0,spoiler_alert:!1},k.venueStory={},k.phone={},k.venue={},k.submit=function(b){for(var c in b)switch(c){case"story":l(b);break;case"phone":a("phone:",b),b.phone.status=b.phone.status.replace(/\s+/g,""),d.post(b).then(function(b){a(b)}),k.phone={};break;case"venue":f.post(b).then(function(a){f.fetch()}),k.venue={};break;case"user":m(b),k.newUser={}}};var l=function(a){if("Venue"===a.story.story_type&&void 0===a.story.venue_id)return void h.$broadcast("alert",{alert:"Please choose a venue for the story",status:400});var c=o();c.length>0?g.sendToAmazon(c[0]).then(function(c){var d;h.$watch("awsResponse",function(c,g){c&&204===c.status&&(d=c.headers().location,b.all(n(a,d)).then(function(b){if(a.story.venue_id){var c=b[0];f.addStoryToVenue(a.story.venue_id,c.id)}k.story={},$(storyForm).find("input[type=file]").val(null),e.fetch()}))})}):b.all(n(a)).then(function(b){if(a.story.venue_id){var c=b[0];f.addStoryToVenue(a.story.venue_id,c.id)}k.story={},$(storyForm).find("input[type=file]").val(null),e.fetch()})},m=function(b){if(b.user.venueId){var d=b.user.venueId;delete b.user.venueId,b.user.password="secret",c.postNewUser(b).then(function(a){f.patch({venue:{user_id:a.data.id}},d)})}else b.user.password="secret",c.postNewUser(b).then(function(b){a(b)})},n=function(a,b){var c=[];return c.push(e.post(a,b)),c},o=function(){for(var a=[],b=$(storyForm).find("input[type=file]"),c=0,d=b.length;d>c;c++){var e=b[c].files[0];e&&a.push(e)}return a};k.deleteObject=function(b){a(b);for(var c in b)switch(c){case"story":e.destroy(b).then(function(a){e.fetch()});break;case"venue":f.destroy(b).then(function(a){f.fetch()});break;case"phone":d.destroy(b).then(function(a){d.get()})}},k.normalizeStoryTitle=function(a){return e.normalize(a)},k.clearForm=function(){k.story={},k.isEditing=!k.isEditing};var p=function(a,b){k.story=b.story,k.isEditing=!!k.story.id};h.$on("editStory",p)}function venueController(a,b,c,d,e,f,g,h){var i=this;if(i.venue={},i.userVenues=e.currentUser().venues,i.venuePhones=[],i.stories=h.stories,i.buttonAssignments=["1","2","3","4","5","6","7","8","9"],i.getVenue=function(a){f.fetchOne(a).then(function(a){angular.copy(a,i.venue),i.getPhones(i.venue.id)})},i.getPhones=function(a){g.fetch(a).then(function(a){angular.copy(a,i.venuePhones)})},i.isActive=function(a){return c.path()===a},i.submit=function(a){for(var b in a)switch(b){case"button":g.assignButton(a).then(function(a){i.buttonToEdit=null,i.getPhones(i.venue.id)})}},i.callThePhone=function(a){g.callThePhone(a).then(function(a){console.log(a)})},i.editButton=function(a,b,c){i.buttonToEdit=b,i.buttonToEdit.assignment=a,i.buttonToEdit.phone_id=c},d.venueId)i.getVenue(d.venueId);else{var j=i.userVenues.filter(function(a){return null!==a.number_phones?a:void 0});i.getVenue(j[0].id)}}function phoneController(a,b,c,d,e,f,g,h,i){var j=this;j.currentPhone={},j.venues=[],j.ishmaelStories=[],j.availableStories=[],j.starAssignments=g.starStories,j.zeroAssignments=g.zeroStories,j.hashAssignments=g.hashStories,j.postrollAssignments=g.postrollStories,j.availableFixedStories=[],e.fetch(a.currentUser.venues[0].id).then(function(a){angular.copy(a[0],j.currentPhone),k(),n()}),j.isFixed=function(a){for(var b in a)if(a.hasOwnProperty(b))return"*"===b||"#"===b||"0"===b||"PR"===b},b.$on("droppedElement",function(a,c){var d,f,h=c.dragObj,i=c.dropObj;if(f=r(i),s(h),"*"===f.assignment||"#"===f.assignment||"0"===f.assignment||"PR"===f.assignment)d=f.story.id,f={button:{story_id:h.id,assignment:f.assignment}};else for(var j in f)d=f[j].story_id,f[j].title=h.title,f[j].url=h.url,f[j].story_id=h.id;"undefined"!=typeof d&&b.$apply(l(d)),"undefined"!=typeof f.button?g.postFixed(f).then(function(a){var b="";switch(angular.forEach(a,function(a,c){console.log(a.assignment),b=a.assignment}),b){case"*":g.indexStar();break;case"#":g.indexHash();break;case"0":g.indexZero();break;case"PR":g.indexPostroll()}}):e.assignButton(f).then(function(a){})});var k=function(){d.fetch().then(function(a){o(q(a))})},l=function(a){d.fetchOne(a).then(function(a){j.availableStories.push(a)})},m=function(){d.fetch().then(function(a){angular.forEach(a,function(a,b){("fixed"===a.story_type||"postroll"===a.story_type)&&j.availableFixedStories.push(a)})})},n=function(){angular.forEach(a.currentUser.venues,function(a,b,c){f.fetchOne(a.id).then(function(a){j.venues.push(a),o(a.stories)})})},o=function(a){angular.forEach(a,function(a,b,c){p(a.id)||j.availableStories.push(a)})},p=function(a){var b=j.currentPhone.buttons.filter(function(b,c,d){var e=Object.getOwnPropertyNames(b)[0];if(null!==b[e]){var f=b[e].story_id.toString();return f===a.toString()}});return b.length>0},q=function(a){return a.filter(function(a){return"ishmaels"===a.story_type?a:void 0})},r=function(a){return"*"===a.assignment||"#"===a.assignment||"0"===a.assignment||"PR"===a.assignment?a:j.currentPhone.buttons.filter(function(b,c,d){for(var e in b)if(e===Object.keys(a)[0])return b})[0]},s=function(a){"undefined"!=typeof a&&angular.forEach(j.availableStories,function(b,c){b.id===a.id&&j.availableStories.splice(c,1)})};"admin"===a.currentUser.role&&m()}function userController(a,b,c,d){var e=this;e.users=c.users,e.updateUser=function(a){a.id=e.currentUser.id,c.updateUser(a).then(function(a){f()}),e.user={}},e.deleteUser=function(a){c.deleteUser(a).then(function(a){c.fetchUsers()})};var f=function(){e.currentUser=c.currentUser()};f()}angular.module("MainController",[]),angular.module("MainDirective",[]),angular.module("phoneApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","720kb.datepicker","MainDirective","MainController"]).run(["$rootScope","$routeParams","$window","$http","$location","AuthFactory","VenueFactory","PhoneFactory","StoryFactory","ButtonFactory","trace",function(a,b,c,d,e,f,g,h,i,j,k){if(g.fetch(),h.get(),i.fetch(),i.fetchData(),j.indexStar(),j.indexHash(),j.indexZero(),j.indexPostroll(),j.indexFixed(),f.fetchUsers(),f.isAuthenticated()||"/confirm"!==e.path())if(f.isAuthenticated()||"/passwordreset"!==e.path())if(f.isAuthenticated()){var l=JSON.parse(c.localStorage.getItem("cmi-user"));d.defaults.headers.common.Authorization="Token token="+l.token}else e.path("/");else k("location is /passwordreset and there is no currentUser");else k("all is well");a.$on("$routeChangeStart",function(a,b){if("/confirm"!==e.path()||f.isAuthenticated())if(f.isAuthenticated()||"/passwordreset"!==e.path())if(f.isAuthenticated()){var g=JSON.parse(c.localStorage.getItem("cmi-user"));d.defaults.headers.common.Authorization="Token token="+g.token}else e.path("/");else k("location is /passwordreset and there is no currentUser");else k("all is well");f.isAuthenticated()&&"venue_admin"===f.currentUser().role&&"/dashboard"===e.path()&&e.path("/venues")}),f.isAuthenticated()&&"venue_admin"===f.currentUser().role&&"/dashboard"===e.path()&&e.path("/phones")}]).config(["$sceDelegateProvider",function(a){a.resourceUrlWhitelist(["self","https://s3-us-west-2.amazonaws.com/**","https://callmeishmael-files.s3.amazonaws.com/**"])}]),angular.module("phoneApp").config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/home.html",controller:"HomeController",controllerAs:"homeController"}).when("/dashboard",{templateUrl:"views/dashboard.html"}).when("/venue-stats",{templateUrl:"views/venue.html"}).when("/phone-stats",{templateUrl:"views/admin-phone.html"}).when("/story-stats",{templateUrl:"views/stories.html"}).when("/fixed-stories",{templateUrl:"views/fixed-stories.html",controller:"PhoneController",controllerAs:"phoneController"}).when("/user-stats",{templateUrl:"views/user-management.html",controller:"UserController",controllerAs:"userController"}).when("/phones",{templateUrl:"views/phone-show.html"}).when("/manage-phone",{templateUrl:"views/manage-phone.html",controller:"PhoneController",controllerAs:"phoneController"}).when("/confirm",{templateUrl:"views/confirm.html",controller:"LoginController",controllerAs:"loginController"}).when("/your-account",{templateUrl:"views/user.html",controller:"UserController",controllerAs:"userController"}).when("/passwordreset",{templateUrl:"views/resetpassword.html",controller:"LoginController",controllerAs:"loginController"}).otherwise({redirectTo:"/phones"})}]),angular.module("phoneApp").constant("_",window._).constant("ServerUrl","https://54.69.177.30").constant("AmazonBucket","https://callmeishmael-files.s3.amazonaws.com/"),angular.module("phoneApp").service("trace",function(){return function(){for(var a=0;a<arguments.length;a++)console.log(arguments[a])}}),angular.module("phoneApp").service("storyTypes",function(){return function(){return["Fixed","Venue","Surprise","Ishmael’s"]}}),angular.module("phoneApp").filter("storyFilter",["trace","StoryFactory",function(a,b){return function(a,b){var c=[],d=b||"^$",e=new RegExp("("+d+")","ig");return angular.forEach(a,function(a,b){var d=a.title.search(e),f=a.author_last.search(e);(-1!==d||-1!==f)&&c.push(a)}),c}}]),angular.module("phoneApp").filter("reverse",function(){return function(a){return"undefined"!=typeof a?a.slice().reverse():void 0}}),angular.module("phoneApp").factory("AuthFactory",["$location","$rootScope","$http","$window","$q","ServerUrl","trace",function(a,b,c,d,e,f,g){var h=[],i=function(){return e(function(a,d){c.get(f+"/admin/users").success(function(b){angular.copy(b,h),a(b)}).error(function(a,c,e,f){d(a),b.alert="Unsuccessful attempt to retreive all users because:"+a+"\n"+c})})},j=function(a){return c.post(f+"/login",a).success(function(a,c,e,f){s(a),b.currentUser=JSON.parse(d.localStorage.getItem("cmi-user"))}).error(function(a,c,d,e){b.$broadcast("alert",{alert:"Your email and/or password are incorrect.",status:c})})},k=function(){return c.get(f+"/logout").success(function(a,c,e,f){d.localStorage.removeItem("cmi-user"),b.currentUser=null})},l=function(){return!!d.localStorage.getItem("cmi-user")},m=function(a){return c.post(f+"/admin/users",a).success(function(a,c,d,e){b.$broadcast("alert",{alert:"New user successfully created.",status:c})}).error(function(a,c,d,e){b.$broadcast("alert",{alert:"There was a problem with your request: "+a,status:c})})},n=function(a){return c.patch(f+"/admin/users/"+a.id,{user:a}).success(function(a,c,d,e){b.confirmed=!0,b.$broadcast("alert",{alert:"User: "+a.firstname+" "+a.lastname+" updated successfully.",status:c}),s(a)}).error(function(a,c,d,e){b.$broadcast("alert",{alert:"There was a problem and the user was not updated successfully: "+a,status:c})})},o=function(a){return e(function(d,e){c["delete"](f+"/admin/users/"+a).success(function(a,c,e,f){b.$broadcast("alert",{alert:"User deleted.",status:c}),d(a,c,e,f)}).error(function(a,c,d,f){b.$broadcast("alert",{alert:"Failed to delete user.",status:c}),e(a,c,d,f)})})},p=function(){return b.currentUser=JSON.parse(d.localStorage.getItem("cmi-user"))},q=function(a){return c.get(f+"/resetpassword?email="+a.email)},r=function(a){return c.patch(f+"/admin/users/"+a.id,{user:a}).success(function(a,c,d,e){g(a),b.$broadcast("alert",{alert:"Your password was successfully changed.",status:c})}).error(function(a,c,d,e){g("error changing new password: ",a,c,d,e),b.$broadcast("alert",{alert:"Your password was not successfully changed.",status:c})})},s=function(a){d.localStorage.setItem("cmi-user",JSON.stringify(a)),c.defaults.headers.common.Authorization="Token token="+a.token};return{users:h,fetchUsers:i,login:j,logout:k,isAuthenticated:l,postNewUser:m,updateUser:n,deleteUser:o,currentUser:p,sendPasswordLink:q,submitNewPassword:r}}]),angular.module("phoneApp").factory("PhoneFactory",["trace","$rootScope","$http","$q","ServerUrl",function(a,b,c,d,e){var f=[],g=function(b){return d(function(d,f){c.get(e+"/venues/"+b+"/phones").success(function(a,b,c,e){d(a)}).error(function(b,c,d,e){f(b,c,d,e),a(b,c,d,e,"phone request failed.")})})},h=function(){return d(function(a,b){c.get(e+"/phones").success(function(b,c,d,e){angular.copy(b,f),a(b)}).error(function(a,c,d,e){b(a)})})},i=function(a){return d(function(d,f){c.post(e+"/venues/"+a.phone.venue_id+"/phones",a).success(function(a,c,e,f){b.$broadcast("alert",{alert:"The phone has been created.",status:c}),d(a)}).error(function(a,c,d,e){b.$broadcast("alert",{alert:"There was an error and the requested action failed.",status:c}),f(a,c,d,e)})})},j=function(a){return d(function(d,f){c["delete"](e+"/venues/"+a.phone.venue.id+"/phones/"+a.phone.id).success(function(a,c,e,f){b.$broadcast("alert",{alert:"The phone has been deleted.",status:c}),d(a)}).error(function(a,c,d,e){b.$broadcast("alert",{alert:"There was an error and the requested action failed.",status:c}),f(a,c,d,e)})})},k=function(a){var f,g;for(var h in a)f=a[h].button_id.toString(),g=a[h].story_id.toString();return d(function(a,d){c.patch(e+"/buttons/"+f,{button:{story_id:g}}).success(function(c,d,e,f){b.$broadcast("alert",{alert:"Button "+c.assignment+" was successfully changed to "+c.story.title+". Changes to your phone will take effect tomorrow.",status:d}),a(c)}).error(function(a,c,e,f){b.$broadcast("alert",{alert:"Sorry, there was an issue with that request.",status:c}),d(a,c,e,f)})})},l=function(a){return d(function(d,f){c.get(e+"/venues/"+a.venue.id+"/phones/"+a.id+"/call_the_phone").success(function(a,c,e,f){b.$broadcast("alert",{alert:"Phone was called",status:c}),d(a)}).error(function(a,c,d,e){b.$broadcast("alert",{alert:"Sorry, there was a problem.",status:c}),f(a,c,d,e)})})};return{fetch:g,phones:f,get:h,post:i,assignButton:k,destroy:j,callThePhone:l}}]),angular.module("phoneApp").factory("VenueFactory",["trace","$window","$rootScope","ServerUrl","$q","$http",function(a,b,c,d,e,f){var g=[],h=function(){return e(function(a,b){f.get(d+"/venues").success(function(b){return angular.copy(b,g),a(b)}).error(function(a,c,d,e){return b(a,c,d,e)})})},i=function(a){return e(function(b,c){f.get(d+"/venues/"+a).success(function(a){b(a)}).error(function(a,b,d,e){c(a,b,d,e)})})},j=function(a){return a.venue.user_ids=n(a.venue.user_ids),e(function(b,e){f.post(d+"/venues",a).success(function(a,d,e,f){c.$broadcast("alert",{alert:"Your venue was successfully created",status:d}),b(a)}).error(function(a,b,d,f){c.$broadcast("alert",{alert:"Sorry, there was an issue with that request: Status "+b,status:b}),e(a)})})},k=function(a,b){return e(function(e,g){f.put(d+"/venues/"+b,a).success(function(a,b,d,f){c.$broadcast("alert",{alert:"Venue "+a.name+" updated",status:b}),e(a,b,d,f)}).error(function(a,b,d,e){c.$broadcast("alert",{alert:"Update failed.",status:b}),g(a,b,d,e)})})},l=function(a,b){var g={venue:{story_ids:[b]}};return e(function(b,e){f.patch(d+"/venues/"+a,g).success(function(a,d,e,f){c.$broadcast("alert",{alert:"The story was added successfully",status:d}),b(a,d,e,f)}).error(function(a,b,c,d){e(a,b,c,d)})})},m=function(a){return e(function(b,e){f["delete"](d+"/venues/"+a.venue.id).success(function(a){c.alert="Your venue was successfully deleted",b(a)}).error(function(a,b,d,f){c.alert="Sorry, there was an issue with that request: Status "+b,e(a)})})},n=function(a){var b=[];for(var c in a)a[c].checked&&b.push(c);return b};return{fetch:h,fetchOne:i,venues:g,post:j,addStoryToVenue:l,patch:k,destroy:m}}]),angular.module("phoneApp").factory("StoryFactory",["trace","$window","$rootScope","ServerUrl","$q","$http","AWSFactory","AmazonBucket",function(a,b,c,d,e,f,g,h){var i=[],j={},k=function(){return e(function(b,c){f.get(d+"/stories").success(function(a){angular.copy(a,i),b(a)}).error(function(b,c,d,e){a(b,c,d,e)})})},l=function(b){return e(function(c,e){f.get(d+"/stories/"+b).success(function(a){c(a)}).error(function(b,c,d,f){a(b,c,d,f),e(b,c,d,f)})})},m=function(){return e(function(a,b){f.get(d+"/stories/story_data").success(function(b,c,d,e){angular.copy(b,j),a(b,c,d,e)}).error(function(a,c,d,e){b(a,c,d,e)})})},n=function(a,b){return a.story.story_type=p(a.story.story_type),b&&(a.story.url=b),e(a.story.id?function(b,e){f.put(d+"/stories/"+a.story.id,a).success(function(a,d,e,f){c.$broadcast("alert",{alert:"The story "+a.title+" was updated successfully",status:d}),b(a,d,e,f)}).error(function(b,d,f,g){c.$broadcast("alert",{alert:"The story "+a.title+" failed to update.",status:d}),e(b,d,f,g)})}:function(b,e){f.post(d+"/stories",a).success(function(a,d,e,f){c.$broadcast("alert",{alert:"The story was created successfully.",status:d}),b(a)}).error(function(a,b,d,f){c.$broadcast("alert",{alert:"There was an error and the story was not created successfully.",status:b}),e(a,b,d,f)})})},o=function(a){return e(function(b,e){f["delete"](d+"/stories/"+a.story.id).success(function(d,e,f,g){c.$broadcast("alert",{alert:"Story "+a.story.title+" was successfully deleted",status:e}),b(d)}).error(function(a,b,c,d){e({data:a,status:b,headers:c,config:d})})})},p=function(a){return a?a.toLowerCase().replace(/[\-\s\—\–\”’“‘\',;]/,""):void 0};return{fetch:k,fetchOne:l,fetchData:m,stories:i,storyData:j,post:n,destroy:o,normalize:p}}]),angular.module("phoneApp").factory("AWSFactory",["$http","$q","$rootScope","ServerUrl","AmazonBucket","trace",function(a,b,c,d,e,f){var g=function(c){var e="?filename="+c.name+"&filetype="+c.type;return b(function(b,c){a.get(d+"/amazon/sign_key"+e).success(function(a,c,d,e){return b(a)}).error(function(a,b,d,e){return c(a,b,d.config)})})},h=function(b){return g(b).then(function(d){a.post(e,i(b,d),{transformRequest:angular.identity,headers:{"Content-Type":void 0,Authorization:""}}).success(function(a,b,d,e){return c.awsResponse={response:a,status:b,headers:d,config:e},{response:a,status:b,headers:d,config:e}}).error(function(a,b,d,e){return c.$broadcast("alert",{alert:"There was an error: \nResponse: "+a+"\nStatus: "+b,status:b}),{response:a,status:b,headers:d,config:e}})})},i=function(a,b){var c=new FormData;return c.append("key",b.key),c.append("AWSAccessKeyId",b.access_key),c.append("policy",b.policy),c.append("acl","public-read"),c.append("signature",b.signature),c.append("Content-Type",a.type),c.append("file",a),c};return{sendToAmazon:h}}]),angular.module("phoneApp").factory("ButtonFactory",["$rootScope","$http","$q","ServerUrl","trace",function(a,b,c,d,e){var f=[],g=[],h=[],i=[],j=[],k=function(){return c(function(a,c){b.get(d+"/buttons/index_fixed").success(function(b,c,d,e){a(b,c,d,e)}).error(function(a,b,d,e){c(a,b,d,e)})})},l=function(){return c(function(a,c){b.get(d+"/buttons/index_star").success(function(b,c,d,e){angular.copy(b,g),a(b,c,d,e)}).error(function(a,b,d,e){c(a,b,d,e)})})},m=function(){return c(function(a,c){b.get(d+"/buttons/index_hash").success(function(b,c,d,e){angular.copy(b,h),a(b,c,d,e)}).error(function(a,b,d,e){c(a,b,d,e)})})},n=function(){return c(function(a,c){b.get(d+"/buttons/index_zero").success(function(b,c,d,e){angular.copy(b,i),a(b,c,d,e)}).error(function(a,b,d,e){c(a,b,d,e)})})},o=function(){return c(function(a,c){b.get(d+"/buttons/index_postroll").success(function(b,c,d,e){angular.copy(b,j),a(b,c,d,e)}).error(function(a,b,d,e){c(a,b,d,e)})})},p=function(a){return c(function(c,e){b.post(d+"/buttons/update_fixed",a).success(function(a,b,d,e){c(a,b,d,e)}).error(function(a,b,c,d){e(a,b,c,d)})})},q=function(e){return c(function(c,f){b.post(d+"/buttons/update_fixed",e).success(function(b,d,e,f){a.$broadcast("alert",{alert:"The button was updated successfully.",status:d}),c(b,d,e,f)}).error(function(b,c,d,e){a.$broadcast("alert",{alert:"There was a problem and the button was not updated.",status:c}),f(b,c,d,e)})})};return{updateFixedStory:p,indexFixed:k,fixedStories:f,indexStar:l,indexHash:m,indexZero:n,indexPostroll:o,starStories:g,hashStories:h,zeroStories:i,postrollStories:j,postFixed:q}}]),angular.module("phoneApp").filter("venuesFilter",["trace",function(a){}]),angular.module("MainDirective").directive("navbar",["trace",function(a){return{restrict:"E",templateUrl:"views/navbar.html",controller:"NavbarController",controllerAs:"navbarController",bindToController:!0,link:function(a,b,c){}}}]),angular.module("MainDirective").directive("sidenav",["trace",function(a){return{restrict:"E",templateUrl:"views/sidenav.html",controller:"SidenavController",controllerAs:"sidenavController",bindToController:!0,link:function(a,b,c){}}}]),angular.module("MainDirective").directive("cmiDashboard",["trace",function(a){return{restrict:"E",templateUrl:"views/admin-dashboard.html",controller:"DashboardController",controllerAs:"dashboardController",bindToController:!0,link:function(a,b,c){}}}]),angular.module("MainDirective").directive("cmiPhoneShowDashboard",["trace",function(a){return{restrict:"E",scope:"=",templateUrl:"views/phone-show-dashboard.html",controller:"VenueController",controllerAs:"venueController",bindToController:!0,link:function(a,b,c){}}}]),angular.module("MainDirective").directive("cmiAdminPhoneDashboard",["PhoneFactory","trace",function(a,b){return{restrict:"E",templateUrl:"views/admin-phone-dashboard.html",controller:"DashboardController",controllerAs:"dashboardController",bindToController:!0,link:function(a,b,c){}}}]),angular.module("MainDirective").directive("cmiStoryDashboard",["trace","$rootScope",function(a,b){return{restrict:"E",templateUrl:"views/story-dashboard.html",controller:"DashboardController",controllerAs:"dashboardController",bindToController:!0,link:function(a,c,d){var e=$("#storyStatusSelect"),f=$("#storyVenueField");f.hide(),e.on("change",function(a){"venue"===this.value.replace(/\s/,"")?f.show():f.hide().val("")}),a.editStory=function(a){b.$broadcast("editStory",{story:a})}}}}]),angular.module("MainDirective").directive("cmiFormsDashboard",["trace",function(a){return{restrict:"E",templateUrl:"views/forms-dashboard.html",controller:"FormsController",controllerAs:"formsController",bindToController:!0,link:function(a,b,c){}}}]),angular.module("MainDirective").directive("ngConfirmClick",["trace","$window",function(a,b){return{restrict:"A",replace:!1,scope:"=",link:function(a,c,d){var e=d.ngConfirmClick||"Are you sure?",f=d.confirmedClickAction;c.bind("click",function(c){b.confirm(e)&&a.$eval(f)})}}}]),angular.module("MainDirective").directive("cmiVenueDashboard",["VenueFactory","trace",function(a,b){return{restrict:"E",templateUrl:"views/venue-dashboard.html",controller:"DashboardController",controllerAs:"dashboardController",bindToController:!0,link:function(a,b,c){}}}]),angular.module("MainDirective").directive("ajaxSpinner",["trace","$http",function(a,b){return{restrict:"A",link:function(a,c,d){a.isLoading=function(){return b.pendingRequests.length>0},a.$watch(a.isLoading,function(a){a?(c.addClass("active").find("i.fa").addClass("fa-cog fa-spin"),$("html, body").addClass("ajax-progress")):(c.removeClass("active").find("i.fa").removeClass("fa-cog fa-spin"),$("html, body").removeClass("ajax-progress"))})}}}]),angular.module("MainDirective").directive("cmiDialListitem",["trace","$compile",function(a,b){return{restrict:"EA",scope:{button:"="},compile:function(){return function(a,b,c){var d,e;a.$watch("button",function(a,c){null!==typeof a&&("null"!=typeof a&&0===Object.keys(a).length,d=b.find(".button-story"),e=b.find(".button-story .audio audio"))})}}}}]),angular.module("MainDirective").directive("cmiAudioPlayer",["$rootScope","trace",function(a,b){return{restrict:"E",templateUrl:"views/audio-player.html",scope:{url:"@"},link:function(a,b,c){var d=b.find("audio");a.playing=!1,a.toggleAudio=function(){a.playing===!0?d[0].pause():d[0].play(),a.playing=!a.playing}}}}]),angular.module("MainDirective").directive("cmiDraggable",["$rootScope","trace",function(a,b){return{restrict:"EA",compile:function(){return function(a,b,c){var d,e;a.$on("onRepeatDone",function(a,b){}),$(b).draggable({cursor:"pointer",revert:"invalid",drag:function(a,b){},start:function(a,b){d=$(this).width(),e=$(this).height(),$(this).animate({width:$(".droppable").first().css("width"),height:$(".droppable").first().css("height")}),b.helper.dropped=!1},stop:function(a,b){b.helper.dropped===!1&&$(this).animate({width:d,height:e})}}),a.$last&&a.$emit("onRepeatDone",{e:b,a:c})}}}}]),angular.module("MainDirective").directive("cmiDroppable",["$rootScope","trace",function(a,b){return{restrict:"EA",scope:{button:"="},compile:function(){return function(b,c,d){setTimeout(function(){$(c).droppable({drop:function(c,d){var e,f=angular.element(d.draggable).data("uid"),g=(angular.element(d.draggable).parent(),angular.element(this),$(d.draggable).offset().left-$(this).offset().left),h=$(d.draggable).offset().top-$(this).offset().top,i=parseInt($(d.draggable).css("left"))-g,j=parseInt($(d.draggable).css("top"))-h,k=parseInt($(this).css("width")),l=parseInt($(this).css("height"));$(d.draggable).animate({width:k,height:l,top:j,left:i},100,function(){$(this).fadeOut(400,function(){$(this).remove()})}),d.helper.dropped=!0,e=b.$parent.phoneController.availableStories.filter(function(a,b,c){return a.id===f?a:void 0})[0],void 0===e&&(e=b.$parent.phoneController.availableFixedStories.filter(function(a,b,c){return a.id===f?a:void 0})[0]),a.$broadcast("droppedElement",{dragObj:e,dropObj:b.button}),b.$apply()},hoverClass:"cmi-droppable-hover",revert:"invalid",disabled:$(c).hasClass("nonEditable")})},1e3)}}}}]),angular.module("MainDirective").directive("cmiAlert",["$rootScope","trace",function(a,b){return{restrict:"E",templateUrl:"views/alert.html",link:function(a,b,c){a.dismissAlert=function(){var b=$(".alert");b.fadeOut(250,function(){a.alert=""})},a.$on("alert",function(b,c){a.alert=c.alert,a.status=c.status,setTimeout(function(){a.dismissAlert()},1e4)})}}}]),angular.module("MainDirective").directive("sticky",["$rootScope","$window","trace",function(a,b,c){return{restrict:"EA",link:function(a,c,d){angular.element(b).bind("scroll",function(){var a=b.pageYOffset,d=$(c).offset().top,e=$(c).parent().offset().top,f=d-a,g=e-a,h=c.width();0>=f&&($(c).addClass("sticky"),c.width(h)),g>0&&($(c).removeClass("sticky"),c.width(""))})}}}]),angular.module("MainDirective").directive("paginate",["$rootScope","$window","trace",function(a,b,c){return{restrict:"EA",link:function(a,c,d,e,f){var g=(c.height(),b.innerHeight);a.$on("onRepeatDone",function(b,d){a.totalChildren=c.children().length}),a.$watch("totalChildren",function(b,e){if(b>d.maxItems){for(var f=Math.ceil(a.totalChildren/d.maxItems),h=c.find(".pagination"),i="",j=1;f>=j;j++)i+="<li><a data-page="+j.toString()+">"+j.toString()+"</a></li>";$(h).html(i),$(c[0].parentElement).height()>g&&(c.height(g),h.addClass("fixed"))}})},controller:["$scope","$element",function(a,b){}]}}]),angular.module("MainController").controller("NavbarController",navbarController),navbarController.$inject=["trace","$location","AuthFactory"],angular.module("MainController").controller("LoginController",loginController),loginController.$inject=["$rootScope","$location","AuthFactory","trace"],angular.module("MainController").controller("SidenavController",sidenavController),sidenavController.$inject=["trace","$location","$routeParams"],angular.module("MainController").controller("DashboardController",dashboardController),dashboardController.$inject=["trace","VenueFactory","PhoneFactory","StoryFactory","storyTypes"],angular.module("MainController").controller("HomeController",homeController),homeController.$inject=["trace","$location","AuthFactory"],angular.module("MainController").controller("FormsController",formsController),formsController.$inject=["trace","$q","AuthFactory","PhoneFactory","StoryFactory","VenueFactory","AWSFactory","$rootScope","$scope"],angular.module("MainController").controller("VenueController",venueController),venueController.$inject=["trace","$rootScope","$location","$routeParams","AuthFactory","VenueFactory","PhoneFactory","StoryFactory"],angular.module("MainController").controller("PhoneController",phoneController),phoneController.$inject=["$rootScope","$scope","AuthFactory","StoryFactory","PhoneFactory","VenueFactory","ButtonFactory","$sceDelegate","trace"],angular.module("MainController").controller("UserController",userController),userController.$inject=["$rootScope","$scope","AuthFactory","trace"];