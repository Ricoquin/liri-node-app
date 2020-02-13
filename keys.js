// console.log('this is loaded');

// Targeting the ID's in the .env file and exporting them to liri.js "Very Important to keep API auth info hidden and able to be accessed from my .env file //

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
