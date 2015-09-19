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
      addMarkers($scope.results);
    });
    responsePromise.error(function (response) {
      $scope.results = [];
      $('#list').html('Sorry, something went wrong with the search');
    });
  };

}]);

function testMarker () {
  // Test addition of marker onto map
  // 37.379365 Long: -122.07255

  var lat = 37.379365
  var long = -122.07255
  var name = 'Some place'

  var marker = new google.maps.Marker({
    position: { lat: lat, lng: long },
    map: map,
    title: name
  });

  markers.push(marker);
}

var map;
var markers = [];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.393753, lng: -122.083477},
    zoom: 14
  });
}

function addMarker (business) {
  debugger
  var lat = business.location.coordinate.latitude;
  var long = business.location.coordinate.longitude;
  var name = business.name;

  var marker = new google.maps.Marker({
    position: { lat: lat, lng: long },
    map: map,
    title: name
  });

  markers.push(marker);
}

function addMarkers (businesses) {
  var business;
  for (var i = 0; i < businesses.length; i++) {
    business = businesses[i];
    addMarker(business);
  }
}

$(document).ready(function () {
  initMap();
  testMarker();
});
