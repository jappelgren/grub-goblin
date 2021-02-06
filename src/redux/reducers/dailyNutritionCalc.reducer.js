const dailyNutritionCalc = (state = [], action) => {
    switch (action.payload) {
        case 'UPDATE_NUTRITION':
            return [action.payload[0].calories]
        default:
            return state
    }
}

export default dailyNutritionCalc;