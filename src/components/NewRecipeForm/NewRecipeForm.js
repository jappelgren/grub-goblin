import { useState } from "react";
import { useDispatch } from "react-redux";

export default function NewRecipeForm() {
    const [ingredientArr, setIngredientArr] = useState(['']);
    const newRecipeDefaultState = { recipe_name: '', photo: '', directions: '', servings: '', meal: '', ingredients: ingredientArr };
    const [newRecipe, setNewRecipe] = useState(newRecipeDefaultState);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        if (event.target.name === 'servings') {
            setNewRecipe({ ...newRecipe, [event.target.name]: Number(event.target.value) });
        } else {
            setNewRecipe({ ...newRecipe, [event.target.name]: event.target.value });
        }
    };

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
                <input
                    required
                    name="recipe_name"
                    type="text"
                    onChange={handleChange}
                    value={newRecipe.recipe_name}
                    placeholder="Recipe Name" />
                {newRecipe.ingredients.map((ingr, i) => (
                    <div key={i}>
                        <input

                            required
                            type="text"
                            name="ingredients"
                            value={ingr}
                            onChange={handleIngredient(i)}
                            placeholder="Ingredient" />
                        {i === newRecipe.ingredients.length - 1 ? <button name="add" onClick={handleIngredient(i)} type="button">+</button> : <button name="remove" onClick={handleIngredient(i)} type="button">-</button>}

                    </div>
                ))}
                <input
                    name="photo"
                    value={newRecipe.photo}
                    onChange={handleChange}
                    type="text"
                    placeholder="Image URL" />
                <input
                    required
                    name="servings"
                    value={newRecipe.quantity}
                    onChange={handleChange}
                    type="number"
                    placeholder="Servings" />
                <select
                    required
                    name="meal"
                    // value={newRecipe.meal}
                    onChange={handleChange}
                    defaultValue={''}
                    id="meal">
                    <option disabled value="">Select Meal</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                </select>
                <textarea
                    required
                    onChange={handleChange}
                    value={newRecipe.description}
                    name="directions"
                    id="directions"
                    cols="30"
                    rows="10"
                />
                <button className="goblin-button" type="button" onClick={recipeCancel}>Cancel</button>
                <button className="goblin-button" type="submit" >Complete</button>
            </form>
        </div>
    );
}