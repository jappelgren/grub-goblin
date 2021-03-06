const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router.js');
const recipeRouter = require('./routes/recipe.router.js');
const mealPlanRouter = require('./routes/mealPlan.router.js');
const clearMealPlanRouter = require('./routes/clearMealPlan.router.js');
const scraper = require('./routes/recipeScraper.router.js');
const favoriteRouter = require('./routes/favorite.router.js');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/recipes', recipeRouter);
app.use('/api/plan', mealPlanRouter);
app.use('/api/clearweek', clearMealPlanRouter);
app.use('/api/scrape', scraper);
app.use('/api/fav', favoriteRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
