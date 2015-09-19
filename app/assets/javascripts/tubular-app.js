var resultsList
var finderApp = angular.module('finderApp', []);

finderApp.controller('ResultsListController', ['$scope', '$http', function ($scope, $http) {
  var sampleResult = {name: 'asd', location: {coordinate: {latitude: 'asd', longitude: 'asd'}}};
  $scope.results = [sampleResult];

  $scope.submitSearch = function () {
    var query = $('#input-box').val();
    if (query !== '') {
      $scope.getSearchResults(query);
    }
  };

  $scope.getSearchResults = function (query) {
    // Default query
    if (query === undefined) {
      query = 'San+Francisco';
    }
    var responsePromise = $http.get('/search?query=' + query);
    responsePromise.success(function (response) {
      $scope.results = response.businesses;
    });
    responsePromise.error(function (response) {

    });
  };

}]);

var map;

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}

$(document).ready(function () {
  initMap();
});
