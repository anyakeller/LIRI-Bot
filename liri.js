// get node packages
require("dotenv").config();
var Spotify = require("node-spotify-api");
var moment = require("moment");
var axios = require("axios");
//import keys
var keys = require("./keys.js");
var omdbapikey = keys.allKeys.omdbapikey;
var bandsintownappid = keys.allKeys.bandsintownappid;
//initialize spotify package
var spotify = new Spotify(keys.allKeys.spotify);

// UNCOMMENT WHEN READY TO PUBLISH
// REMEMBER TO TEST PROCESSS.ARGV[2] FIRST!!!
// get user input
var userCommand = process.argv[2];

// for manual testing
// var userCommand = "concert-this";

// run functions based on input
switch (userCommand) {
    // if concert-this
    case "concert-this":
        concertThis();
        break;
    // if spotify-this-song
    case "spotify-this-song":
        spotifyThisSong();
        break;
    //if movie-this
    case "movie-this":
        movieThis();
        break;
    // if do-what-it-says
    case "do-what-it-says":
        dowhatItSays();
        break;
    default:
        console.log("Invalid or no command entered!");
}

//concert this function
function concertThis() {
    console.log("concertThis");
    // example api call "https://rest.bandsintown.com/artists/" + artist + "/events?app_id="+bandsintownappid
    //hard codded artist
    // var artist = "imagine dragons";
    //process argv to uncomment
    var artist = process.argv.slice(3).join(" ");

    //axios call parameter setup
    var bandsInTownAxiosParams = {
        method: "get",
        url:
            "https://rest.bandsintown.com/artists/" +
            encodeURI(artist) +
            "/events?app_id=codingbootcamp",
        responseType: "json"
    };
    //axios call
    axios(bandsInTownAxiosParams)
        .then(function(response) {
            // handle success
            // console.log(response.data);
            //if no responce
            var data = response.data[0];

            if (data) {
                console.log("Your artist input: ", artist);
                console.log("Venue Name: ", data.venue.name);
                console.log(
                    "Venue location: ",
                    formatBandsInTownLocation(data.venue)
                );
                console.log(
                    "Date of Event: ",
                    moment(data.datetime).format("MM/DD/YYYY")
                    //data.datetime
                );
            } else {
                console.log(
                    "Your artist input: " + artist + " has no events coming up"
                );
            }
        })
        .catch(function(error) {
            // handle error
            console.log(error);
        });
}
//helper to format location
function formatBandsInTownLocation(venueData) {
    return venueData.city + " " + venueData.region + ", " + venueData.country;
}

//helper function to format date mm/dd/yy with moment

//spotify this song function
function spotifyThisSong() {
    console.log("spotifyThisSong");
}

//movie this function
function movieThis() {
    console.log("movieThis");
}

//do-what-it-says function
function dowhatItSays() {
    console.log("dowhatItSays");
}
