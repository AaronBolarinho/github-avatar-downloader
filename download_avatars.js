var arg1 = process.argv[2];
var arg2 = process.argv[3];
// -------------------------------------------
var request = require('request');
var secret = require('./secret.js');
var fs = require('fs');

var myArrayPictures = [];
var myLoginNames = [];

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': secret.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    var array = JSON.parse(body);
    for (var i = 0; i < array.length; i++) {
      myArrayPictures.push(array[i].avatar_url);
      myLoginNames.push(array[i].login);
    }
    cb(err, body);
     console.log(myLoginNames);
     console.log(myArrayPictures);
  });
}

  getRepoContributors(arg1, arg2, function(err, result) {

  for (var i = 0; i < myArrayPictures.length; i++) {

request.get(myArrayPictures[i])               // Note 1
       .on('error', function (err) {                                   // Note 2
         throw err;
       })
       .on('response', function (response) {
         console.log('Downloading image...');                           // Note 3
         console.log('Response Status Code: ', response.statusCode);
         console.log('Response Message: ', response.statusMessage)
         console.log('Response Content Type: ', response.headers['content-type'])
       })
       .pipe(fs.createWriteStream('./avatars' + "/" + myLoginNames[i] + '.jpeg'));

};
});

  if (!arg1 || !arg2){
    console.log("Please provide the two elements");
    process.exit()
  };

console.log('Welcome to the GitHub Avatar Downloader!');
