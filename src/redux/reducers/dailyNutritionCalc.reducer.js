import { defaultState } from '../variables/dailyCalcDefault.js'

const dailyNutritionCalc = (state = defaultState, action) => {

    switch (action.type) {
        case 'UPDATE_NUTRITION':
            console.log(action?.payload[1], 1, action?.payload[0]?.calories)

            const stateCopyAdd = [...state]
            //stateCopyAdd at the index of the day(Mon, Tue, etc), splice at the index of the meal (breakfast, lunch, dinner)
            stateCopyAdd[action.payload[2]].splice(action.payload[1], 1, action.payload[0])

            return stateCopyAdd
        case 'REMOVE_NUTRITION':

            const stateCopyRemove = [...state]
            //statCopyRemove at the index of the day(Mon, Tue, etc), splice at the index of the meal (breakfast, lunch, dinner)
            stateCopyRemove[action.payload[1]].splice(action.payload[0], 1, { calories: 0, carbs: 0 })

            return stateCopyRemove

        default:
            return state
    }
}

export default dailyNutritionCalc;