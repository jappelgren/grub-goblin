const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware.js');
const { Pool } = require('pg');


router.get('/', rejectUnauthenticated, (req, res) => {

    const queryText = `
        SELECT * FROM "week"
        JOIN "recipes" ON "week".recipe_id = "recipes".id
        JOIN "nutrition_info" ON "recipes".id = "nutrition_info".recipes_id
        WHERE "recipes".user_id = $1;
  `

    pool.query(queryText, [req.user.id])
        .then((result) => {
            console.log(result)
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
            res.sendStatus(500)
        })
});


router.post('/', rejectUnauthenticated, (req, res) => {

    const queryText = `
        INSERT INTO "week"("meal", "day", "recipe_id")
        VALUES ($1, $2, $3)
    `

    pool.query(queryText, [req.body.meal, req.body.day, req.body.recipe_id])
        .then((result) => {
            res.sendStatus(201)
        })
        .catch((err) => {
            console.log(err)
            res.sendStatus(500)
        })
});


router.put('/:id', rejectUnauthenticated, (req, res) => {
    const id = req.params.id

    const queryText = `
        
    `

});


router.delete('/', (req, res) => {

});


module.exports = router;
