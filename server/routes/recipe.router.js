const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')


router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `
    SELECT "recipes".*, 
    "nutrition_info".*,
      ARRAY_AGG("ingredients".id) ingredient_id,
      ARRAY_AGG("ingredients".ingredient) ingredient
    FROM "recipes"
    JOIN "ingredients" ON "recipes".id = "ingredients".recipe_id
    JOIN "nutrition_info" ON "recipes".id = "nutrition_info".recipes_id 
    WHERE "recipes".user_id = $1
    GROUP BY "recipes".id, "nutrition_info".id;
  `
  pool.query(queryText, [req.user.id])
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
      res.sendStatus(500)
    })

});


router.post('/', rejectUnauthenticated, (req, res) => {
  console.log(req.body)
  const recipeQueryText = `
    INSERT INTO "recipes" ("recipe_name", "photo", "directions", "servings", "meal", "user_id")
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING "id";
  `;

  const queryVariables = [
    req.body.recipe_name,
    req.body.photo,
    req.body.directions,
    req.body.servings,
    req.body.meal,
    req.user.id
  ];

  pool.query(recipeQueryText, queryVariables)
    .then((result) => {
      const newRecipeId = result.rows[0].id

      const ingredientQueryText = `
      INSERT INTO "ingredients" ("ingredient", "recipe_id")
      VALUES ($1, $2)
      `

      req.body.ingredients.forEach((ingredient) => {
        pool.query(ingredientQueryText, [ingredient, newRecipeId])
          .then((result) => {
            if (ingredient === req.body.ingredients[req.body.ingredients.length - 1]) {
              res.sendStatus(201);
            }
          })
          .catch((err) => {
            console.log(err)
            res.sendStatus(500)
          })
      })

    })
    .catch((err) => {
      res.sendStatus(500)
      console.log(err)
    })
});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const id = req.params.id

  const queryText = `
    DELETE FROM "recipes"
    WHERE "id" = $1 AND "user_id" = $2
  `
  pool.query(queryText, [id, req.user.id])
    .then((result) => {
      res.sendStatus(200)
    })
    .catch((err) => {
      console.log(err)
      res.sendStatus(500)
    })
})
module.exports = router;
