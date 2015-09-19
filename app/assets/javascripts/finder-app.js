// TODO: search results are confined to the CURRENT location of the map
// TODO: map re-positions itself to best showcase the results AND show results that are based on the current location of the map - how can BOTH be implemented? seems to contradict each other.
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
      var ctrOfResults = findCenterOfResults($scope.results);

      repositionMap(ctrOfResults);
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

function startMarkerBounce (marker) {
  marker.setAnimation(google.maps.Animation.BOUNCE);
}

function stopMarkerBounce (marker) {
  marker.setAnimation(null);
}

$(document).ready(function () {
  initMap();
});