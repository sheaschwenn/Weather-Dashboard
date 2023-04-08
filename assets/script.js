// Pseduo code 
// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// need to create a search bar 
// user input will be sent into city 
// clear out previous deal 
// figure out how to use the geo, (maybe use their variables in the function to insert into the url?)
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// api key 
var searchInput = document.getElementById("search-input")
var searchButton = document.getElementById("search-btn")
var place = document.getElementById("place")
var icon = document.getElementById("icon")
var temp = document.getElementById("temp");
var wind = document.getElementById("wind")
var humidity = document.getElementById("humidity")
var apiKey = 'ed8994c929cd1af2ce5f66056c36cdc2'
var ul = document.querySelector("ul")
var li = document.createElement("li")

var date1 = document.getElementById("date-1")
var icon1 = document.getElementById("icon1")
var temp1 = document.getElementById("temp1")
var wind1 = document.getElementById("wind1")
var humidity1 = document.getElementById("humidity1")


var date2 = document.getElementById("date-2")
var icon2 = document.getElementById("icon2")
var temp2 = document.getElementById("temp2")
var wind2 = document.getElementById("wind2")
var humidity2 = document.getElementById("humidity2")

var date3 = document.getElementById("date-3")
var icon3 = document.getElementById("icon3")
var temp3 = document.getElementById("temp3")
var wind3 = document.getElementById("wind3")
var humidity3 = document.getElementById("humidity3")

var date4 = document.getElementById("date-4")
var icon4 = document.getElementById("icon4")
var temp4 = document.getElementById("temp4")
var wind4 = document.getElementById("wind4")
var humidity4 = document.getElementById("humidity4")

var date5 = document.getElementById("date-5")
var icon5 = document.getElementById("icon5")
var temp5 = document.getElementById("temp5")
var wind5 = document.getElementById("wind5")
var humidity5 = document.getElementById("humidity5")


function getApi(event) {
    event.preventDefault()


    var city = searchInput.value
    

    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=imperial&appid=" + apiKey
    var requestUrlForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + "&units=imperial&appid=" + apiKey
    

    fetch(requestUrl)

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Use the console to examine the response
            console.log(data);
            
            var id = data.weather[0].icon
            console.log(id)
            var iconUrl = 'https://openweathermap.org/img/w/'+id+'.png'
            icon.setAttribute("src",iconUrl)
            var unix = data.dt 
            var date = Date(unix*1000).slice(0,10)
            
            console.log(typeof longDate)
            place.textContent = city +" "+ date
            temp.textContent = "Current temperature: " + data.main.temp
            wind.textContent = "Current wind: " + data.wind.speed + "mph"
            humidity.textContent = "Current Humidity: " + data.main.humidity + "%"
            li.textContent = city
            ul.appendChild(li)
            // TODO: Loop through the data and generate your HTML
            // for(var i =0;i<data.length; i++){
            //   var userName = document.createElement("h3");
            //   var link = document.createElement("a");
            //   userName.textContent = data[i].login;
            //   link.textContent = data[i].html_url

            //   userContainer.append(userName);
            //   userContainer.append(link)
            // }
        });
    

    fetch(requestUrlForecast)

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Use the console to examine the response
            console.log(data);

            var id1 = data.list[6].weather[0].icon
            var iconUrl1 = 'https://openweathermap.org/img/w/'+id1+'.png'
            icon1.setAttribute("src",iconUrl1)

            date1.textContent =data.list[6].dt_txt.slice(5,11)
            temp1.textContent = "Temperature: "+data.list[6].main.temp
            wind1.textContent = "Wind: "+data.list[6].wind.speed
            humidity1.textContent = "Humidity: "+data.list[6].main.humidity


            var id2 = data.list[14].weather[0].icon
            var iconUrl2 = 'https://openweathermap.org/img/w/'+id2+'.png'
            icon2.setAttribute("src",iconUrl2)
            date2.textContent = data.list[14].dt_txt.slice(5,11)
            temp2.textContent = "Temperature: "+data.list[14].main.temp
            wind2.textContent = "Wind: "+data.list[14].wind.speed
            humidity2.textContent = "Humidity: "+data.list[14].main.humidity

            var id3 = data.list[22].weather[0].icon
            var iconUrl3 = 'https://openweathermap.org/img/w/'+id3+'.png'
            icon3.setAttribute("src",iconUrl3)
            date3.textContent =data.list[22].dt_txt.slice(5,11)
            temp3.textContent = "Temperature: "+data.list[22].main.temp
            wind3.textContent = "Wind: "+data.list[22].wind.speed
            humidity3.textContent = "Humidity: "+data.list[22].main.humidity

            var id4 = data.list[22].weather[0].icon
            var iconUrl4 = 'https://openweathermap.org/img/w/'+id4+'.png'
            icon4.setAttribute("src",iconUrl4)
            date4.textContent =data.list[30].dt_txt.slice(5,11)
            temp4.textContent = "Temperature: "+data.list[30].main.temp
            wind4.textContent = "Wind: "+data.list[30].wind.speed
            humidity4.textContent = "Humidity: "+data.list[30].main.humidity


            var id5 = data.list[38].weather[0].icon
            var iconUrl5 = 'https://openweathermap.org/img/w/'+id5+'.png'
            icon5.setAttribute("src",iconUrl5)
            date5.textContent =data.list[38].dt_txt.slice(5,11)
            temp5.textContent = "Temperature: "+data.list[38].main.temp
            wind5.textContent = "Wind: "+data.list[38].wind.speed
            humidity5.textContent = "Humidity: "+data.list[38].main.humidity
        });
}

searchButton.addEventListener('click', getApi)
