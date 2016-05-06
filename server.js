const express = require('express'),
  bodyParser = require('body-parser');

var app = express(),
  port = (process.env.PORT || 80);

var developers = {};

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(subdomain({base : 'localhost', removeWWW : true}));
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post('/api/checkout', (request, response) => {
  developers = request.body;
  response.json({message: 'Check it out!'});
});

app.get('/api/checkout', (request, response) => {
  response.json(developers);
});

app.listen(port);
