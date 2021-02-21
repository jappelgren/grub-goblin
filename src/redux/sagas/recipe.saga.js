import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//Starts spinner, posts to server the new recipe, then fetches the recipes and week,
//stops spinner
function* addRecipe(action) {
    try {
        yield put({ type: 'TOGGLE_SPINNER' });
        yield axios.post('/api/recipes', action.payload);
        yield put({ type: 'FETCH_RECIPES' });
        yield put({ type: 'FETCH_WEEK' });
        yield put({ type: 'TOGGLE_SPINNER' });
    } catch (err) {
        console.log(err);
        yield put({ type: 'TOGGLE_SPINNER' });
        alert('Error adding recipe, please try again.');

    }
}

//Identical to the addRecipe function, but gets the recipe information from server side
//web scraper and when that response comes back it posts it back to the server..
function* importRecipe(action) {
    try {
        yield put({ type: 'TOGGLE_SPINNER' });
        const response = yield axios.get(`/api/scrape?url=${action.payload}`);
        yield axios.post('/api/recipes', response.data);
        yield put({ type: 'FETCH_RECIPES' });
        yield put({ type: 'TOGGLE_SPINNER' });
    } catch (err) {
        console.log(err);
        yield put({ type: 'TOGGLE_SPINNER' });
        alert('Unable to auto import recipe.  Time to click on add recipe and flex your copy and past skills');
    }
}

//Gets all recipes from database.
function* fetchRecipes() {
    try {
        const response = yield axios.get('/api/recipes');
        console.log(response.data.rows);
        yield put({ type: 'SET_RECIPES', payload: response.data.rows });
    } catch (err) {
        console.log(err);
    }
}

//A put that changes if a recipe is favorited or not.
function* favRecipe(action) {
    console.log(action.payload.fav);
    try {
        yield axios.put(`/api/fav/${action.payload.recipes_id}`, { fav: action.payload.fav });
        yield put({ type: 'FETCH_RECIPES' });
        yield put({ type: 'FETCH_WEEK' });
    } catch (err) {
        console.log(err);
    }
}

function* deleteRecipe(action) {
    console.log(action.payload);
    yield axios.delete(`/api/recipes/${action.payload}`);
    yield put({ type: 'FETCH_RECIPES' });
    yield put({ type: 'FETCH_WEEK' });
}

function* editRecipe(action) {
    try {
        console.log(action.payload);
        yield put({ type: 'TOGGLE_SPINNER' });
        yield axios.put(`/api/recipes/${action.payload.recipes_id}`, action.payload);
        yield put({ type: 'FETCH_RECIPES' });
        yield put({ type: 'FETCH_WEEK' });
        yield put({ type: 'TOGGLE_SPINNER' });
    } catch (err) {
        console.log(err);
        yield put({ type: 'TOGGLE_SPINNER' });
    }
}



export default function* recipeSaga() {
    yield takeLatest('ADD_RECIPE', addRecipe);
    yield takeLatest('IMPORT_RECIPE', importRecipe);
    yield takeLatest('FETCH_RECIPES', fetchRecipes);
    yield takeLatest('DELETE_RECIPE', deleteRecipe);
    yield takeLatest('FAV_RECIPE', favRecipe);
    yield takeLatest('EDIT_RECIPE', editRecipe);
}