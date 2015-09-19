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

    // resultsList.search = function () {
    //   var query = $('#input-box').val();
    //   if (query !== '') {
    //
    //   }
    // }

    resultsList.submitSearch = function () {
      alert('yes!');
    }
  });

function renderResults (data) {
  var businesses = data.businesses;
  var business;
  var lat;
  var long
  $list = $('#list');
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
    data: query,
    success: renderResults,
    error: function () {
      $('#list').html('Something went wrong with the search : [ <br><BR>Please try again!')
    }
  });
}

getSearchResults();

var map;
function initMap() {
  setTimeout(function () {
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
    });

  }, 0);
}

initMap();