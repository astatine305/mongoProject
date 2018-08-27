var express = require("express");
var mongojs = require("mongojs");
var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");

var app = express();

var PORT = process.env.PORT || 3000;

// Connect to Mongoose
mongoose.connect('mongodb://localhost/mongob');
var db = mongoose.connection;

app.get('/', function(req, res) {
    res.send('Hello world');
});


app.listen(PORT, function() {
    console.log("Running on port " + PORT);
});
