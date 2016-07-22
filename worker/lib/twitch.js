var request = require('request');
var querystring = require('querystring');
var moment = require('moment');
var utils = require('./utils');

var headers = {
    'Accept': 'application/vnd.twitchtv.v3+json'
}

// Construct timestamped video urls
var constructURL = function (url, timestamp) {
    timestamp = utils.milliToString(parseInt(timestamp));
    var query = querystring.stringify({
        t: timestamp
    });
    return url + '?' + query;
}

// Send request to twitch api
var api = function (params) {
    var url = 'https://api.twitch.tv/kraken/' + params.url
    if (params.query) {
        url = url + "?" + querystring.stringify(params.query);
    }

    var options = {
        url: url,
        headers: headers
    }
    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            if (error) {
                console.error("Twitch api call failed: " + error);
                reject(error);
            } else {
                resolve(JSON.parse(body));
            }
        });
    });
};

module.exports = {
    api: api,
    constructURL: constructURL
}
