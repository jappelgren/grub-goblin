import axios from 'axios'
import { put, takeLatest } from 'redux-saga/effects'

function* fetchWeek() {
    try {
        const weekResult = yield axios.get('/api/plan')
        yield put({ type: 'SET_WEEK', payload: weekResult.data.rows })
        yield put({ type: 'UPDATE_NUTRITION', payload: weekResult.data.rows })
    } catch (err) {
        console.log(err)
    }
}

function* setMeal(action) {
    try {
        yield axios.post('/api/plan', action.payload)
        yield put({ type: 'FETCH_WEEK' })
    } catch (err) {
        console.log(err)
    }
}

function* removeMeal(action) {
    try {
        yield axios.delete(`/api/plan/${action.payload.id}`)
        yield put({ type: 'REMOVE_NUTRITION', payload: action.payload })
        yield put({ type: 'FETCH_WEEK' })
    } catch (err) {
        console.log(err)
    }
}

function* updateMeal(action) {
    try {
        yield axios.put(`/api/plan/${action.payload.week_id}`, action.payload)
        yield put({ type: 'FETCH_WEEK' })
    } catch (err) {
        console.log(err)
    }
}

function* weekSaga() {
    yield takeLatest('FETCH_WEEK', fetchWeek)
    yield takeLatest('SET_MEAL', setMeal)
    yield takeLatest('REMOVE_MEAL', removeMeal)
    yield takeLatest('UPDATE_MEAL', updateMeal)
}

export default weekSaga;