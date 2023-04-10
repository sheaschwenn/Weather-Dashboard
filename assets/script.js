// varibles pointing to elements in HTML file
var searchInput = document.getElementById("search-input")
var searchButton = document.getElementById("search-btn")
var place = document.getElementById("place")
var icon = document.getElementById("icon")
var temp = document.getElementById("temp");
var wind = document.getElementById("wind")
var humidity = document.getElementById("humidity")
var apiKey = 'ed8994c929cd1af2ce5f66056c36cdc2'
var ul = document.querySelector("ul")

var forecast = document.getElementById("forecast")


// reusable function for setting, getting and rendering user input and following query 
function searchCity(city) {
    // if there is something in search history then display it on the page
    var searchHistory = []
    if (localStorage.getItem("searchHistory")) {
        searchHistory = JSON.parse(localStorage.getItem("searchHistory"))
    }
    // if the array of search history doesn't already include a city then push it into the array and add to local storage
    function storeSearch() {
        if (!searchHistory.includes(city)) {
            searchHistory.push(city)
            localStorage.setItem("searchHistory", JSON.stringify(searchHistory))
        }
    }
    // getting the users search history from local storage
    function getSearch() {
        // clearing out anything htat was previously in ul at text content so that we dont get double prints
        ul.textContent = " "
        //   iterating through all items in searchHistory and rendering them on the page as buttons 
        for (var i = 0; i < searchHistory.length; i++) {
            var button = document.createElement("button")
            button.textContent = searchHistory[i]
            var li = document.createElement("li")
            li.appendChild(button)
            ul.appendChild(li);
        }
        console.log(history)
    }
    // calling the functions 
    storeSearch()
    getSearch()

    // urls of the API used to get the weather info with vairables for user input of city and current api
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=imperial&appid=" + apiKey
    var requestUrlForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + "&units=imperial&appid=" + apiKey

    // creating a fetch request to get the current weather information needed based off of the users input 
    fetch(requestUrl)

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Use the console to examine the response
            console.log(data);
            // setting the weather icon id to a varible to render on the page 
            var id = data.weather[0].icon
            console.log(id)
            // setting the url with the current icon id as the src for the weather image 
            var iconUrl = 'https://openweathermap.org/img/w/' + id + '.png'
            icon.setAttribute("src", iconUrl)
            // creating a date out of the unix time stamp 
            var unix = data.dt
            var date = Date(unix * 1000).slice(0, 10)
            // adding the appropriate textContent to each category by traversing through the returned data 
            place.textContent = city + " " + date
            temp.textContent = "Current temperature: " + data.main.temp + " °F"
            wind.textContent = "Current wind: " + data.wind.speed + "mph"
            humidity.textContent = "Current Humidity: " + data.main.humidity + "%"

        });

        // creating a fetch request for the forecast data 
    fetch(requestUrlForecast)

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Use the console to examine the response
            console.log(data);
            // clearing out anything previously in forecast
            forecast.textContent = ""
            // creating a for loop to iterate through the needed portions of the data, increasing by 8 to hit an index at the same time everyday
            for (var i = 6; i < data.list.length; i = i + 8) {
                // grabbing the id for forecasted weather icon
                var id1 = data.list[i].weather[0].icon
                // adding that id to the src url 
                var iconUrl1 = 'https://openweathermap.org/img/w/' + id1 + '.png'
                // injecting hmtl into the page to create a card for each of the 5 forecasted days using dynamic variables 
                forecast.innerHTML += `     <div id = "day-1" class="card w-20 col-lg-2.4" style="width: 18rem;">
                <div class="card-body">
                    <h5 id ="date-1" class= card-title">${data.list[i].dt_txt.slice(5, 11)}</h5>
                    <img id =icon1 src="${iconUrl1}"/>
                    <h6 id="temp1">${"Temperature: " + data.list[i].main.temp + " °F"} </h6>
                    <h6 id="wind1"> ${"Wind: " + data.list[i].wind.speed + " mph"}</h6>
                    <h6 id="humidity1">${"Humidity: " + data.list[i].main.humidity + "%"} </h6>
            
                </div>
            </div>`
            }

        });
}
// function to call the searchCity function and to prevent the default behavior of an input form 
function getApi(event) {
    event.preventDefault()


    var city = searchInput.value
    searchCity(city)


}

// even listener on the search button to then call the getApi function and make all the previous work happen
searchButton.addEventListener('click', getApi)
// adding an event listener on the search history buttons to use their current text content as the city for a new query
// uses the function search city again to do the same work as befre 
ul.addEventListener("click", function (event) {
    if (event.target.matches("button")) {
        searchCity(event.target.textContent)
    }
})

// rendering the last city searched on the page when page is refreshed and or come back to if there has been a city search before 
var cities = JSON.parse(localStorage.getItem("searchHistory"))

if (cities) {
    searchCity(cities[cities.length - 1])
}