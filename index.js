var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var url = require('url');
var https = require('https');

var port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/test', function (req, res) {
    res.send({
        response_type: 'in_channel',
        text: JSON.stringify(req.body)
    });
});

app.post('/zillow', function (req, res) {
    var address = req.body.text;
});

app.post('/geocode', function (request, response) {
    
    var address = request.body.text;
    
    var uri = url.parse({
        host: 'https://geocoding.geo.census.gov',
        pathname: 'geocoder/geographies/onelineaddress',
        query: {
            address: address,
            benchmark: 4,
            vintage: 4,
            format: 'json'
        }
    });
    
    https.get(uri, function (res) {
        var content = '';
        res.on('data', function (data) {
            content+= data.toString();
        });
        res.on('end', function () {
            response.send({
                response_type: 'in_channel',
                text: content
            });
        });
    });
    
});

app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});
