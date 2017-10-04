var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var URL = require('url').parse;
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

function geocodeRecord (idx, record) {
    
    var url = new URL('https://geocoding.geo.census.gov');
    var searchParams = url.searchParams;
    
    url.pathname = 'geocoder/geographies/onelineaddress';
    searchParams.append('address'   , record.address);
    searchParams.append('city'     , record.city);
    searchParams.append('state'    , record.state);
    searchParams.append('benchmark', 4);
    searchParams.append('vintage'  , 4);
    searchParams.append('format'   , 'json');
    
    https.get(url.toString(), function (res) {
        var content = '';
        res.on('data', function (data) {
            content+= data.toString();
        });
        res.on('end', function () {
            record.geocode = JSON.parse(content);
            events.emit('geocode.record', idx, record);
        });
    });
}

app.post('/geocode', function (request, response) {
    
    var address = request.body.text;
    console.log(address);
    var url = URL('https://geocoding.geo.census.gov');
    var searchParams = url.searchParams;
    
    url.pathname = 'geocoder/geographies/onelineaddress';
    searchParams.append('address'  , address);
    searchParams.append('benchmark', 4);
    searchParams.append('vintage'  , 4);
    searchParams.append('format'   , 'json');
    
    console.log(url.toString());
    
    https.get(url.toString(), function (res) {
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
