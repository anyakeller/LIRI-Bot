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
userCommand = "movie-this";

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
// Returns: Artist(s),The song's name, A preview link of the song from Spotify and The album that the song is from
function spotifyThisSong() {
    console.log("spotifyThisSong");
    var songName = process.argv.slice(3).join(" ");
    //if song name is not provided
    if (!songName) {
        songName = "Penny Lane";
    }
    // call spotify
    spotify
        .search({ type: "track", query: songName, limit: 1 })
        .then(function(response) {
            var firstResult = response.tracks.items[0];
            // console.log(firstResult);
            //log into
            console.log("Song Name Found: ", firstResult.name);
            console.log("Artist Name: ", firstResult.artists[0].name);
            console.log("Link to song: ", firstResult.external_urls.spotify);
            console.log("Song Album: ", firstResult.album.name);
        })
        .catch(function(err) {
            console.log(err);
        });
    console.log("Song Query Name: ", songName);
}

//movie this function
// logs: Title of the movie. * Year the movie came out. * IMDB Rating of the movie. * Rotten Tomatoes Rating of the movie. * Country where the movie was produced. * Language of the movie. * Plot of the movie. * Actors in the movie.
function movieThis() {
    console.log("movieThis");
    var movieName = process.argv.slice(3).join(" ");
    // movieName = "The Godfather"; //Uncomment to hard code movie name
    //axios call parameter setup
    var omdbiAxiosParams = {
        method: "get",
        url: "http://www.omdbapi.com/?t=" + movieName + "&apikey=" + omdbapikey,
        responseType: "json"
    };
    //axios call
    axios(omdbiAxiosParams)
        .then(function(omdbiResult) {
            // handle success
            // console.log(response.data);
            //if no responce
            var data = omdbiResult.data;

            if (data) {
                console.log(data);
                console.log("Movie Found: ", data.Title);
                console.log("Year: ", data.Year);
                console.log("IMDB Rating: ", data.Rated);
                console.log(
                    data.Ratings[1].Source + ": ",
                    data.Ratings[1].Value
                );
                console.log("Country: ", data.Country);
                console.log("Language: ", data.Language);
                console.log("Plot: ", data.Plot);
                console.log("Actors: ", data.Actors);
            } else {
                console.log(
                    "Your movie input: " + movieName + " was not found"
                );
            }
        })
        .catch(function(error) {
            // handle error
            console.log(error);
        });
}

//do-what-it-says function
function dowhatItSays() {
    console.log("dowhatItSays");
}
