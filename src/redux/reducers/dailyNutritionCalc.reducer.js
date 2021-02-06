const dailyNutritionCalc = (state = [0, 0, 0,], action) => {


    switch (action.type) {
        case 'UPDATE_NUTRITION':
            console.log(action?.payload[1], 1, action?.payload[0]?.calories)

            const stateCopy = [...state]
            stateCopy.splice(action.payload[1], 1, action.payload[0].calories)

            return stateCopy
        default:
            return state
    }
}

export default dailyNutritionCalc;