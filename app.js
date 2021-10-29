const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();
// getting user html input
app.use(bodyParser.urlencoded({extended: true}));

// connects to server
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

// catch user info
app.post("/", function(req, res) {
    const appid = "";
    // Get user location input {cityName => input tag --> name}
    var city = req.body.cityName;
    var units = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city + "&units=" + units + "&appid=" + appid;

    // fetch data using native HTTPS method from node.js
    https.get(url, function(response) {
        console.log(response.statusCode);

        // get data in hex values
        response.on("data", function(data) {
            // turn the data into a json format
            const weatherData = JSON.parse(data);

            // get specific info
            const weatherTemperature = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const weatherLocation = weatherData.name;
            const weatherIcon = weatherData.weather[0].icon;
            const weatherImgURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
           
            // Sending multiple lines of html
            res.write("<h1>The location is " + weatherLocation + "</h1>");
            res.write("<p>The temperature is " + weatherTemperature + "</p>");
            res.write("<p>The weather feels like " + weatherDescription + "</p>");
            res.write("<img src=" + weatherImgURL + " >");
            // send data to server
            res.send();
        });
    });

});

// Setup the server on localhost {3000}
app.listen(3000, function() {
    console.log("The server is running on port 3000.")
});
