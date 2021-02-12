const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')
const axios = require('axios')
const scraper = require('../modules/recipeScraper')

router.get('/', rejectUnauthenticated, async (req, res) => {
    console.log(req.query)

    try {
        const scrapeResult = await scraper(req.query.url);
        // await res.send(result);
        // console.log('!!hey!!', scrapeResult)
        let newRecipe;

        if (scrapeResult.length) {
            newRecipe = await {
                recipe_name: scrapeResult[scrapeResult.length - 1]?.name,
                photo: scrapeResult[scrapeResult.length - 1]?.image?.url,
                directions: scrapeResult[scrapeResult.length - 1]?.recipeInstructions?.map((direction) => {
                    return direction.text
                }).join('\n'),
                servings: (scrapeResult[scrapeResult.length - 1]?.recipeYield)?.replace(/\D/gm, '') || 4,
                meal: 'Dinner',
                ingredients: scrapeResult[scrapeResult.length - 1]?.recipeIngredient
            }
        } else {
            newRecipe = await {
                recipe_name: scrapeResult?.name || 'Name Missing',
                photo: scrapeResult?.image?.url,
                directions: scrapeResult?.recipeInstructions?.map((direction) => {
                    return direction.text
                }).join('\n'),
                servings: (scrapeResult?.recipeYield)?.replace(/\D/gm, '') || 4,
                meal: 'Dinner',
                ingredients: scrapeResult?.recipeIngredient
            }
        }



        await res.send(newRecipe)
    } catch (err) {
        console.log(err)
        res.sendStatus(500);
    }
});

module.exports = router;