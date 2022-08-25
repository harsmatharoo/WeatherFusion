const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");

require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.set("view engine", "ejs");


const appId = process.env.WEATHER_ID;
const endPoint = "https://api.openweathermap.org/data/2.5/weather?";
let units = "metric";
let statusCode = 0;
let weatherData;
let url = "";
let error = false;
let errorText = "";

const unsplashId = process.env.UNSPLASH_ID;
const unspladhEndPoint = "https://api.unsplash.com/search/photos/?";
let per_page = "1";
let unsplashStatusCode = 0;
let imageData;
let unsplashUrl = "";
let unsplashData = "";

let userName = "";
let city = "";
let dataStorage = [{ }];
const defaultImage = "/images/default.jpg";


app.post("/", (req, res) => {
    let submitValue = req.body.submit;
    dataStorage = [{ }];

    if(submitValue === "Confirm"){
        userName = req.body.userName;
    } else{
        userName = "";
    }

    res.redirect("/home");
})

app.get("/", (req, res) => {
    res.render("index");
})


app.post("/home", (req, res) => {
    let objectToPush = {};
    error = false;
    errorText = "";

    city = req.body.cityName;
    url =  endPoint + "q=" + city + "&appid=" + appId + "&units=" + units;
    unsplashUrl = unspladhEndPoint + "&client_id=" + unsplashId + "&query=" + city + "&per_page=" + per_page;

    https.get(url, (response) => {
        statusCode = response.statusCode;
        console.log(response);
        if(statusCode === 200){
            response.on("data", (data) => {
                weatherData = JSON.parse(data);
                objectToPush.city = city;
                objectToPush.temperature = weatherData.main.temp + "°C";
                objectToPush.descShort = weatherData.weather[0].main;
                objectToPush.descLong = weatherData.weather[0].description;
                objectToPush.icon = "http://openweathermap.org/img/w/"+ weatherData.weather[0].icon +".png";
                
                https.get(unsplashUrl, (responseU) => {
                    unsplashStatusCode = responseU.statusCode;
        
                    if(unsplashStatusCode === 200){
                        responseU.on("data", (chunk) => {
                            unsplashData += chunk;
                        })
                        
                        responseU.on("end", () => {
                            imageData = JSON.parse(unsplashData);
                            if(imageData.total != 0){
                                objectToPush.imageURL = imageData.results[0].urls.regular;
                            } else{
                                objectToPush.imageURL = defaultImage;
                            }
                            unsplashData = "";
                        })
                        if(!error){
                            dataStorage.push(objectToPush);
                        }
                    }else{
                        console.log("An error occured while getting image");
                    }
                    
                    res.redirect("/home");
                })
            })
        } else{
            //if city was not found on openweather
            console.log("error");
            error = true;
            errorText = response.statusMessage;
            res.redirect("/home");
        }
        
    })
})

app.get("/home", (req, res) => {
    res.render("home", {
        firstName: userName,
        dataLength: dataStorage.length,
        data: dataStorage,
        error: error,
        errorText: errorText
    });
})


app.listen(3000, (req, res) => {
    console.log("Listening on port 3000");
})
