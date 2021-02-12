const viewRecipeReducer = (state = {}, action) => {
    switch (action.type) {
        case 'VIEW_SELECTED_RECIPE':
            return action.payload
        default:
            return state
    }
}

export default viewRecipeReducer