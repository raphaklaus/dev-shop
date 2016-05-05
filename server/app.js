const express = require('express'),
  bodyParser = require('body-parser');

var app = express(),
  port = 3000;

app.listen(port);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var developers = {};

app.post('/checkout', (request, response) => {
  console.log(request.body);
  response.json('');
});
