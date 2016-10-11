// Handle HTTP route GET / and POST / i.se. Home

var Profile = require("./profile");
var renderer = require ("./renderer");
var querystring = require("querystring");
var fs = require("fs");


var commonHeaders = {'Content-Type': 'text/html'};

function home(request,response){
  if (request.url === '/') {
    if (request.method.toLowerCase() === "get"){
        response.writeHead(200, commonHeaders);
        renderer.view("header", {}, response);
        renderer.view("search", {}, response);
        renderer.view("footer", {}, response);
        response.end();
    } else {

      //if url === '/' && GET
      //get the post data from body
      request.on("data", function(postBody){
        console.log(postBody.toString());

        var query = querystring.parse(postBody.toString());
        response.writeHead(303, { "Location": "/" + query.username });
        response.end();

      });
      //extract the username
      //redirect to the username




    }

//if url === '/' && GET
  //show search
//if url === '/' && POST
  //redirect to /:username
}
}

function css(request, response){
  if (request.url.indexOf(".css") !== -1) {
  var file = fs.readFileSync(`.${request.url}`)
  response.writeHead(200, {'Content-Type': 'text/css'})
  response.write(file);
  response.end();
  }
}



//Handle HTTP route GET /:username i.e. /bartkluczynski
function user(request, response) {
  //if url === '/...'
  var username = request.url.replace("/", "");
  if (username.length > 0 && request.url.indexOf('.css') === -1) {
    response.writeHead(200, commonHeaders);
    renderer.view("header", {}, response);
      //get json from treehouse
    var studentProfile = new Profile(username);
      //on 'end'
    studentProfile.on("end", function(profileJSON){
      //show profile

      //Store the values which we need
    var values = {
      avatarURL: profileJSON.gravatar_url,
      username: profileJSON.profile_name,
      badgecount: profileJSON.badges.length,
      javascriptPoints: profileJSON.points.JavaScript

    }
      //simple response

      renderer.view("profile", values, response);
      renderer.view("footer", {}, response);
      response.end();
    });



    //on 'error'
    studentProfile.on("error", function(error){

      renderer.view("error", {errorMessage: error.message}, response);
      renderer.view("search", {}, response);
      renderer.view("footer", {}, response);
      response.end();
  });


    }
  }

//Function that handles the reading of files and merge in value
  //read from file and get string

  module.exports.home = home;
  module.exports.user = user;
  module.exports.css = css;
