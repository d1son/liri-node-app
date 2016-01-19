var fs = require("fs");
// var keys = require("keys");
// var twitter = require('twitter');
// var spotify = require("spotify");
var request = require('request');

var params = process.argv.slice(2);


request('http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&r=json', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage. 
  }
})


// fs.readFile("keys.js", "utf8", function(error, data){

// });