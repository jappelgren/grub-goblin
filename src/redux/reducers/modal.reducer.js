const modalReducer = (state = { recipeEntry: false, recipeImport: false, recipeView: false }, action) => {
    switch (action.type) {
        case 'OPEN_RECIPE_ENTRY':
            return { ...state, recipeEntry: true }
        case 'CLOSE_RECIPE_ENTRY':
            return { ...state, recipeEntry: false }
        case 'OPEN_RECIPE_IMPORT':
            return { ...state, recipeImport: true }
        case 'CLOSE_RECIPE_IMPORT':
            return { ...state, recipeImport: false }
        case 'OPEN_RECIPE_VIEW':
            return { ...state, recipeView: true }
        case 'CLOSE_RECIPE_VIEW':
            return { ...state, recipeView: false }
        default:
            return state
    }

}

export default modalReducer