const recipeSelectedIndex = (state = null, action) => {
    switch (action.type) {
        case 'SET_MEAL_ID':
            return action.payload;
        default:
            return state;
    }
};

export default recipeSelectedIndex;