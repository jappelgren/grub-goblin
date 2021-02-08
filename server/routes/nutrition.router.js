const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware.js')



router.post('/', rejectUnauthenticated, (req, res) => {
    const nutritionMacros = req.body.nutrition.totalNutrients
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
        req.body.recipe_id

    ]

    pool.query(queryText, sanitizedNutrition)
        .then((result) => {
            res.sendStatus(201)
        })
        .catch((err) => {
            console.log(err)
            res.sendStatus(500)
        })

});

module.exports = router;
