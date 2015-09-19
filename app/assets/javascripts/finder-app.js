// TODO: add separate input field for location, like how Yelp is setup
var finderApp = angular.module('finderApp', []);

finderApp.controller('ResultsListController', ['$scope', '$http', function ($scope, $http) {
  var searchInMap = false;

  $scope.results = []; // To hold business results sourced from Yelp API

  // Bound to "Search Within Map" checkbox
  $scope.searchInMap = {
    value: false
  }

  $scope.getSearchResults = function (query) {
    // Default query
    if (query === undefined) {
      query = 'San+Francisco';
    }

    var fragmentLocationQuery = ''; // Location search is bound to; Defaults to empty string, i.e. search will NOT be bound to a location by default

    // If user wants to restrict search within the map...
    if ($scope.searchInMap.value) {
      var curViewportCoor = {lat: map.center.H, lng: map.center.L};
      fragmentLocationQuery = "&nearbyCoor=" + curViewportCoor.lat + ',' + curViewportCoor.lng
    }

    var responsePromise = $http.get('/search?query=' + query + fragmentLocationQuery);

    responsePromise.success(function (response) {
      $scope.results = response.businesses;
      clearMarkers();
      addMarkers($scope.results);
      var ctrOfResults = findCenterOfResults($scope.results);

      repositionMap(ctrOfResults);
    });

    responsePromise.error(function (response) {
      $scope.results = [];
      $('#list').html('Sorry, something went wrong with the search');
    });
  };

  $scope.startMarkerBounce = function () {
    var $business = $(event.currentTarget);
    var name = $business.data('name');

    // HACK: must be a better way than iterating through all the markers to find the right one - check API or put markers into a hash
    for (var i = 0; i < markers.length; i++) {
      if (markers[i].title === name) {
        markers[i].setAnimation(google.maps.Animation.BOUNCE);
        return
      }
    }
  }

  $scope.stopMarkerBounce = function () {
    var $business = $(event.currentTarget);
    var name = $business.data('name');
    for (var i = 0; i < markers.length; i++) {
      if (markers[i].title === name) {
        markers[i].setAnimation(null)
        return
      }
    }
  }

  $scope.submitSearch = function () {
    var query = $('#input-box').val(); // TODO: switch out jQuery call with better use of directive
    if (query !== '') {
      $scope.getSearchResults(query);
    }
  };
}]);

var map;
var markers = [];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.393753, lng: -122.083477},
    zoom: 12
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

function findCenterOfResults (businesses) {

  var minLat, minLng, maxLat, maxLng, lat, lng, ctrCoordinate;

  for (var i = 0; i < businesses.length; i++) {
    lat = businesses[i].location.coordinate.latitude;
    lng = businesses[i].location.coordinate.longitude;
    if (minLat === undefined || minLat > lat) {
      minLat = lat;
    }
    if (maxLat === undefined || maxLat < lat) {
      maxLat = lat;
    }
    if (minLng === undefined || minLng > lng) {
      minLng = lng;
    }
    if (maxLng === undefined || maxLng < lng) {
      maxLng = lng;
    }
  }

  var ctrLat = maxLat - Math.abs((maxLat - minLat) / 2);
  var ctrLng = maxLng - Math.abs((maxLng - minLng) / 2);
  ctrCoordinate = {lat: ctrLat, lng: ctrLng};
  return ctrCoordinate;
}

function repositionMap (coordinate) {
  map.panTo(coordinate)
}

$(document).ready(function () {
  initMap();
});
