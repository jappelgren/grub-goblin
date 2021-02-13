import axios from 'axios'
import { put, takeLatest } from 'redux-saga/effects'

function* fetchWeek() {
    try {
        const weekResult = yield axios.get('/api/plan')
        yield put({ type: 'SET_WEEK', payload: weekResult.data.rows })
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

function* weekSaga() {
    yield takeLatest('FETCH_WEEK', fetchWeek)
    yield takeLatest('SET_MEAL', setMeal)
}

export default weekSaga;