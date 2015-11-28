angular.module('starter.services', [])

.factory('FeedService', function ($http) {

    var feeds = {
        news: "http://ashdod10.co.il/get/k2/items?cats=2",
        sport: "http://ashdod10.co.il/get/k2/items?cats=3",
        culture: "http://ashdod10.co.il/get/k2/items?cats=17"
    };

    var content = "http://ashdod10.co.il/get/k2/items?id="

    return {
        getK2CategoryContent: function (category, limit, page, successCallback, errorCallback) {
            $http.get(feeds[category] + "&limit=" + limit + "&page=" +page)
            .success(function (data, status, headers, config) {
                successCallback(category, data);
            })
            .error(function (data, status, headers, config) {
                errorCallback(status);
            });
        },
        getSectionContent: function (section, successCallback, errorCallback) {
            $http.get(feeds[section] + "&limit=11&page=1")
            .success(function (data, status, headers, config) {
                successCallback(data);
            })
            .error(function (data, status, headers, config) {
                errorCallback(status);
            });
        },
        getContentItem: function (id, successCallback, errorCallback) {
            $http.get(content + id)
              .success(function (data, status, headers, config) {
                  successCallback(data);
              })
              .error(function (data, status, headers, config) {
                  errorCallback(status);
              });
        }
    }
});
