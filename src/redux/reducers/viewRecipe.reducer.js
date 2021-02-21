const viewRecipeReducer = (state = {}, action) => {
//Stores the information of the recipe that was selected to be viewed.
    switch (action.type) {
        case 'VIEW_SELECTED_RECIPE':
            return action.payload;
        default:
            return state;
    }
};

export default viewRecipeReducer;