// Pseduo code 
// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// need to create a search bar 
// figure out how to use the geo, (maybe use their variables in the function to insert into the url?)
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// api key 



function getApi() {
    // var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=ed8994c929cd1af2ce5f66056c36cdc2'
    // var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=ed8994c929cd1af2ce5f66056c36cdc2'
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Use the console to examine the response
        console.log(data);
        
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
//   fetchButton.addEventListener('click', getApi);

getApi()