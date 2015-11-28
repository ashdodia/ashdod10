angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('HomeCtrl', function ($scope, $state, $stateParams, $ionicPopup, FeedService) {
    //var module
    var homeModules = ["news", "sport", "culture"]
    var limit = 3
    var page = 1
    $scope.items = [];

    // still nedd to fix sucess and error functions as they are taken from SectionCtrl as is.
    $scope.successGetHomeContent = function (category, data) {
        $scope.maxIntro = 100;
        $scope.items[category] = [];
        $scope.items[category] = data.items;
        //for (var i = 0; i < $scope.items.category.length; i++) {
        //    $scope.items.category[i].content = $scope.items.category[i].content.replace(/<[^>]+>/gm, '');
        //    if ($scope.items.category[i].content.length > $scope.maxIntro) {
        //        $scope.items.category[i].content = $scope.items.category[i].content.substr(0, $scope.maxIntro) + '...';
        //    }
        //}
        console.log("============================= " + category + " =====================================")
        console.log(DumpObjectIndented($scope.items))
        console.log("==================================================================")


    };

    $scope.errorGetHomeContent = function (status) {
        $scope.showAlert = function () {
            var alertPopup = $ionicPopup.alert({
                title: 'Error reading section content',
                template: 'Please check your network connection'
            });
            alertPopup.then(function (res) {
                console.log('Error reading section content');
            });
        };
        $scope.showAlert();
    };

    for (module of homeModules) {
        $scope.items[module] = [];
        FeedService.getK2CategoryContent(module, limit, page, $scope.successGetHomeContent, $scope.errorGetHomeContent);
    }
    console.log("==================================================================")
    console.log(DumpObjectIndented($scope.items))
    console.log("==================================================================")

    $scope.goToContent = function (id) {
        $state.go('app.content', { contentId: id });
    };

})

.controller('SectionsCtrl', function ($scope, $state, $stateParams, $ionicPopup, FeedService) {

    $scope.items = [];

    $scope.successGetSectionContent = function (data) {
        $scope.maxIntro = 100;
        $scope.items = data.items;
        for (var i = 0; i < $scope.items.length; i++) {
            $scope.items[i].content = $scope.items[i].content.replace(/<[^>]+>/gm, '');
            if ($scope.items[i].content.length > $scope.maxIntro) {
                $scope.items[i].content = $scope.items[i].content.substr(0, $scope.maxIntro) + '...';
            }
        }
    };

    $scope.errorGetSectionContent = function (status) {
        $scope.showAlert = function () {
            var alertPopup = $ionicPopup.alert({
                title: 'Error reading section content',
                template: 'Please check your network connection'
            });
            alertPopup.then(function (res) {
                console.log('Error reading section content');
            });
        };
        $scope.showAlert();
    };

    FeedService.getSectionContent($stateParams.sectionId, $scope.successGetSectionContent, $scope.errorGetSectionContent);

    $scope.goToContent = function (id) {
        $state.go('app.content', { contentId: id });
    };

})

.controller('ContentCtrl', function ($scope, $state, $stateParams, $ionicPopup, FeedService) {

    $scope.item = null;

    $scope.successGetContentItem = function (data) {
        $scope.item = data;
    };

    $scope.errorGetContentItem = function (status) {
        $scope.showAlert = function () {
            var alertPopup = $ionicPopup.alert({
                title: 'Error reading content item',
                template: 'Please check your network connection'
            });
            alertPopup.then(function (res) {
                console.log('Error reading content item');
            });
        };
        $scope.showAlert();
    };

    FeedService.getContentItem($stateParams.contentId, $scope.successGetContentItem, $scope.errorGetContentItem);

});

function DumpObjectIndented(obj, indent) {
    var result = "";
    if (indent == null) indent = "";

    for (var property in obj) {
        var value = obj[property];
        if (typeof value == 'string')
            value = "'" + value + "'";
        else if (typeof value == 'object') {
            if (value instanceof Array) {
                // Just let JS convert the Array to a string!
                value = "[ " + value + " ]";
            }
            else {
                // Recursive dump
                // (replace "  " by "\t" or something else if you prefer)
                var od = DumpObjectIndented(value, indent + "  ");
                // If you like { on the same line as the key
                //value = "{\n" + od + "\n" + indent + "}";
                // If you prefer { and } to be aligned
                value = "\n" + indent + "{\n" + od + "\n" + indent + "}";
            }
        }
        result += indent + "'" + property + "' : " + value + ",\n";
    }
    return result.replace(/,\n$/, "");
}