const express = require('express');
const router = express.Router();
const randomstring = require("randomstring");
const validator = require("validator");

const Short = require("./models/short");

router.get("/new/*", (req, res) => {
    const randUrl = randomstring.generate(7);

    if (validator.isURL(req.path.slice(5))) {
        Short.create({
            original_url: req.path.slice(5),
            short_url: randUrl
        }).then((record) => {
            res.json({
                original_url: record.original_url,
                short_url: `${req.protocol}://${req.headers.host}/${record.short_url}`
            });
        }).catch((err) => {
            console.error(err);
        })
    } else {
        res.send("Please enter a URL using a valid format and protocol!")
    }
});

router.get("/:redirectUrl", (req, res) => {
    if (req.params.redirectUrl !== null) {
        //Check database for shortened URL
        Short.findOne({ "short_url": req.params.redirectUrl }, (err, reUrl) => {
            //Redirect to original URL destination
            if (err) res.send(err);
            reUrl === null ? res.send("This link does not exist!") : res.redirect(reUrl.original_url);
        })
    } else {
        res.render("index");
    }
})

module.exports = router;