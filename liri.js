var fs = require("fs");
var keys = require("./keys.js");
var Twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");

var params = process.argv.slice(2);

switch(params[0]){
	case "movie-this":
	getMovie();
	break;

	case "spotify-this":
	spotifySongs()
	break;

	case "my-tweets":
	myTweets()
	break;

	case "do-what-it-says":
	doWhatItSays()
	break;

	default:
		console.log("err");
}

function getMovie(){
	if(params[1] === undefined){
		request('http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&r=json&tomatoes=true', function (error, response, body) {
		  if (!error && response.statusCode == 200){
		  var movieInfo = "Title: " + JSON.parse(body)["Title"] + "\r\n" + 
		  								"Year: " + JSON.parse(body)["Year"] + "\r\n" + 
		  								"IMDB Rating: " + JSON.parse(body)["imdbRating"] + "\r\n" +  
		  								"Country: " + JSON.parse(body)["Country"] + "\r\n" + 
		  								"Language: " + JSON.parse(body)["Language"] + "\r\n" + 
		  								"Plot: " + JSON.parse(body)["Plot"] + "\r\n" + 
		  								"Actors: " + JSON.parse(body)["Actors"] + "\r\n" + 
		  								"Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"] + "\r\n" + 
		  								"Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"];
			console.log(movieInfo);
			return;
		}
	})
} else {
	request('http://www.omdbapi.com/?t=' + params[1] + '&plot=short&r=json&tomatoes=true', function (error,response, body){
		if (!error && response.statusCode == 200){
			var movieInfo = "Title: " + JSON.parse(body)["Title"] + "\r\n" + 
		  								"Year: " + JSON.parse(body)["Year"] + "\r\n" + 
		  								"IMDB Rating: " + JSON.parse(body)["imdbRating"] + "\r\n" +  
		  								"Country: " + JSON.parse(body)["Country"] + "\r\n" + 
		  								"Language: " + JSON.parse(body)["Language"] + "\r\n" + 
		  								"Plot: " + JSON.parse(body)["Plot"] + "\r\n" + 
		  								"Actors: " + JSON.parse(body)["Actors"] + "\r\n" + 
		  								"Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"] + "\r\n" + 
		  								"Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"];
		  console.log(movieInfo);
		  return;
			}
		})
	}
};

function spotifySongs(){
	if(params[1] === undefined){
		spotify.search({ type: 'track', query: "What's My Age Again?"}, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	 		var songInfo = "Artist: " + data.tracks.items[0].artists[0].name + "\r\n" +
	 									 "Track Title: " + data.tracks.items[0].name + "\r\n" +
	 									 "Preview Link: " + data.tracks.items[0].external_urls.spotify + "\r\n" +
	 									 "Album Name: " + data.tracks.items[0].album.name + "\r\n";
	    console.log(songInfo);
	    return; 
		})
	}
	else {
			spotify.search({ type: 'track', query: params[1]}, function(err, data) {
		    if ( err ) {
		        console.log('Error occurred: ' + err);
		        return;
		    }
		 		var songInfo = "Artist: " + data.tracks.items[0].artists[0].name + "\r\n" +
		 									 "Track Title: " + data.tracks.items[0].name + "\r\n" +
		 									 "Preview Link: " + data.tracks.items[0].external_urls.spotify + "\r\n" +
		 									 "Album Name: " + data.tracks.items[0].album.name + "\r\n";
		    console.log(songInfo);
		    return; 
		})
	}
};

function myTweets(){
	var client = new Twitter({
	  consumer_key: keys.twitterKeys.consumer_key,
	  consumer_secret: keys.twitterKeys.consumer_secret,
	  access_token_key: keys.twitterKeys.access_token_key,
	  access_token_secret: keys.twitterKeys.access_token_secret,
	});

	client.get('statuses/user_timeline', {screen_name: "dson120"}, function(error, data, response){
			if (error){
				console.log(error);
				return;
			}
			for (i = 0; i < data.length; i++){
			var tweetInfo = data[i].text + "\r\n" + data[i].created_at;
		  console.log(tweetInfo);
		}
	});
}

function doWhatItSays(){
	fs.readFile("random.txt", "utf8", function(error, data){
		data = data.split(",");
		spotifySongs(data[1])
	});
};
