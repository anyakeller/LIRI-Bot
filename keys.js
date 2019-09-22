console.log("this is loaded");

exports.allKeys = {
    spotify: {
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    },
    omdbapikey: process.env.OMDB_APIKEY,
    bandsintownappid: process.env.BANDS_IN_TOWN_APP_ID
};
