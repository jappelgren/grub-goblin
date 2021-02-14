const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const axios = require('axios');
require('dotenv').config();


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
  `;
  pool.query(queryText, [req.user.id])
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });

});


router.post('/', rejectUnauthenticated, async (req, res) => {
  try {
    console.log(req.body);
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

    const recipeResult = await pool.query(recipeQueryText, queryVariables);

    const newRecipeId = recipeResult.rows[0].id;

    const ingredientQueryText = `
      INSERT INTO "ingredients" ("ingredient", "recipe_id")
      VALUES ($1, $2)
      `;

    req.body.ingredients.forEach(async (ingredient) => {
      const ingredientResult = await pool.query(ingredientQueryText, [ingredient, newRecipeId]);

    });

    const recipeToAnalyze = {
      title: req.body.recipe_name,
      yield: req.body.servings,
      ingr: req.body.ingredients
    };

    const nutritionResult = await axios.post(
      `https://api.edamam.com/api/nutrition-details?app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`,
      recipeToAnalyze
    );


    const nutritionMacros = nutritionResult.data.totalNutrients;
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
      `;

    const calories = await nutritionMacros?.ENERC_KCAL?.quantity || 0;
    const fat = await nutritionMacros?.FAT?.quantity || 0;
    const satFat = await nutritionMacros?.FASAT?.quantity || 0;
    const transFat = await nutritionMacros?.FATRN?.quantity || 0;
    const fatMono = await nutritionMacros.FAMS.quantity || 0;
    const fatPoly = await nutritionMacros.FAPU.quantity || 0;
    const carbs = await nutritionMacros.CHOCDF.quantity || 0;
    const fiber = await nutritionMacros.FIBTG.quantity || 0;
    const sugar = await nutritionMacros.SUGAR.quantity || 0;
    const protein = await nutritionMacros.PROCNT.quantity || 0;
    const cholesterol = await nutritionMacros?.CHOLE?.quantity || 0;
    const sodium = await nutritionMacros.NA.quantity || 0;
    const calcium = await nutritionMacros.CA.quantity || 0;
    const magnesium = await nutritionMacros.MG.quantity || 0;
    const potassium = await nutritionMacros.K.quantity || 0;
    const iron = await nutritionMacros.FE.quantity || 0;
    const zinc = await nutritionMacros.ZN.quantity || 0;
    const phosphorus = await nutritionMacros.P.quantity || 0;
    const vitA = await nutritionMacros?.VITA_RAE?.quantity || 0;
    const vitC = await nutritionMacros?.VITC?.quantity || 0;
    const vitB1 = await nutritionMacros?.THIA?.quantity || 0;
    const vitB2 = await nutritionMacros?.RIBF?.quantity || 0;
    const vitB3 = await nutritionMacros?.NIA?.quantity || 0;
    const vitB6 = await nutritionMacros?.VITB6A?.quantity || 0;
    const vitB9 = await nutritionMacros?.FOLAC?.quantity || 0;
    const vitB12 = await nutritionMacros?.VITB12?.quantity || 0;
    const vitD = await nutritionMacros?.VITD?.quantity || 0;
    const vitE = await nutritionMacros?.TOCPHA?.quantity || 0;
    const vitK = await nutritionMacros?.VITK1?.quantity || 0;

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
    ];


    const nutritionPostResult = await pool.query(queryText, sanitizedNutrition);

    await res.sendStatus(201);


  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }


});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const id = req.params.id;
  console.log(req.params.id);

  const queryText = `
    DELETE FROM "recipes"
    WHERE "id" = $1 AND "user_id" = $2
  `;
  pool.query(queryText, [req.params.id, req.user.id])
    .then((result) => {
      res.sendStatus(200);
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.put('/:id', rejectUnauthenticated, async (req, res) => {
  console.log(req.body);
  const recipeQueryText = `
    UPDATE "recipes"
    SET "recipe_name" = $1, "photo" = $2, "directions" = $3, "servings" = $4, "meal" = $5
    WHERE "id" = $6 AND "user_id" = $7;
  `;
  const sanitizedRecipeVariables = [
    req.body.recipe_name,
    req.body.photo,
    req.body.directions,
    req.body.servings,
    req.body.meal,
    req.params.id,
    req.user.id
  ];

  const recipeResult = await pool.query(recipeQueryText, sanitizedRecipeVariables);
  try {
    const deleteIngrQueryText = `
    DELETE FROM "ingredients"
    WHERE "id" = $1;
  `;

    const newIngredientQueryText = `
    INSERT INTO "ingredients" ("ingredient", "recipe_id")
    VALUES ($1, $2)
  `;

    const updateIngredientQueryText = `
    UPDATE "ingredients"
    SET "quantity" = $1, "measure" = $2, "ingredient" = $3, "recipe_id" = $4
    WHERE "id" = $5
  `;

    req.body.ingredient.forEach(async (ingredient) => {
      if (ingredient.delete) {
        await pool.query(deleteIngrQueryText, [ingredient.id]);
      } else if (!ingredient.id) {
        await pool.query(newIngredientQueryText, [ingredient.ingredient, req.params.id,]);
      } else {
        const sanitizedIngredients = [
          ingredient.quantity,
          ingredient.measure,
          ingredient.ingredient,
          req.params.id,
          ingredient.id
        ];

        await pool.query(updateIngredientQueryText, sanitizedIngredients);
      }

    });

    if (await req.body.update) {
      const recipeToAnalyze = {
        title: req.body.recipe_name,
        yield: req.body.servings,
        ingr: req.body.ingredient.map((ingredient) => {
          return ingredient.ingredient;
        })
      };

      const nutritionResult = await axios.post(
        `https://api.edamam.com/api/nutrition-details?app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`,
        recipeToAnalyze
      );


      const nutritionMacros = nutritionResult.data.totalNutrients;
      const queryText = `
        UPDATE "nutrition_info"
        SET "cal" = $1,
            "fat" = $2,
            "sat_fat" = $3,
            "trans_fat" = $4,
            "mono_un_fat" = $5,
            "poly_un_fat" = $6,
            "carb" = $7,
            "fiber" = $8,
            "sugar" = $9,
            "protein" = $10,
            "chol" = $11,
            "sodium" = $12,
            "calcium" = $13,
            "magnesium" = $14,
            "potassium" = $15,
            "iron" = $16,
            "zinc" = $17,
            "phosphorus" = $18,
            "vit_a" = $19,
            "vit_c" = $20,
            "vit_b1" = $21,
            "vit_b2" = $22,
            "vit_b3" = $23,
            "vit_b6" = $24,
            "vit_b9" = $25,
            "vit_b12" = $26,
            "vit_d" = $27,
            "vit_e" = $28,
            "vit_k" = $29
        WHERE "recipes_id" = $30

    `;

      const calories = await nutritionMacros?.ENERC_KCAL?.quantity || 0;
      const fat = await nutritionMacros?.FAT?.quantity || 0;
      const satFat = await nutritionMacros?.FASAT?.quantity || 0;
      const transFat = await nutritionMacros?.FATRN?.quantity || 0;
      const fatMono = await nutritionMacros.FAMS.quantity || 0;
      const fatPoly = await nutritionMacros.FAPU.quantity || 0;
      const carbs = await nutritionMacros.CHOCDF.quantity || 0;
      const fiber = await nutritionMacros.FIBTG.quantity || 0;
      const sugar = await nutritionMacros.SUGAR.quantity || 0;
      const protein = await nutritionMacros.PROCNT.quantity || 0;
      const cholesterol = await nutritionMacros?.CHOLE?.quantity || 0;
      const sodium = await nutritionMacros.NA.quantity || 0;
      const calcium = await nutritionMacros.CA.quantity || 0;
      const magnesium = await nutritionMacros.MG.quantity || 0;
      const potassium = await nutritionMacros.K.quantity || 0;
      const iron = await nutritionMacros.FE.quantity || 0;
      const zinc = await nutritionMacros.ZN.quantity || 0;
      const phosphorus = await nutritionMacros.P.quantity || 0;
      const vitA = await nutritionMacros?.VITA_RAE?.quantity || 0;
      const vitC = await nutritionMacros?.VITC?.quantity || 0;
      const vitB1 = await nutritionMacros?.THIA?.quantity || 0;
      const vitB2 = await nutritionMacros?.RIBF?.quantity || 0;
      const vitB3 = await nutritionMacros?.NIA?.quantity || 0;
      const vitB6 = await nutritionMacros?.VITB6A?.quantity || 0;
      const vitB9 = await nutritionMacros?.FOLAC?.quantity || 0;
      const vitB12 = await nutritionMacros?.VITB12?.quantity || 0;
      const vitD = await nutritionMacros?.VITD?.quantity || 0;
      const vitE = await nutritionMacros?.TOCPHA?.quantity || 0;
      const vitK = await nutritionMacros?.VITK1?.quantity || 0;

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
        req.params.id
      ];


      const nutritionPostResult = await pool.query(queryText, sanitizedNutrition);
      console.log('Did hit the api');
    } else {
      console.log('Didn\'t hit the api');
    }


    await res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

});
module.exports = router;