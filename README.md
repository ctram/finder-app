# README
This is a basic app built to explore Angular's functionality.

### Installing and Running

- Clone this app.
- Change directory into the app folder
- Run ```bundle install```
- Run ```rails server```
- The app can be viewed within a web browser at ```http://localhost:3000```

### Tools used:
- Google Maps API,
- Yelp API
- Angular.js
- Bootstrap (Bootswatch)
- a bit of jQuery
- Rails back end (responsible for contacting Yelp API and returning JSON back to the client)
- yelp-ruby gem, for convenient sending of search queries to yelp's API.

### Core features:
- Integration with Google maps for displaying location of search results.
- Integration with Yelp for business search results.
- Search results are listed in text form and also represented by a marker on the map.
- Repositioning of map based on location of search results.
- User is given the option to restrict search within the current viewport of the map, e.g. a restricted search will only return results near the current location on the map. Unrestricted search leaves it up to Yelp to determine the most relevant location given the search terms
  - Example for a map currently positioned over New York:
    - A search for just "Chicago" will likely return businesses in Chicago and pan the map to Chicago.
    - A search for "Chicago" and with the "Only Search Within Map" checkbox checked will likely return lists for Chicago pizza joints in New York.
- When the mouse cursor is over a result listing, if the associated marker is within the current viewport of the map, the marker will generate a bouncing animation for easier identification of the listing's location.

### Extra Todos :
- Hovering cursor over a listing will highlight the listing.
- Clicking on a marker centers the map over the marker.
- Hovering cursor over the marker presents a pop with more detailed info of the business.
- Intelligent zooming based on markers on the map.
