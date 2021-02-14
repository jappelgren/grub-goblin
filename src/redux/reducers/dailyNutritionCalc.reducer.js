import { defaultState } from '../variables/dailyCalcDefault.js';

const dailyNutritionCalc = (state = defaultState, action) => {
    console.log('defaultState', defaultState);
    switch (action.type) {
        case 'UPDATE_NUTRITION':

            const stateCopyAdd = [...state];
            //stateCopyAdd at the index of the day(Mon, Tue, etc), splice at the index of the meal (breakfast, lunch, dinner)
            action?.payload?.forEach((dayMealRecipe) => {
                stateCopyAdd[dayMealRecipe.day_index].splice(dayMealRecipe.meal_index, 1, dayMealRecipe);
            });

            return stateCopyAdd;
        case 'REMOVE_NUTRITION':

            const stateCopyRemove = [...state];
            //statCopyRemove at the index of the day(Mon, Tue, etc), splice at the index of the meal (breakfast, lunch, dinner)
            stateCopyRemove[action.payload.day_index].splice(action.payload.meal_index, 1, {});

            return stateCopyRemove;

        case 'EMPTY_WEEK_REDUCER':

            return [
                [{}, {}, {}],
                [{}, {}, {}],
                [{}, {}, {}],
                [{}, {}, {}],
                [{}, {}, {}],
                [{}, {}, {}],
                [{}, {}, {}],
            ];

        default:
            return state;
    }
};

export default dailyNutritionCalc;