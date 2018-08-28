var express = require("express");
var router = express.Router();

router.get('/', function(req, res) {
    res.send('Hello world');
});

router.get("/scrape", function(req, res) {
    request("https://www.wsj.com/", function(error, response, html) {
        var $ = cheerio.load(html);
        $(".wsj-headline").each(function(i, element) {
            var title = $(element).children("a").text();
            var link = $(element).children("a").attr("href");

        if (title && link) {
            db.scrapedData.insert({
                title: title,
                link: link
            },
            function(err, inserted) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(inserted);
                }
            });
        }
        });
    });
    res.render('data')
});