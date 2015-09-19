var resultsList
var finderApp = angular.module('finderApp', []);

finderApp.controller('ResultsListController', function () {
  // Initialization of app
  var resultsList = this;
  resultsList.results = [];
  var defaultQuery = 'San Francisco'

  resultsList.submitSearch = function () {
    var query = $('#input-box').val();
    if (query !== '') {
      getSearchResults(query);
    }
  }

  function getSearchResults (query) {
    $.ajax({
      url: '/search',
      type: 'get',
      data: {query: query},
      success: function (data) {
        var businesses = data.businesses;
        var business;

        // resultsList.results = [];
        for (var i = 0; i < businesses.length; i++) {
          business = businesses[i];
          resultsList.results.push(business);
        }
        debugger
      },
      error: function () {
        $('#list').html('Something went wrong with the search : [ <BR><BR>Please try again!')
      }
    });
  }

});

// function renderResults (data) {
//   if (data === null) {
//     return;
//   }
//   var businesses = data.businesses;
//   var business;
//   var lat;
//   var long
//   $list = $('#list');
//   $list.html('');
//   for (var i = 0; i < businesses.length; i++) {
//     business = businesses[i];
//     name = business.name;
//     lat = business.location.coordinate.latitude;
//     long = business.location.coordinate.longitude;
//     $list.append("<li><b>" + business.name + "</b> Lat: " + lat + "; Long: " + long + "</li>");
//   }
// }

var map;

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}

$(document).ready(function () {
  // getSearchResults();
  initMap();
});
