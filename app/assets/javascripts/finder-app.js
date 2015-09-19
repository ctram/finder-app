// TODO: search results are confined to the CURRENT location of the map
// TODO: map re-positions itself to best showcase the results - how can BOTH of these be done simultaneously?
// TODO: add separate input field for location, like how Yelp is setup

var finderApp = angular.module('finderApp', []);

finderApp.controller('ResultsListController', ['$scope', '$http', function ($scope, $http) {
  $scope.results = [];

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
      clearMarkers();
      addMarkers($scope.results);
    });
    responsePromise.error(function (response) {
      $scope.results = [];
      $('#list').html('Sorry, something went wrong with the search');
    });
  };

}]);

var map;
var markers = [];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.393753, lng: -122.083477},
    zoom: 14
  });
}

function addMarker (business) {

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

function clearMarkers () {
  var marker;
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}

$(document).ready(function () {
  initMap();
});
