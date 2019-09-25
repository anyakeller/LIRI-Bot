// get node packages
require("dotenv").config();
var Spotify = require("node-spotify-api"); //spotify  package
var moment = require("moment"); //moment package
var axios = require("axios"); //axios
var fs = require("fs"); //file reader thing
//import keys
var keys = require("./keys.js");
// var omdbapikey = keys.allKeys.omdbapikey;
var omdbapikey = "trilogy";
var bandsintownappid = "codingbootcamp";
//initialize spotify package
var spotify = new Spotify(keys.allKeys.spotify);

// UNCOMMENT WHEN READY TO PUBLISH
// REMEMBER TO TEST PROCESSS.ARGV[2] FIRST!!!
// get user input
var userCommand = process.argv[2];

// for manual testing
// userCommand = "do-what-it-says";

// if the usercommand is dowhatitsays then run that
if (
    // if do-what-it-says
    userCommand === "do-what-it-says"
) {
    logCommands(userCommand);
    dowhatItSays();
} else {
    //otherwise, pass the command and second argument to be executed
    var argument = process.argv.slice(3).join(" ");
    logCommands(userCommand + " " + argument);
    executeInput(userCommand, argument);
}

//executes direct input argument functions
function executeInput(userCommand, argument) {
    // run functions based on input
    switch (userCommand) {
        // if concert-this
        case "concert-this":
            concertThis(argument);
            break;
        // if spotify-this-song
        case "spotify-this-song":
            spotifyThisSong(argument);
            break;
        //if movie-this
        case "movie-this":
            movieThis(argument);
            break;
        // otherwise
        default:
            console.log("Invalid or no command entered!");
    }
}

//concert this function
function concertThis(artist) {
    // example api call "https://rest.bandsintown.com/artists/" + artist + "/events?app_id="+bandsintownappid

    //hard codded artist
    // var artist = "imagine dragons";

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
            console.log("Running concertThis");
            // handle success
            // console.log(response.data);
            var data = response.data[0];

            //if venue data is returned then log it
            if (data !== undefined) {
                console.log("Your artist input:", artist);
                console.log("Venue Name:", data.venue.name);
                console.log(
                    "Venue location:",
                    formatBandsInTownLocation(data.venue)
                );
                console.log(
                    "Date of Event:",
                    moment(data.datetime).format("MM/DD/YYYY")
                    //data.datetime
                );
                console.log("---------------------");
            } else {
                //if there is none then oh well
                console.log(
                    "Your artist input: " + artist + " has no events coming up"
                );
            }
        })
        .catch(function(error) {
            //just in case things get... ...messed up
            // handle error
            console.log(error);
        });
}
//helper function for bands in town to format location input
function formatBandsInTownLocation(venueData) {
    return venueData.city + " " + venueData.region + ", " + venueData.country;
}

//helper function to format date mm/dd/yy with moment

//spotify this song function
// Returns: Artist(s),The song's name, A preview link of the song from Spotify and The album that the song is from
function spotifyThisSong(songName) {
    //if song name is not provided
    if (!songName) {
        songName = "Penny Lane";
    }
    // call spotify
    spotify
        .search({ type: "track", query: songName, limit: 1 })
        .then(function(response) {
            //log the result data
            console.log("Running spotifyThisSong");
            var firstResult = response.tracks.items[0];
            // console.log(firstResult);
            //log into
            console.log("Song Name Found:", firstResult.name);
            console.log("Artist Name:", firstResult.artists[0].name);
            console.log("Link to song:", firstResult.external_urls.spotify);
            console.log("Song Album:", firstResult.album.name);
            console.log("---------------------");
        })
        .catch(function(err) {
            console.log(err);
        });
}

//movie this function
// logs: Title of the movie. * Year the movie came out. * IMDB Rating of the movie. * Rotten Tomatoes Rating of the movie. * Country where the movie was produced. * Language of the movie. * Plot of the movie. * Actors in the movie.
function movieThis(movieName) {
    // movieName = "The Godfather"; //Uncomment to hard code movie name
    //axios call parameter setup
    var omdbiAxiosParams = {
        method: "get",
        url:
            "http://www.omdbapi.com/?t=" +
            encodeURI(movieName) +
            "&apikey=" +
            omdbapikey,
        responseType: "json"
    };

    //axios call
    axios(omdbiAxiosParams)
        .then(function(omdbiResult) {
            console.log("Runnning movieThis");
            // handle success
            // console.log(response.data);
            //if no responce
            var data = omdbiResult.data;
            //if title data is returned then log it
            if (data.Title) {
                // console.log(data);
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
                console.log("---------------------");
            } else {
                console.log(
                    "Your movie input: " + movieName + " was not found"
                );
            }
        })
        .catch(function(error) {
            //error poo
            // handle error
            console.log(error);
        });
}

//do-what-it-says function
function dowhatItSays() {
    console.log("dowhatItSays");
    //read the text file
    fs.readFile("random.txt", "utf8", function(error, data) {
        // Error catch
        if (error) {
            return console.log(error);
        }
        console.log("------------");
        // Split by line into array
        var dataLinesArr = data.split("\n");
        // Split Lines again but run the command each time
        for (var i = 0; i < dataLinesArr.length; i++) {
            // split the command from the argument
            var commandandparameterArr = dataLinesArr[i].split(",");
            // get rid of extraneous quotes and extra whitespace
            var theCommand = commandandparameterArr[0]
                .replace(/['"]+/g, "")
                .trim();
            var theargument = commandandparameterArr[1]
                .replace(/['"]+/g, "")
                .trim();
            // console.log(theCommand);
            // console.log(theargument);

            // just in case someone trys to break it by putting do-what-it-says in the text file...
            if (theCommand === "do-what-it-says")
                console.log("Don't you dare try that with me...");
            //otherwise proceed normally
            else executeInput(theCommand, theargument);
        }
    });
}

//log to txt file
function logCommands(commandText) {
    fs.appendFile("log.txt", commandText + "\n", function(error) {
        // Error catch
        if (error) {
            return console.log(error);
        }
    });
}
