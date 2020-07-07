const ipURL = "https://geo.ipify.org/api/v1?apiKey=at_VWgrKDmclCyILqq8tKSmVj6hnMsvJ"

function weather(){
  fetch(ipURL)
  .then(ip => ip.json())
  .then(ipData => {
      //var city = "Dubai";
      var country = ipData.location.country;
      var lat = ipData.location.lat;
      var lon = ipData.location.lng;

      var url = "http://api.openweathermap.org/data/2.5/weather?lat="+ lat + "&lon="+ lon +"&appid=417aaf1dba1bab4ef5de5b8e8dddcbc0&q";
      //var url = "http://api.openweathermap.org/data/2.5/weather?lat=49.7224&lon=-113.4031&appid=417aaf1dba1bab4ef5de5b8e8dddcbc0&q";
      //var url = "https://api.openweathermap.org/data/2.5/weather?appid=417aaf1dba1bab4ef5de5b8e8dddcbc0&q=" + city;
      console.log(country)
      fetch(url)
      .then(response => response.json())
      .then(data => {
        var tempValue = data['main']['temp'];
        if (country == "CA") {
          var temp  = Math.round(tempValue) - 273 + "°";
        } else if (country == "USA") {
          var temp = Math.round(tempValue * 1.8 - 459.67) + "°";
        }
        document.getElementById("temp").innerHTML = temp;

        var tempHighValue = data['main']['temp_max']
        if (country == "CA") {
          var tempHigh  = Math.round(tempHighValue) - 273 + "°";
        } else if (country == "USA") {
          var tempHigh = Math.round(tempHighValue * 1.8 - 459.67) + "°";
        }

        var descValue = data['weather'][0]['description'];
        document.getElementById("weather").innerHTML = descValue;

        var icon_id = data['weather'][0]['icon'];
        console.log(icon_id)

        // clear sky
        if (icon_id == "01d") {
          document.getElementById("icon").src = '../assets/iconfinder_sun_simple_367526.png';
        }
        if (icon_id == "01n") {
          document.getElementById("icon").src = '../assets/iconfinder_sun_simple_367526.png';
        }
        //few clouds
        if (icon_id == "02d") {
          document.getElementById("icon").src = '../assets/iconfinder_sun_simple_cloudy_367525.png';
        }
        if (icon_id == "02n") {
          document.getElementById("icon").src = '../assets/iconfinder_sun_simple_cloudy_367525.png';
        }
        //scattered and broken clouds and mist
        if (icon_id == "03d") {
          document.getElementById("icon").src = '../assets/iconfinder_cloud_367531.png';
        }
        if (icon_id == "03n") {
          document.getElementById("icon").src = '../assets/iconfinder_cloud_367531.png';
        }
        if (icon_id == "04d") {
          document.getElementById("icon").src = '../assets/iconfinder_cloud_367531.png';
        }
        if (icon_id == "04n") {
          document.getElementById("icon").src = '../assets/iconfinder_cloud_367531.png';
        }
        if (icon_id == "50d") {
          document.getElementById("icon").src = '../assets/iconfinder_cloud_367531.png';
        }
        if (icon_id == "50n") {
          document.getElementById("icon").src = '../assets/iconfinder_cloud_367531.png';
        }
        //showers and rain
        if (icon_id == "09d") {
          document.getElementById("icon").src = '../assets/iconfinder_sun_simple_rain_367522.png';
        }
        if (icon_id == "09n") {
          document.getElementById("icon").src = '../assets/iconfinder_sun_simple_rain_367522.png';
        }
        if (icon_id == "10d") {
          document.getElementById("icon").src = '../assets/iconfinder_sun_simple_rain_367522.png';
        }
        if (icon_id == "10n") {
          document.getElementById("icon").src = '../assets/iconfinder_sun_simple_rain_367522.png';
        }
        //thunderstorm
        if (icon_id == "11d") {
          document.getElementById("icon").src = '../assets/iconfinder_sun_simple_rain_367522.png';
        }
        if (icon_id == "11n") {
          document.getElementById("icon").src = '../assets/iconfinder_sun_simple_rain_367522.png';
        }
        //snow
        if (icon_id == "13d") {
          document.getElementById("icon").src = "../assets/iconfinder_snowflake_367528.png";
        }
        if (icon_id == "13n") {
          document.getElementById("icon").src = "../assets/iconfinder_snowflake_367528.png";
        }
        })
      })
      //might need to remove
      .catch(setInterval(onlineStatus, 30000))
    }
weather()
setInterval(weather, 900000)