$(function(){
    //need a button to call the function
    $("#today-forecast-city").on("click", function(){
        console.log("click!");
        logReading();
    });

});

function logReading(){
    //fields I need:
    let city = $("#today-forecast-city").text();
    let date = $("#today-forecast-date").text();
    let temperature = $("#today-forecast-temperature").text();
    let description = $("#today-forecast-description").text();
    let icon = $("#today-forecast-icon").attr('src');
    let windspeed = Number($("#today-forecast-windspeed").text().replace(/[^\d]/g, ''));
    let humidity = Number($("#today-forecast-humidity").text().replace(/[^\d]/g, ''));
    let mode = "log-reading";

    $.post(
    "http://localhost/WeatherWise/Server/logReadings.php", 
    "city="+city+"&date="+date+"&temperature="+temperature+"&description="+description+"&icon="+icon+"&windspeed="+windspeed+"&humidity="+humidity+"&mode="+mode, 
    function(result){
        console.log(result);
    }, 
    "JSON");

}