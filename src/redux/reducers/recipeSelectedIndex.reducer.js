const recipeSelectedIndex = (state = null, action) => {
    switch (action.type) {
        case 'SET_MEAL_INDEX':
            return action.payload
        default:
            return state
    }
}

export default recipeSelectedIndex