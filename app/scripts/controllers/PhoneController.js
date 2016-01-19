'use strict';
function phoneController($rootScope, $scope, AuthFactory, StoryFactory, PhoneFactory, VenueFactory, ButtonFactory, $sceDelegate, trace) {
  var vm = this;
  vm.currentPhone = {};
  vm.venues = [];
  vm.ishmaelStories = [];
  vm.availableStories = [];
  vm.starAssignments = ButtonFactory.starStories;
  vm.zeroAssignments = ButtonFactory.zeroStories;
  vm.hashAssignments = ButtonFactory.hashStories;
  vm.postrollAssignments = ButtonFactory.postrollStories;
  vm.availableFixedStories = [];

  PhoneFactory.fetch($rootScope.currentUser.venues[0].id).then(function (response) {
    angular.copy(response[0], vm.currentPhone);
    _getStories();
    _collectUserVenues();
  });

  vm.isFixed = function (object) {
    for (var i in object) {
      if (object.hasOwnProperty(i)) {
        return i === '*' || i === '#' || i === '0' || i === 'PR';
      }
    }
  };

  $scope.storyTypeName = function (type) {
    switch (type) {
      case 'venue':
        return 'Venue';
      case 'ishmaels':
        return 'Ishmael';
      default:
        return type;
    }
  };

  $scope.yesNo = function(yn) {
    return yn ? 'yes' : 'no';
  };

  $scope.$on('droppedElement', function (e, args) {
    var drag = args.dragObj, drop = args.dropObj, prevStoryId, buttonToEdit;
    buttonToEdit = _getButtonToEdit(drop);
    _spliceStoryFromAvailable(drag);

    if (buttonToEdit.assignment === '*' || buttonToEdit.assignment === '#' || buttonToEdit.assignment === '0' || buttonToEdit.assignment === 'PR') {
      prevStoryId = buttonToEdit.story.id;
      buttonToEdit = {
        button: {
          story_id: drag.id,
          assignment: buttonToEdit.assignment
        }
      };
    } else {
      for (var i in buttonToEdit) {
        prevStoryId = buttonToEdit[i].story_id;
        buttonToEdit[i].title = drag.title;
        buttonToEdit[i].url = drag.url;
        buttonToEdit[i].story_id = drag.id;
      }
    }

    if (typeof prevStoryId !== 'undefined') {
      $scope.$apply(_getStory(prevStoryId));
    }

    if (typeof buttonToEdit.button !== 'undefined') {
      ButtonFactory.postFixed(buttonToEdit).then(function (response) {
        var assignment = '';
        angular.forEach(response, function (value, index) {
          console.log(value.assignment);
          assignment = value.assignment;
        });
        switch (assignment) {
          case '*':
            ButtonFactory.indexStar();
            break;
          case '#':
            ButtonFactory.indexHash();
            break;
          case '0':
            ButtonFactory.indexZero();
            break;
          case 'PR':
            ButtonFactory.indexPostroll();
            break;
          default:
            break;
        }
      });
    } else {
      PhoneFactory.assignButton(buttonToEdit).then(function (response) {
        // $('.alert').addClass('success').find('p').prepend('<i class="fa fa-check">');
      });
    }

  });

  // PRIVATE METHODS

  var _getStories = function () {
    StoryFactory.fetch().then(function (response) {
      _pushToAvailable(_filterIshmaelStories(response));
    });
  };

  var _getStory = function (id) {
    StoryFactory.fetchOne(id).then(function (response) {
      vm.availableStories.push(response);
    });
  };

  var _getFixedStories = function () {
    StoryFactory.fetch().then(function (response) {
      angular.forEach(response, function (value, index) {
        if (value.story_type === 'fixed' || value.story_type === 'postroll') {
          vm.availableFixedStories.push(value);
        }
      });
    });
  };

  var _collectUserVenues = function () {
    angular.forEach($rootScope.currentUser.venues, function (value, index, array) {
      VenueFactory.fetchOne(value.id).then(function (response) {
        vm.venues.push(response);
        _pushToAvailable(response.stories);
      });
    });
  };

  var _pushToAvailable = function (array) {
    angular.forEach(array, function (value, index, array) {
      if (!(_onPhone(value.id))) {
        vm.availableStories.push(value);
      }
    });
  };

  var _onPhone = function (id) {
    var array = vm.currentPhone.buttons.filter(function (value, index, array) {
      var prop = Object.getOwnPropertyNames(value)[0];
      if (value[prop] === null) {
        return;
      } else {
        var storyId = value[prop].story_id.toString();
        return storyId === id.toString();
      }
    });
    return array.length > 0;
  };

  var _filterIshmaelStories = function (array) {
    return array.filter(function (value) {
      if (value.story_type === 'ishmaels') {
        return value;
      }
    });
  };

  var _getButtonToEdit = function (obj) {
    if (obj.assignment === '*' || obj.assignment === '#' || obj.assignment === '0' || obj.assignment === 'PR') {
      return obj;
    } else {
      return vm.currentPhone.buttons.filter(function (value, index, array) {
        for (var i in value) {
          if (i === Object.keys(obj)[0]) {
            return value;
          }
        }
      })[0];
    }
  };

  var _spliceStoryFromAvailable = function (obj) {
    if (typeof obj === 'undefined') {
      return;
    }
    angular.forEach(vm.availableStories, function (value, index) {
      if (value.id === obj.id) {
        vm.availableStories.splice(index, 1);
      }
    });
  };

  if ($rootScope.currentUser.role === 'admin') {
    _getFixedStories();
  }
}

angular.module('MainController').controller('PhoneController', phoneController);
phoneController.$inject = ['$rootScope', '$scope', 'AuthFactory', 'StoryFactory', 'PhoneFactory', 'VenueFactory', 'ButtonFactory', '$sceDelegate', 'trace'];
