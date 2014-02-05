var config = {
   enableHighAccuracy: true,
   timeout: 20000,
   maximumAge: 18000000
}

function saveLocation(){
   if (localStorage){  
        navigator.geolocation.getCurrentPosition(onSuccessPopDatabase, onError, config);
   } else { 
        alert("Error: Local storage is unsupported");  
    }  
  deleteCarOverlay();
}

function onSuccessPopDatabase(position){
    localStorage.setItem("carLoc", new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
     if (markersArray) {
        for (i in markersArray) {
            markersArray[i].setMap(null);
        }
        markersArray.length = 0;
    }
    alert("The location has been saved.");
}
 
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}
 
function retrieveLocation(){
    var retrievedStringwParens = localStorage.getItem("carLoc");
    if(retrievedStringwParens == null){
        alert("no location saved");
        return null;
    }
    var retrievedString = retrievedStringwParens.replace(/[()]/g,'')
    var splitArray = retrievedString.split(",");
    var lat = parseFloat(splitArray[0]);
    var lng = parseFloat(splitArray[1]);
    var retrievedLatLng = new google.maps.LatLng(lat,lng);
    return retrievedLatLng; 
}