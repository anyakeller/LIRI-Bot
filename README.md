# LIRI-Bot
LIRI Bot that retrieves data from Spotify API, OMDb API and Bands In Town API


## How to Run
This app runs API calls which require keys.  The Spotify key is not included in this repo.  
A .env file must be created in this format to run the spotify-related commands
```
SPOTIFY_ID[YOUR-SPOTIFY-ID]
SPOTIFY_SECRET=[YOUR-SPOTIFY-SECRET]
```

This app runs with node.js.  If you do not have node.js installed, it will not run.
This app also utilizes five node modules as shown being imported below
``` js
require("dotenv").config(); //dot env reader
var Spotify = require("node-spotify-api"); //spotify package
var moment = require("moment"); //moment package
var axios = require("axios"); //axios
var fs = require("fs"); //file reader thing
```
To ensure node is working and the packages are installed run:
``` bash
$ npm i dotenv
$ npm init -y
$ npm i node-spotify-api
$ npm i axios
$ npm i moment
```

### Commands
This node.js bot takes four commands, three of which require a second argument.
#### Get spotify song data from the Spotify api
`$ node liri spotify-this-song [SONG NAME]`
![example spotify-this-song call](do-what-it-says-example.png)
#### Get data about a band or artist concert coming up with the Bands In Town API
`$ node liri concert-this [ARTIST OR BAND]`
![example concert-this call](concert-this-example.png)
#### Get data about a movie with the OMDb API
`$ node liri movie-this [MOVIE NAME]`
![example movie-this call](movie-this-example.png)
#### Run a list of these commands in a .txt file
`$ node liri do-what-it-says`
![example do-what-it-says call](do-what-it-says-example.png)

