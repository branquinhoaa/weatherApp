window.onload=function(){
  //redirecting to an unsafe protocol--> wether api does not provide https;
  if (window.location.protocol == "https:")
    window.location.href = "http:" + window.location.href.substring(window.location.protocol.length);  
  $.ajax({
    url: "http://ip-api.com/json",
    dataType:"jsonp",
    success: function(data){
      var lat = data.lat;
      var long= data.lon;
      getCoords(lat, long);
    }
  });
}


$(document).ready(function(){
  $("#convert").on("click",function(event){
    event.preventDefault();
    if ($("#temperature").html()==temperature){
      $("#temperature").html(inCelsius);
      $("#convert").html(" ºC");
    } else{
      $("#temperature").html(temperature);
      $("#convert").html(" ºF");
    }
  }); 
});



function getCoords(lat, long){  

  $.ajax({
    url: "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&APPID=d48c9417d20f8410424fe20de73f7c45",
    dataType: "jsonp",
    success: function( data ) {
      var country=data.sys.country;
      var city=data.name;
      var temp = data.main.temp;
      inCelsius=Math.round(temp-273);      
      temperature=Math.round((9/5*inCelsius)+32);
      var weatherDescription=data.weather[0].description;
      var humidity=data.main.humidity;
      $("#location").html(city+", "+country);
      $("#temperature").html(temperature);
      $("#otherFeatures").html("Weather: "+weatherDescription);
      $("#humidity").html("humidity of  "+humidity+"%");
      var main=data.weather[0].main;
      changeBackground(main);  

    }
  });
}


function changeBackground (main){
  debugger;
  switch (main){
    case "Clear":
      $("#data").addClass('clear');
      break;
    case  "Clouds":
      $("#data").addClass('clouds');
      break;
    case  "Rain":
      $("#data").addClass('rain');
      break;
    default:
      $("#data").addClass('default');
  }
}