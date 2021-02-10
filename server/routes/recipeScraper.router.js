const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')
const axios = require('axios')
const scraper = require('../modules/recipeScraper')

router.get('/', rejectUnauthenticated, async (req, res) => {
    try {
        const result = await scraper(req.body.url);
        await res.send(result);
    } catch (err) {
        console.log(err)
        res.sendStatus(500);
    }
});

module.exports = router;