import dailyNutritionCalc from './dailyNutritionCalc.reducer.js';

describe('Testing dailyNutritionCalc reducer', () => {
    test('ACTION UPDATE_NUTRITION', () => {
        const initialState = [
            [{}, {}, {}],
            [{}, {}, {}],
            [{}, {}, {}],
            [{}, {}, {}],
            [{}, {}, {}],
            [{}, {}, {}],
            [{}, {}, {}],
        ];

        const expectedResult = [
            [{ day_index: 0, meal_index: 0, recipe: { recipe_name: 'peaches and olives' } }, {}, {}],
            [{}, {}, {}],
            [{}, { day_index: 2, meal_index: 1, recipe: { recipe_name: 'garden salsa sunchips' } }, {}],
            [{}, {}, {}],
            [{}, {}, {}],
            [{}, {}, {}],
            [{}, {}, {}],
        ];

        const action = {
            type: 'UPDATE_NUTRITION',
            payload: [
                { day_index: 0, meal_index: 0, recipe: { recipe_name: 'peaches and olives' } },
                { day_index: 2, meal_index: 1, recipe: { recipe_name: 'garden salsa sunchips' } }
            ]
        };

        expect(dailyNutritionCalc(initialState, action)).toEqual(expectedResult);

    });
    
    test('ACTION REMOVE_NUTRITION', () => {
        const expectedResult = [
            [{}, {}, {}],
            [{}, {}, {}],
            [{}, { day_index: 2, meal_index: 1, recipe: { recipe_name: 'garden salsa sunchips' } }, {}],
            [{}, {}, {}],
            [{}, {}, {}],
            [{}, {}, {}],
            [{}, {}, {}],
        ];

        const initialState = [
            [{ day_index: 0, meal_index: 0, recipe: { recipe_name: 'peaches and olives' } }, {}, {}],
            [{}, {}, {}],
            [{}, { day_index: 2, meal_index: 1, recipe: { recipe_name: 'garden salsa sunchips' } }, {}],
            [{}, {}, {}],
            [{}, {}, {}],
            [{}, {}, {}],
            [{}, {}, {}],
        ];

        const action = {
            type: 'REMOVE_NUTRITION',
            payload:
                { day_index: 0, meal_index: 0, recipe: { recipe_name: 'peaches and olives' } }

        };

        expect(dailyNutritionCalc(initialState, action)).toEqual(expectedResult);
    });

    test('ACTION EMPTY_WEEK_REDUCER', () => {
        const expectedResult = [
            [{}, {}, {}],
            [{}, {}, {}],
            [{}, {}, {}],
            [{}, {}, {}],
            [{}, {}, {}],
            [{}, {}, {}],
            [{}, {}, {}],
        ];

        const initialState = [
            [{ day_index: 0, meal_index: 0, recipe: { recipe_name: 'peaches and olives' } }, {}, {}],
            [{}, {}, {}],
            [{}, { day_index: 2, meal_index: 1, recipe: { recipe_name: 'garden salsa sunchips' } }, {}],
            [{}, {}, {}],
            [{}, {}, {}],
            [{}, {}, {}],
            [{}, {}, {}],
        ];

        const action = {
            type: 'EMPTY_WEEK_REDUCER',
            payload:
                { day_index: 0, meal_index: 0, recipe: { recipe_name: 'peaches and olives' } }

        };

        expect(dailyNutritionCalc(initialState, action)).toEqual(expectedResult);
    });

});