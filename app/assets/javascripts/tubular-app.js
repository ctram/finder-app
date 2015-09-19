  // var oauth = OAuth({
  //   consumer: {
  //     public: 'W1BjNrPnZRlvG6kJaa3dQg',
  //     secret: 'OI7kyEW_uuVw5G3nZZodfY6BjqA'
  //   },
  //   signature_method: 'HMAC-SHA1'
  // });
  //
  // // http://api.yelp.com/v2/search?term=food&location=San+Francisco
  //
  // var request_data = {
  //   // url: 'http://api.yelp.com/v2/search',
  //   url: 'http://www.google.com',
  //
  //   method: 'POST',
  //   data: {
  //     status: 'Hello Ladies + Gentlemen, a signed OAuth request!'
  //   }
  // };
  //
  // var token = {
  //   public: '-eERvtTjNeTI4CbOblkP34eAii7JLLpr',
  //   secret: '9EdVIozIGN_vVRoPTak84QPKxhQ'
  // };
  //
  // function testAPIRequest () {
  //   $.ajax({
  //     url: request_data.url,
  //     type: request_data.method,
  //     data: oauth.authorize(request_data, token),
  //     crossDomain: true
  //   }).done(function(data) {
  //     debugger;
  //     console.log(data);
  //   });
  // }
  //
  // function testAPIRequest2 () {
  //   $.ajax({
  //     url: 'http://google.com',
  //     type: 'get'
  //     // data: oauth.authorize(request_data, token),
  //     // crossDomain: true
  //   });
  // }
  //
  // // testAPIRequest2();
  // // testAPIRequest();
angular.module('finderApp', [])
  .controller('ResultsListController', function () {
    var resultsList = this;
    resultsList.results = [];

    resultsList.submitSearch = function () {
      var query = $('#input-box').val();
      if (query !== '') {
        getSearchResults(query);
      }
    }
  });

function renderResults (data) {
  if (data === null) {
    return;
  }
  var businesses = data.businesses;
  var business;
  var lat;
  var long
  $list = $('#list');
  $list.html('');
  for (var i = 0; i < businesses.length; i++) {
    business = businesses[i];
    name = business.name;
    lat = business.location.coordinate.latitude;
    long = business.location.coordinate.longitude;
    $list.append("<li><b>" + business.name + "</b> Lat: " + lat + "; Long: " + long + "</li>");
  }
}

function getSearchResults (query) {
  $.ajax({
    url: '/search',
    type: 'get',
    data: {query: query},
    success: renderResults,
    error: function () {
      $('#list').html('Something went wrong with the search : [ <BR><BR>Please try again!')
    }
  });
}

var map;

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}

$(document).ready(function () {
  getSearchResults();
  initMap();
});
