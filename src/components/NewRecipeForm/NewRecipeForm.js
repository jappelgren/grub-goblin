import { useState } from "react";
import { useDispatch } from "react-redux";

export default function NewRecipeForm() {
    //most of this component is very similar to the EditRecipe component in function.

    //ingredientArr starts with two empty strings. This is used as default state for the 
    // newRecipeDefaultState.  The recipe form will map over this array to create
    //the inputs for the form.
    const [ingredientArr, setIngredientArr] = useState(['', '']);
    const newRecipeDefaultState = { recipe_name: '', photo: '', directions: '', servings: '', meal: '', ingredients: ingredientArr };
    const [newRecipe, setNewRecipe] = useState(newRecipeDefaultState);
    const dispatch = useDispatch();

    //handleChange handles the changing all aspects of the recipe except fot the ingredients
    const handleChange = (event) => {
        if (event.target.name === 'servings') {
            setNewRecipe({ ...newRecipe, [event.target.name]: Number(event.target.value) });
        } else {
            setNewRecipe({ ...newRecipe, [event.target.name]: event.target.value });
        }
    };

    //handleIngredient handles the editing of the ingredients.  Since ingredients can be added, removed and edited,
    //more logic is required to change them.
    const handleIngredient = index => event => {
        let tempArr = [...ingredientArr];
        if (event.target.name === 'remove') {
            tempArr.splice(index, 1);
        } else if (event.target.name === 'add') {
            tempArr.push('');
        } else if (event.target.name === 'ingredients') {
            tempArr[index] = event.target.value;
        }

        setIngredientArr(tempArr);
        setNewRecipe({ ...newRecipe, ingredients: tempArr });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({ type: 'ADD_RECIPE', payload: newRecipe });
        recipeCancel();
        setNewRecipe(newRecipeDefaultState);
    };

    const recipeCancel = () => {
        dispatch({ type: 'CLOSE_RECIPE_ENTRY' });
        setNewRecipe(newRecipeDefaultState);
    };

    console.log(newRecipe);
    return (
        <div className="recipe-form">
            <header className="recipe-header edit-header">
                <h1>ADD RECIPE</h1>
            </header>
            <form onSubmit={handleSubmit}>
                <main className="recipe-modal-main edit-main modal-fade">
                    <div className="ingr-pic-meal-tag-container">
                        <div className="recipe-modal-ingredients">
                            <div className="input-label-container">
                                <label className="label" htmlFor="recipe_name">Recipe Name</label>
                                <input
                                    required
                                    name="recipe_name"
                                    type="text"
                                    onChange={handleChange}
                                    value={newRecipe.recipe_name}
                                    placeholder="Recipe Name" />
                            </div>
                            {newRecipe.ingredients.map((ingr, i) => (
                                <div className="ingredient-minus-container" key={i}>
                                    <div className="input-label-container">
                                        <label className="label" htmlFor="recipe_name">Ingredient</label>
                                        <input
                                            required
                                            type="text"
                                            name="ingredients"
                                            value={ingr}
                                            onChange={handleIngredient(i)}
                                            placeholder="Ingredient" />
                                    </div>
                                    <img
                                        name="remove"
                                        onClick={handleIngredient(i)}
                                        className="plus-minus-icon"
                                        src="images/iconmonstr-minus-5.svg"
                                        alt="A green circle with a white minus symbol in the center"
                                    />
                                </div>
                            ))}
                            <div className="plus-container">
                                <img name="add" onClick={handleIngredient()} className="plus-minus-icon plus-icon" src="images/iconmonstr-plus-5.svg" alt="" />
                            </div>
                        </div>
                        <div className="recipe-modal-photo-nutrition">
                            <div className="input-label-container">
                                <label className="label" htmlFor="recipe_name">Directions</label>
                                <input
                                    name="photo"
                                    value={newRecipe.photo}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Image URL" />
                            </div>
                            <div className="input-label-container">
                                <label className="label" htmlFor="recipe_name">Servings</label>
                                <input
                                    required
                                    name="servings"
                                    value={newRecipe.quantity}
                                    onChange={handleChange}
                                    type="number"
                                    placeholder="Servings" />
                            </div>
                            <div className="input-label-container">
                                <label className="label" htmlFor="recipe_name">Meal</label>
                                <select
                                    required
                                    name="meal"
                                    onChange={handleChange}
                                    defaultValue={''}
                                    className="meal-select"
                                    id="meal">
                                    <option disabled value="">Select Meal</option>
                                    <option value="Breakfast">Breakfast</option>
                                    <option value="Lunch">Lunch</option>
                                    <option value="Dinner">Dinner</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="text-area-directions">
                        <div className="input-label-container">
                            <label className="label" htmlFor="recipe_name">Directions</label>
                            <textarea
                                required
                                onChange={handleChange}
                                value={newRecipe.description}
                                name="directions"
                                id="directions"
                                cols="30"
                                rows="10"
                            />
                        </div>
                    </div>
                    <div className="modal-button-container edit-buttons">
                        <button className="goblin-button" type="button" onClick={recipeCancel}>Cancel</button>
                        <button className="goblin-button" type="submit" >Complete</button>
                    </div>
                </main>
            </form>
        </div >
    );
}