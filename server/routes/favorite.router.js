const express = require('express');
const { Pool } = require('pg');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')


router.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log(req.body)
    queryText = `
    UPDATE "recipes"
    SET "fav" = $1
    WHERE id = $2
  `
    pool.query(queryText, [req.body.fav, req.params.id])
        .then((result) => {
            console.log(result)
            res.sendStatus(200)
        })
        .catch((err) => {
            console.log(err)
            res.sendStatus(500)
        })
});


module.exports = router;
