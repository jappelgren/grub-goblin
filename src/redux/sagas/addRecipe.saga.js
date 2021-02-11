import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addRecipe(action) {
    try {
        yield axios.post('/api/recipes', action.payload)
    } catch (err) {
        if (err == 500) {
            console.log(err)
            alert('Error adding recipe, please try again.')
        } else if (err == 555) {
            alert('Recipe does not contain enough information to be analyzed.')
        }

    }
}

function* importRecipe(action) {
    try {
        const response = yield axios.get(`/api/scrape?url=${action.payload}`)
        console.log(response)
        yield axios.post('/api/recipes', response.data)
    } catch (err) {
        console.log(err)
        alert('Unable to auto import recipe.  Time to click on add recipe and flex your copy and past skills')
    }
}

export default function* recipeSaga() {
    yield takeLatest('ADD_RECIPE', addRecipe)
    yield takeLatest('IMPORT_RECIPE', importRecipe)
}