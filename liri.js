// dotenv = info is accesable while staying protected //
require('dotenv').config();

// now creating variable tp access keys.js and variables fro the required packages

const keys = require('./keys.js');

// api variables
const Spotify = require('./node-spotify-api.js');
const axios = require('axios');
const moment = require('moment');

const fs = require('fs');

// I created a varible that returns the case argument inputed by user in the switvh statement
const appCommand = process.argv[2];

// I used the slice method to return the values of the first three indexes in the array
const userSearch = proicess.argv.slice(3).join(' ');

// all used in the switch statement to execute code correctly by user input prefrences in the appCommand
function liriRun(appCommand, userSearch) {
  switch (appCommand) {
    case 'spotify-this-song':
      getSpotify(userSerach);
      break;

    case 'concert-this':
      gerBandsInTown(userSearch);
      break;

    case 'movie-this':
      getOMDB(userSearch);
      break;

    case 'do-what-it-says':
      getRandom();
      break;

    default:
      console.log(
        "Pleae enter one of the following commands: 'concert-this",
        'spotify-this-song'
      );
  }
}

function getSpotify(songName) {
  const spotify = new Spotify(keys.spotify);

  if (!songName) {
    songName = 'Wish you were here';
  }

  // console.log("SongName if not a song name: " + songName);

  spotify.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
      return console.log('error occured: ' + err);
    }

    console.log('========================');
    console.log(
      'Artists(s) Name: ' + data.tracks.items[0].album.artists[0].name + '\r\n'
    );
    console.log('Song Name: ' + data.tracks.items[0].name + '\r\n');
    console.log('Song Preview Link: ' + data.tracks.item[0].href + '\r\n');
    console.log(' Album: ' + data.tracks.items[0].album.name + '\r\n');

    const logSong =
      '=== Start Spotify Entry ===' +
      '\nArtist: ' +
      data.tracks.items[0].album.artist[0].name +
      '\r\n';

    fs.appendFile('log.txt', logSong, function(err) {
      if (err) throw err;
    });
  });
}

function getBandsInTown(artist) {
  const Artists = userSearch;
  const bandQueryURL =
    'https://rest.bandsintown.com/artists/' +
    artist +
    '/events?app_id=codingbootcamp';

  axios.get(bandQueryURL).then(function(response) {
    console.log('=====================');
    console.log('Name of the venue: ' + response.data[0].venue.name + '\r\n');
    console.log(
      'Date of the event: ' +
        moment(response.data[0].datatime).format('MM-DD-YY') +
        '\r\n'
    );

    const logConcert =
      '=== Start Concert Log ===' +
      '\nName of the musician: ' +
      artist +
      '\nName of the venue' +
      '\r\n';

    fs.appendFile('log.txt', logConcert, function(err) {
      if (err) throw err;
    });
  });

  function getOMDB(movie) {
    if (!movie) {
      // if no movie input is entered this movie will default in its place to be pulled
      movie = 'The Other Guys';
    }

    const movieQueryURL =
      'http://www.omdbapi.com/?i=tt3896198&apikey=4a2c87e5' + movie;

    axios.request(movieQueryUrl).then(function(response) {
      console.log('=====================');
      console.log('* Title: ' + response.data.Title + '\r\n');
      console.log('* Year Released: ' + response.data.Year + '\r\n');
      console.log('* IMDB Rating: ' + response.data.imdbRating + '\r\n');
      console.log(
        '* Rotten Tomatoes Rating : ' + response.data.Ratings[1].Value + '\r\n'
      );
      console.log(
        '* Country where produced: ' + response.data.Country + '\r\n'
      );
      console.log('* Language:  ' + response.data.Language + '\r\n');
      console.log('* Plot: ' + response.data.Plot + '\r\n');
      console.log('* Actoirs: ' + response.data.Actors + '\r\n');

      const logMovie =
        '=== Start Movie Log ===' +
        '\nMovie Title: ' +
        response.dat.Title +
        '\rYear released' +
        '\r\n';

      fs.appendFile('log.txt', logMovie, function(err) {
        if (err) throw err;
      });
    });
  }

  function getRandom() {
    fs.readFile('random.txt', 'utf8', function(error, data) {
      if (error) {
        return console.log(error);
      } else {
        console.log(data);

        const randomData = data.split(',');

        liriRun(randomData[0], randomData[1]);
      }
    });
  }

  function logResults(data) {
    fs.appendFile('log.txt', data, function(err) {
      if (err) throw err;
    });
  }

  liriRun(appCommand, userSearch);
}
