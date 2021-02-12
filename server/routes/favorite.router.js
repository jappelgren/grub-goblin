const express = require('express');
const { Pool } = require('pg');
const pool = require('../modules/pool');
const router = express.Router();
const rejectUnauthenticated = require('../modules/authentication-middleware')


router.put('/:id', rejectUnauthenticated, (req, res) => {
    queryText = `
    UPDATE "recipes"
    SET "fav" = $1
    WHERE id = $2
  `
    pool.query(queryText, [req.body, req.recipe.id])
});


module.exports = router;
