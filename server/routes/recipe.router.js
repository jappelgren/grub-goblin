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
    JSON_AGG("ingredients") ingredient
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

    const calories = await Math.floor(nutritionMacros?.ENERC_KCAL?.quantity) || 0
    const fat = await Math.floor(nutritionMacros?.FAT?.quantity) || 0
    const satFat = await Math.floor(nutritionMacros?.FASAT?.quantity) || 0
    const transFat = await Math.floor(nutritionMacros?.FATRN?.quantity) || 0
    const fatMono = await Math.floor(nutritionMacros.FAMS.quantity) || 0
    const fatPoly = await Math.floor(nutritionMacros.FAPU.quantity) || 0
    const carbs = await Math.floor(nutritionMacros.CHOCDF.quantity) || 0
    const fiber = await Math.floor(nutritionMacros.FIBTG.quantity) || 0
    const sugar = await Math.floor(nutritionMacros.SUGAR.quantity) || 0
    const protein = await Math.floor(nutritionMacros.PROCNT.quantity) || 0
    const cholesterol = await Math.floor(nutritionMacros?.CHOLE?.quantity) || 0
    const sodium = await Math.floor(nutritionMacros.NA.quantity) || 0
    const calcium = await Math.floor(nutritionMacros.CA.quantity) || 0
    const magnesium = await Math.floor(nutritionMacros.MG.quantity) || 0
    const potassium = await Math.floor(nutritionMacros.K.quantity) || 0
    const iron = await Math.floor(nutritionMacros.FE.quantity) || 0
    const zinc = await Math.floor(nutritionMacros.ZN.quantity) || 0
    const phosphorus = await Math.floor(nutritionMacros.P.quantity) || 0
    const vitA = await Math.floor(nutritionMacros?.VITA_RAE?.quantity) || 0
    const vitC = await Math.floor(nutritionMacros?.VITC?.quantity) || 0
    const vitB1 = await Math.floor(nutritionMacros?.THIA?.quantity) || 0
    const vitB2 = await Math.floor(nutritionMacros?.RIBF?.quantity) || 0
    const vitB3 = await Math.floor(nutritionMacros?.NIA?.quantity) || 0
    const vitB6 = await Math.floor(nutritionMacros?.VITB6A?.quantity) || 0
    const vitB9 = await Math.floor(nutritionMacros?.FOLAC?.quantity) || 0
    const vitB12 = await Math.floor(nutritionMacros?.VITB12?.quantity) || 0
    const vitD = await Math.floor(nutritionMacros?.VITD?.quantity) || 0
    const vitE = await Math.floor(nutritionMacros?.TOCPHA?.quantity) || 0
    const vitK = await Math.floor(nutritionMacros?.VITK1?.quantity) || 0

    const sanitizedNutrition = [
      calories,
      fat,
      satFat,
      transFat,
      fatMono,
      fatPoly,
      carbs,
      fiber,
      sugar,
      protein,
      cholesterol,
      sodium,
      calcium,
      magnesium,
      potassium,
      iron,
      zinc,
      phosphorus,
      vitA,
      vitC,
      vitB1,
      vitB2,
      vitB3,
      vitB6,
      vitB9,
      vitB12,
      vitD,
      vitE,
      vitK,
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
  console.log(req.params.id)

  const queryText = `
    DELETE FROM "recipes"
    WHERE "id" = $1 AND "user_id" = $2
  `
  pool.query(queryText, [req.params.id, req.user.id])
    .then((result) => {
      res.sendStatus(200)
      console.log(result)
    })
    .catch((err) => {
      console.log(err)
      res.sendStatus(500)
    })
})
module.exports = router;
