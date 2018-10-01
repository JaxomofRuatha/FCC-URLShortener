const express = require('express');

const router = express.Router();
const randomstring = require('randomstring');
const validator = require('validator');

const Short = require('../../db/models/short');

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/api/shorturl/new', (req, res) => {
  // Generate random string for end of URL
  const randUrl = randomstring.generate(7);

  if (validator.isURL(req.body['input-url'], { require_protocol: true })) {
    // If the URL is valid, construct record with original and short URL
    Short.create({
      original_url: req.body['input-url'],
      short_url: randUrl,
    }).then((record) => {
      res.json({
        original_url: record.original_url,
        short_url: `${req.protocol}://${req.headers.host}/${record.short_url}`,
      });
    }).catch((err) => {
      res.json({ 'error': err });
    });
  } else {
    // If invalid, prompt for valid URL
    res.json({ 'error': 'Please enter a URL using a valid format and protocol!' });
  }
});

router.get('/:redirectUrl', (req, res) => {
  if (req.params.redirectUrl !== null) {
    // Check database for shortened URL
    Short.findOne({ short_url: req.params.redirectUrl }, (err, reUrl) => {
      // Redirect to original URL destination
      if (err) res.json({ 'error': err });
      reUrl === null ? res.json({ 'error': 'This link does not exist!' }) : res.redirect(reUrl.original_url);
    });
  } else {
    res.render('index');
  }
});

module.exports = router;
