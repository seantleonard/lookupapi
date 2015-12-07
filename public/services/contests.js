angular
  .module('radioTool')
  .factory('Contest', function($http) {
    return {
      retrieveAll: function() {
        return $http.get('/scrape').then(function(response) {
          return response.data;
        });
      }
    }
  });
