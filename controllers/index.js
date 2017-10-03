const express = require('express');
const router = express.Router();

//Homepage render path setup
router.get("/", (req, res) => {
    res.render("index");
});

router.get("/:inputUrl", (req, res) => {
    const pattern = /\bhttps?:\/\/.+/g;

    if (pattern.test(req.params.inputUrl)) {
        res.json({ "original_url": `example.original.com`, short_url: `example.short.com` });
    } else {
        res.send("Please enter a URL using a valid format and protocol!")
    }
});

module.exports = router;