// variables pointing to my html doc
var searchInput = document.getElementById("search-input")
var searchButton = document.getElementById("search-btn")
var place = document.getElementById("place")
var icon = document.getElementById("icon")
var temp = document.getElementById("temp");
var wind = document.getElementById("wind")
var humidity = document.getElementById("humidity")

var ul = document.querySelector("ul")

var forecast = document.getElementById("forecast")

var apiKey = 'ed8994c929cd1af2ce5f66056c36cdc2'

// setting and getting user input into and from local storage
function searchCity(city){
    // creating an empty array to push the user input into
    var searchHistory = []
    // if there is anything local storage then search history equals that an not just the empty array
    if(localStorage.getItem("searchHistory")){
        searchHistory = JSON.parse(localStorage.getItem("searchHistory"))
    }
    // function to store the user search history
    function storeSearch(){
        // if search history doesn't already include the users input then add it to the search history array
        if(!searchHistory.includes(city)){
        searchHistory.push(city)
        // set search history into local storage 
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory)) 
        }
    }
    // getting the users search history from local storage to render on the page
    function getSearch(){
        // clearing anything in ul before creating another button
      ul.textContent = ""
    //   loop through all items within search history an making a button for them 
        for(var i = 0; i <searchHistory.length; i++){
            var button = document.createElement("button")
            button.textContent = searchHistory[i]
            var li = document.createElement("li")
            li.appendChild(button)
            ul.appendChild(li);
        }
    }

    storeSearch()
    getSearch()

// two urls, first one for current data the second one for the forecast
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=imperial&appid=" + apiKey
    var requestUrlForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + "&units=imperial&appid=" + apiKey

// fetching current data 
    fetch(requestUrl)

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Use the console to examine the response
            console.log(data);
            
            // adding current weather icon 
            var id = data.weather[0].icon
            console.log(id)
            // inserting the source to my html to render the current icon
            var iconUrl = 'https://openweathermap.org/img/w/' + id + '.png'
            icon.setAttribute("src", iconUrl)
            // setting the unix time to a date and shortening it to only contain what I need
            var unix = data.dt
            var date = Date(unix * 1000).slice(0, 10)

            // heading for the current city and day
            place.textContent = city + " " + date
            temp.textContent = "Current temperature: " + data.main.temp+" °F"
            wind.textContent = "Current wind: " + data.wind.speed + "mph"
            humidity.textContent = "Current Humidity: " + data.main.humidity + "%"
            
        });

        // fetch request for the forecast data 
    fetch(requestUrlForecast)

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Use the console to examine the response
            console.log(data);
            // clearing the previous content from the forecast id to inject more html for each day
            forecast.textContent = ""
            // creating a for loop to loop through all 5 days of the data 
            for(var i =6 ; i< data.list.length;i = i+8){
                // variable to store the code for weather icon
                var id1 = data.list[i].weather[0].icon
                var iconUrl1 = 'https://openweathermap.org/img/w/' + id1 + '.png'
                // inserting html for each day with temp,wind speed and humidity
                forecast.innerHTML += `     <div id = "day-1" class="card w-20 col-lg-2.4" style="width: 18rem;">
                <div class="card-body">
                    <h5 id ="date-1" class= card-title">${data.list[i].dt_txt.slice(5, 11)}</h5>
                    <img id =icon1 src="${iconUrl1}"/>
                    <h6 id="temp1">${"Temperature: " + data.list[i].main.temp+" °F"} </h6>
                    <h6 id="wind1"> ${"Wind: " + data.list[i].wind.speed+ " mph"}</h6>
                    <h6 id="humidity1">${"Humidity: " + data.list[i].main.humidity+"%"} </h6>
            
                </div>
            </div>`
            }
           
        });
}
// making page have the last looked up city when page is rendered 
// parsing the array of search history and setting
var cities = JSON.parse(localStorage.getItem("searchHistory"))
// calling the function searchCity for the last city searched 
searchCity(cities[cities.length-1])

// calling the search city function to render city searched, and store user input preventing form default
function getApi(event) {
    event.preventDefault()

 var city = searchInput.value
    searchCity(city)
    
}

// putting an event listener on the search button
searchButton.addEventListener('click', getApi)

// adding an event listener to buttons in the search history to then render info for past searches 
ul.addEventListener("click",function(event){
    if(event.target.matches("button")){
       searchCity(event.target.textContent)
    }
})