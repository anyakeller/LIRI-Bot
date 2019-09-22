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
// var userCommand = process.argv[2];

// for manual testing
var userCommand = "concert-this";

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
    var artist = "imagine dragons";
    //process argv to uncomment
    // var artist = process.argv[3];

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
            console.log(response.data);
        })
        .catch(function(error) {
            // handle error
            console.log(error);
        })
        .finally(function() {
            // always executed
        });
}

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
