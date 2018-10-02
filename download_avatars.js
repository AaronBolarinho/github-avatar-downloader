var request = require('request');
var secret = require('./secret.js');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': secret.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
    var array = JSON.parse(body);
    for (var i = 0; i < array.length; i++) {
      console.log(array[i].avatar_url);
    }
    // console.log(array);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  // console.log("Errors:", err);
  // console.log("Result:", result);
});

console.log('Welcome to the GitHub Avatar Downloader!');