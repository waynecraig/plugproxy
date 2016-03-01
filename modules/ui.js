var http = require('http');
var path = require('path');
var express = require('express');
var data = require('./data');
var actions = require('../actions');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(path.join(__dirname, '../static')));

//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/cgi-bin/', actions);

// todo: debug server rendering
app.get('/test.html', function(req, res) {

});

var server = http.createServer(app);

module.exports = server;
