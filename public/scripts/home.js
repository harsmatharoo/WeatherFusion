
//city not found

function cityNotFound(){
    alert("City was not found");
}


//city input validation

function validateCity(event){
    let cityInput = document.querySelector(".inputCity input");
    let cityName = cityInput.value;
    if(isInvalid(cityName)){
        event.preventDefault();
        alert("City name is invalid");
    }
}

function isInvalid(cityName){
    console.log(cityName.length);
    for(let i=0; i<cityName.length; i++){
        if( !isNaN(cityName.charAt(i)) && !(cityName.charAt(i) === " ")){
            return true;
        }
    }
    return false;
}


//hide empty cards

function hideEmptyCards(){
    let weatherCard = document.querySelectorAll(".weatherCard");
    weatherCard[weatherCard.length - 1].style.display = "none";
}


//handling time 

const time = document.querySelector(".dateTime h3");
const dateOut = document.querySelector(".dateTime #date");
const dayOut = document.querySelector(".dateTime #dayOfWeek");
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let date= new Date();
let hours = date.getHours();
let minutes = date.getMinutes();
let seconds = date.getSeconds();
let day = date.getDate();
let month = months[date.getMonth()];
let year = date.getFullYear();
let dayWeek = daysWeek[date.getDay()];

function getDateTime(){
    date= new Date();
    hours = date.getHours();
    minutes = date.getMinutes();
    seconds = date.getSeconds();
    day = date.getDate();
    month = months[date.getMonth()];
    dayWeek = daysWeek[date.getDay()];
    if(seconds < 10){seconds = "0" + seconds}
    if(minutes < 10){minutes = "0" + minutes}
    if(hours < 10){hours = "0" + hours}
    if(day === 1){day = day + "st"}else if(day === 2){day = day + "nd"}else if(day === 3){day = day + "rd"}else{day = day + "th"}
    time.textContent = hours + " : " + minutes + " : " + seconds;
    dateOut.textContent = day + " of " + month + ", " + year;
    dayOut.textContent = dayWeek;
    setTimeout("getDateTime()", 1000);
}

getDateTime();
hideEmptyCards();