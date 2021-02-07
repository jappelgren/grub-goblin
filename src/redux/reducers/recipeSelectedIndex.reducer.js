const recipeSelectedIndex = (state = null, action) => {
    switch (action.type) {
        case 'SET_MON_BREAKFAST':
            return action.payload
        default:
            return state
    }
}

export default recipeSelectedIndex