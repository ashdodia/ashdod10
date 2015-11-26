angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('SectionsCtrl', function($scope, $state, $stateParams, $ionicPopup, FeedService) {

  $scope.items = [];

  $scope.successGetSectionContent = function(data) {
    $scope.maxIntro = 100;
    $scope.items = data.items;
    for (var i = 0; i < $scope.items.length; i++) {
      $scope.items[i].content = $scope.items[i].content.replace(/<[^>]+>/gm, '');
      if ($scope.items[i].content.length > $scope.maxIntro) {
        $scope.items[i].content = $scope.items[i].content.substr(0, $scope.maxIntro) + '...';
      }
    }
  };

  $scope.errorGetSectionContent = function(status) {
    $scope.showAlert = function() {
       var alertPopup = $ionicPopup.alert({
         title: 'Error reading section content',
         template: 'Please check your network connection'
       });
       alertPopup.then(function(res) {
         console.log('Error reading section content');
       });
     };
     $scope.showAlert();
  };

  FeedService.getSectionContent($stateParams.sectionId, $scope.successGetSectionContent, $scope.errorGetSectionContent);

  $scope.goToContent = function(id) {
    $state.go('app.content', { contentId: id });
  };

})

.controller('ContentCtrl', function($scope, $state, $stateParams, $ionicPopup, FeedService) {

  $scope.item = null;

  $scope.successGetContentItem = function(data) {
    $scope.item = data;
  };

  $scope.errorGetContentItem = function(status) {
    $scope.showAlert = function() {
       var alertPopup = $ionicPopup.alert({
         title: 'Error reading content item',
         template: 'Please check your network connection'
       });
       alertPopup.then(function(res) {
         console.log('Error reading content item');
       });
     };
     $scope.showAlert();
  };

  FeedService.getContentItem($stateParams.contentId, $scope.successGetContentItem, $scope.errorGetContentItem);

});
