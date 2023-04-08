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
var temp = document.getElementById("temp");
var wind = document.getElementById("wind")
var humidity = document.getElementById("humidity")
var apiKey = 'ed8994c929cd1af2ce5f66056c36cdc2'
var ul = document.querySelector("ul")
var li = document.createElement("li")
var day1 = document.getElementById("day-1")
var day2 = document.getElementById("day-2")
var day3 = document.getElementById("day-3")
var day4 = document.getElementById("day-4")
var day5 = document.getElementById("day-5")
function getApi(event) {
    event.preventDefault()

    
    var city = searchInput.value

    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+city +"&units=imperial&appid=" + apiKey
    var requestUrlForecast ='https://api.openweathermap.org/data/2.5/forecast?q='+city +"&units=imperial&appid=" + apiKey
   
    fetch(requestUrl)
    
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Use the console to examine the response
        console.log(data);
        
        temp.textContent = "Current temperature: "+data.main.temp
        wind.textContent = "Current wind: "+data.wind.speed+ "mph"
        humidity.textContent = "Current Humidity: "+data.main.humidity+"%"
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
        day1.secondChild.textContent = "hi"

        
        // temp.textContent = "Current temperature: "+data.main.temp
        // wind.textContent = "Current wind: "+data.wind.speed+ "mph"
        // humidity.textContent = "Current Humidity: "+data.main.humidity+"%"
        // li.textContent = city
        // ul.appendChild(li)
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
  }

  searchButton.addEventListener('click',getApi)
//   fetchButton.addEventListener('click', getApi);

//getApi()