const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware.js');

router.delete('/', rejectUnauthenticated, (req, res) => {

    const queryText = `
    DELETE FROM "week"
    WHERE "user_id" = $1
    `;

    pool.query(queryText, [req.user.id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

module.exports = router;