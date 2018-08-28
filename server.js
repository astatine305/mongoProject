var express = require("express");
var mongojs = require("mongojs");
var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();


var PORT = process.env.PORT || 3000;

// Static directory
app.use("/public", express.static(__dirname + "/public"));

var routes = require("./routes/routes")

// Connect to Mongoose
// mongoose.connect('mongodb://localhost/mongob');
// var db = mongoose.connection;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongob";
var collections = ["scrapedData"];


mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
//   useMongoClient: true
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("views", path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

var db = mongojs(MONGODB_URI, collections);
db.on("error", function(error) {
    console.log("Database Error: ", error);
});

app.use('/', routes);


app.listen(PORT, function() {
    console.log("Running on port " + PORT);
});

module.exports = router;