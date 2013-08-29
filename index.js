var express = require('express'),
    hnParse = require('./hnParse');

var app = express();

app.configure(function() {
    app.use('/js', express.static(__dirname + '/public/js'));
    app.use('/css', express.static(__dirname + '/public/css'));    
    app.use(express.static(__dirname + '/public'));
});

app.get('/hackernews.json', function(req, res){
    hnParse.parse(function (error, data) {
        res.send(data);
    });
});

app.listen(3000);