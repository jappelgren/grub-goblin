const dailyNutritionCalc = (state = [{ calories: 0, carbs: 0 }, { calories: 0, carbs: 0 }, { calories: 0, carbs: 0 },], action) => {


    switch (action.type) {
        case 'UPDATE_NUTRITION':
            console.log(action?.payload[1], 1, action?.payload[0]?.calories)

            const stateCopyAdd = [...state]
            stateCopyAdd.splice(action.payload[1], 1, action.payload[0])

            return stateCopyAdd
        case 'REMOVE_NUTRITION':

            const stateCopyRemove = [...state]
            stateCopyRemove.splice(action.payload, 1, { calories: 0, carbs: 0 })

            return stateCopyRemove

        default:
            return state
    }
}

export default dailyNutritionCalc;