const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')
const axios = require('axios')
require('dotenv').config()


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


router.post('/', rejectUnauthenticated, async (req, res) => {
  try {
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

    const recipeResult = await pool.query(recipeQueryText, queryVariables)

    const newRecipeId = recipeResult.rows[0].id

    const ingredientQueryText = `
      INSERT INTO "ingredients" ("ingredient", "recipe_id")
      VALUES ($1, $2)
      `

    req.body.ingredients.forEach(async (ingredient) => {
      const ingredientResult = await pool.query(ingredientQueryText, [ingredient, newRecipeId])
    })

    const recipeToAnalyze = {
      title: req.body.recipe_name,
      yield: req.body.servings,
      ingr: req.body.ingredients
    }

    const nutritionResult = await axios.post(
      `https://api.edamam.com/api/nutrition-details?app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`,
      recipeToAnalyze
    )
    // console.log(JSON.parse(nutritionResult))
    // await res.send(nutritionResult)

    const nutritionMacros = nutritionResult.data.totalNutrients
    const queryText = `
          INSERT INTO "nutrition_info"(
              "cal",
              "fat",
              "sat_fat",
              "trans_fat",
              "mono_un_fat",
              "poly_un_fat",
              "carb",
              "fiber",
              "sugar",
              "protein",
              "chol",
              "sodium",
              "calcium",
              "magnesium",
              "potassium",
              "iron",
              "zinc",
              "phosphorus",
              "vit_a",
              "vit_c",
              "vit_b1",
              "vit_b2",
              "vit_b3",
              "vit_b6",
              "vit_b9",
              "vit_b12",
              "vit_d",
              "vit_e",
              "vit_k",
              "recipes_id")
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
                  $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 
                  $21, $22, $23, $24, $25, $26, $27, $28, $29, $30)
      `
    const sanitizedNutrition = [
      Math.floor(nutritionMacros.ENERC_KCAL.quantity),
      Math.floor(nutritionMacros.FAT.quantity),
      Math.floor(nutritionMacros.FASAT.quantity),
      Math.floor(nutritionMacros.FATRN.quantity),
      Math.floor(nutritionMacros.FAMS.quantity),
      Math.floor(nutritionMacros.FAPU.quantity),
      Math.floor(nutritionMacros.CHOCDF.quantity),
      Math.floor(nutritionMacros.FIBTG.quantity),
      Math.floor(nutritionMacros.SUGAR.quantity),
      Math.floor(nutritionMacros.PROCNT.quantity),
      Math.floor(nutritionMacros.CHOLE.quantity),
      Math.floor(nutritionMacros.NA.quantity),
      Math.floor(nutritionMacros.CA.quantity),
      Math.floor(nutritionMacros.MG.quantity),
      Math.floor(nutritionMacros.K.quantity),
      Math.floor(nutritionMacros.FE.quantity),
      Math.floor(nutritionMacros.ZN.quantity),
      Math.floor(nutritionMacros.P.quantity),
      Math.floor(nutritionMacros.VITA_RAE.quantity),
      Math.floor(nutritionMacros.VITC.quantity),
      Math.floor(nutritionMacros.THIA.quantity),
      Math.floor(nutritionMacros.RIBF.quantity),
      Math.floor(nutritionMacros.NIA.quantity),
      Math.floor(nutritionMacros.VITB6A.quantity),
      Math.floor(nutritionMacros.FOLAC.quantity),
      Math.floor(nutritionMacros.VITB12.quantity),
      Math.floor(nutritionMacros.VITD.quantity),
      Math.floor(nutritionMacros.TOCPHA.quantity),
      Math.floor(nutritionMacros.VITK1.quantity),
      newRecipeId

    ]

    const nutritionPostResult = await pool.query(queryText, sanitizedNutrition)

    await res.sendStatus(201)


  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }


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
