angular.module('starter.services', [])

.factory('FeedService', function($http) {

  var feeds = {
      section_a: "http://ashdod10.co.il/get/k2/items?cats=2&limit=11&page=1",
      section_b: "http://ashdod10.co.il/get/k2/items?cats=3&limit=11&page=1",
      section_c: "http://ashdod10.co.il/get/k2/items?cats=17&limit=11&page=1"
  };

    var content = "http://ashdod10.co.il/get/k2/items?id="

  return {
    getSectionContent: function(section, successCallback, errorCallback){
      $http.get(feeds[section])
        .success(function(data, status, headers, config) {
          successCallback(data);
        })
        .error(function(data, status, headers, config) {
          errorCallback(status);
        });
    },
    getContentItem: function(id, successCallback, errorCallback){
      $http.get(content + id)
        .success(function(data, status, headers, config) {
          successCallback(data);
        })
        .error(function(data, status, headers, config) {
          errorCallback(status);
        });
    }
  }
});
