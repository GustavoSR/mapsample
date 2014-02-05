function processForm(){
    var level = document.myform.level.value;
    var spot = document.myform.spot.value;
    var addInfo = document.myform.notes.value;
     
    localStorage.setItem("level", level);
    localStorage.setItem("spot", spot);
    localStorage.setItem("addInfo", addInfo);
    alert("Saved: " + localStorage.getItem("level") + ", " + localStorage.getItem("spot") + ", and " + localStorage.getItem("addInfo"));
}
 
function clearForm(){
    $('#myform').get(0).reset();
}
 
function retrieveFormInfo(){
    var level = localStorage.getItem("level");
    $("#level2").html("Level: " + level);
     
     
    var spot = localStorage.getItem("spot");
    $("#spot").html("Spot: " + spot);
     
     
    var notes = localStorage.getItem("addInfo");
    $("#notes").html("Notes: " + notes);
}