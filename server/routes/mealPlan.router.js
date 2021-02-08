const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware.js');


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
        INSERT INTO "week"("meal", "day", "recipe_id", "user_id")
        VALUES ($1, $2, $3, $4)
    `

    pool.query(queryText, [req.body.meal, req.body.day, req.body.recipe_id, req.user.id])
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
        UPDATE "week"
        SET "recipe_id" = $1
        WHERE "id" = $2 AND "user_id" = $3
    `

    pool.query(queryText, [req.body.recipe_id, id, req.user.id])
        .then((result) => {
            res.sendStatus(200)
        })
        .catch((err) => {
            console.log(err)
            res.sendStatus(500)
        })

});


router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const id = req.params.id

    const queryText = `
        DELETE FROM "week"
        WHERE "id" = $1 AND "user_id" =$2
        ;
    `

    pool.query(queryText, [id, req.user.id])
        .then((result) => {
            res.sendStatus(200)
        })
        .catch((err) => {
            console.log(err)
            res.sendStatus(500)
        })
});

module.exports = router;
