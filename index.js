var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/test', function (req, res) {
    res.send({
        response_type: 'in_channel',
        text: JSON.stringify(req.body)
    });
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
