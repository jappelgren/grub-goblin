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

export default function* recipeSaga() {
    yield takeLatest('ADD_RECIPE', addRecipe)
}