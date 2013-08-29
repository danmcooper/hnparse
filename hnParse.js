var request = require('request'),
    xml2js = require('xml2js');

var url = "https://news.ycombinator.com/rss",
    parser = new xml2js.Parser(); 

var parse = function(callback) {
    request(url, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            parser.parseString(body, function (err, result) {
                callback(err, result);
            });
        } else {
            callback(error, {error: error, statusCode: response.statusCode});
        }
    });
};

var changeUrl = function(newUrl) {
    url = newUrl;
};

module.exports.parse = parse;
module.exports.changeUrl = changeUrl;