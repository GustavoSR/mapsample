var watchID;
var latitudeAndLongitudeCurrent;
var route = false;
var firstMapCall;
var directionsDisplay;                                            // Declare a variable of renderer object
var directionsService = new google.maps.DirectionsService();     // Instantiate a directions service.
var map;
var currentMarker;
var carMarker;
 
var myOptions = 
{
  zoom:14,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
   
  enableHighAccuracy: true, 
  zoomControlOptions: {
      position: google.maps.ControlPosition.TOP_RIGHT
  },
  maximumAge: 10000
};
 
function initializeMyMap() 
{
  directionsDisplay = new google.maps.DirectionsRenderer();      // Instantiate a renderer object.
  //directionsDisplay.suppressMarkers = true; //removes direction markers
  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  directionsDisplay.setMap(map);                                  // bind the map to the renderer
}
 
function showLocation(){
    firstMapCall = true;
    //if initalize hasn't been called, call it
    if(directionsDisplay == null) {
        initializeMyMap();
    }
    watchID = navigator.geolocation.watchPosition(onSuccessShowLoc, onError, myOptions);
}
 
function setMapBounds(position){
    var mapBounds = new google.maps.LatLngBounds(); 
    mapBounds.extend(position);
        map.fitBounds(mapBounds);
        zoomChangeBoundsListener = 
        google.maps.event.addListenerOnce(map, 'bounds_changed', function(event) {
        if (this.getZoom()){
            this.setZoom(18);
        }
        });
        resize();
}
 
// onSuccess Geolocation
    function onSuccessShowLoc(position) {
        latitudeAndLongitudeCurrent = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        if(firstMapCall == true){
            var result = retrieveLocation();
            setMapBounds(latitudeAndLongitudeCurrent);
            if(result != null){
                addCarMarker(result);
            }
            firstMapCall = false;
        }
        deleteOverlays();
        addCurrentLocMarker(latitudeAndLongitudeCurrent);
}
    
    
    // Removes the overlays from the map, but keeps them in the array
    function deleteOverlays() {
        if (currentMarker) {
            currentMarker.setMap(null);
        }
    }
     
    // Removes the overlays from the map, but keeps them in the array
    function deleteCarOverlay() {
         if (carMarker) {
             carMarker.setMap(null);
        }
    }
     
    function addCurrentLocMarker(location) {
        marker = new google.maps.Marker({
        position: location,
        animation: google.maps.Animation.DROP,
        icon: 'https://dl.dropbox.com/u/20772744/male-2.png',
        map: map
     });
     marker.setAnimation(google.maps.Animation.BOUNCE);
     currentMarker = marker;
    }
     
    function addCarMarker(location) {
        marker = new google.maps.Marker({
            draggable: true,
            raiseOnDrag: false,
            icon:'https://dl.dropbox.com/u/20772744/car.png',
            map: map,
            position: location
     });
    carMarker = marker;
    }
   
function calcRoute() 
{ 
    var theDestination = retrieveLocation();
    if(theDestination == null){
        alert("Error: No car location has been saved.");
        return null;
    }
    var request =                                                   // Instantiate a DirectionsRequest object
  {                                                           
      //origin is LatLng object
      origin: latitudeAndLongitudeCurrent,
      //destination is LatLng object
      destination: theDestination,
      travelMode: google.maps.DirectionsTravelMode.WALKING
  };
   
  directionsService.route(request,                                // call route() to request directions service
    function(result, status)       
    {     
      if (status == google.maps.DirectionsStatus.OK)
      {
        directionsDisplay.setOptions({ preserveViewport: true });
        directionsDisplay.setDirections(result);                  // draw the routes
        // put text directions on directions_panel
       directionsDisplay.setPanel(document.getElementById("directions_panel"));  
        route=true;                
      }
    }
  );
}
 
function textDirections() 
{
  if(route == false){
    calcRoute();
  }
}
     
 
function resize(){
    var map_page =  document.getElementById('show');
    var map_container = document.getElementById('the_map_container');
    var header = document.getElementById('thehead');
    var newHeight = map_page.offsetHeight - header.offsetHeight
    map_container.style.height = newHeight+'px';
    // trigger a resize event on the map so it reflects the new size
  if(map != null) {
    google.maps.event.trigger(map, 'resize');
  }
}