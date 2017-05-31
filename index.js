var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.get('/slack/lvl10', function (req, res) {
  res.send({
      response_type: 'in_channel',
      text: 'Hello world'
  })
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
