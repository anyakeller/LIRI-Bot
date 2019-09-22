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

// get user input
var userCommand = process.argv[2];
// run functions based on input
switch (userCommand) {
    // if concert-this
    case "concert-this":
        console.log(userCommand);
        break;
    // if spotify-this-song
    case "spotify-this-song":
        console.log(userCommand);
        break;
    //if movie-this
    case "movie-this":
        console.log(userCommand);
        break;
    // if do-what-it-says
    case "concert-this":
        console.log(userCommand);
        break;
    default:
        console.log("Invalid or no command entered!");
}
