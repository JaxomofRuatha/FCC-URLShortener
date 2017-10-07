const express = require('express');
const router = express.Router();
const randomstring = require("randomstring");

const Shortened = require("./models/shortened");

//Homepage render path setup
router.get("/", (req, res) => {
    res.render("index");
});

router.get("/new/*", (req, res) => {
    const pattern = /\bhttps?:\/\/.+/g;
    const randUrl = randomstring.generate(7);

    if (pattern.test(req.path.slice(5))) {
        Shortened.create({
            original_url: req.path.slice(5),
            short_url: `${req.protocol}://${req.headers.host}/${randUrl}`
        }).then((record) => {
            res.json({
                original_url: record.original_url,
                short_url: record.short_url
            });
        }).catch((err) => {
            console.error(err);
        })
    } else {
        res.send("Please enter a URL using a valid format and protocol!")
    }
});

router.get("/:redirectUrl", (req, res) => {
    //Check database for shortened URL
    //Redirect to original URL destination
})

module.exports = router;