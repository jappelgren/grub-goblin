const viewRecipeReducer = (state = {}, action) => {
    console.log('action.payload', action.payload)

    switch (action.type) {
        case 'VIEW_SELECTED_RECIPE':
            return action.payload
        default:
            return state
    }
}

export default viewRecipeReducer