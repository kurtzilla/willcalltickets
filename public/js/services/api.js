(function() {
angular.module('MyApp')
    .factory('Api', Api);

Api.$inject = ['$http'];

function Api($http) {
    return {
      send: function(data) {
        return $http.post('/api', data);
      }
    };
}
})();
