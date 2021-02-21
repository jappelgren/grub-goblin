const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const axios = require('axios');
const scraper = require('../modules/recipeScraper');

router.get('/', rejectUnauthenticated, async (req, res) => {
    console.log(req.query);

    try {
        const scrapeResult = await scraper(req.query.url);

        let newRecipe;

        //The results from the scraper vary.  Most often the result is an object, it can be an array of a few objects
        //This logic attempts to parse that fact, but it is inefficient.  The scraping recipe works about 40% of the time.
        //I would definitely like to focus on making this a little more consistent int he future.

        //We are also packaging up the result information into an object the nutrition api can work with.
        if (scrapeResult.length) {
            newRecipe = await {
                recipe_name: scrapeResult[scrapeResult.length - 1]?.name,
                photo: scrapeResult[scrapeResult.length - 1]?.image?.url,
                directions: scrapeResult[scrapeResult.length - 1]?.recipeInstructions?.map((direction) => {
                    return direction.text;
                }).join('\n'),
                servings: (scrapeResult[scrapeResult.length - 1]?.recipeYield)?.replace(/\D/gm, '') || 4,
                meal: 'Dinner',
                ingredients: scrapeResult[scrapeResult.length - 1]?.recipeIngredient
            };
        } else {
            newRecipe = await {
                recipe_name: scrapeResult?.name || 'Name Missing',
                photo: scrapeResult?.image?.url,
                directions: scrapeResult?.recipeInstructions?.map((direction) => {
                    return direction.text;
                }).join('\n'),
                servings: (scrapeResult?.recipeYield)?.replace(/\D/gm, '') || 4,
                meal: 'Dinner',
                ingredients: scrapeResult?.recipeIngredient
            };
        }



        await res.send(newRecipe);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

module.exports = router;