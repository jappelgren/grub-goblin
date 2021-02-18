import { combineReducers } from 'redux';
import errors from './errors.reducer';
import modalReducer from './modal.reducer.js';
import recipeReducer from './recipe.reducer.js';
import recipeSelectedId from './recipeSelectedId.reducer.js';
import user from './user.reducer';
import viewRecipeReducer from './viewRecipe.reducer.js';
import weekReducer from './week.reducer.js';
import dailyNutritionCalc from "./dailyNutritionCalc.reducer";
import { spinnerReducer } from './spinner.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  recipeSelectedId,
  recipeReducer,
  modalReducer,
  viewRecipeReducer,
  weekReducer,
  dailyNutritionCalc,
  spinnerReducer
});

export default rootReducer;
