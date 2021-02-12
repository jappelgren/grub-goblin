import { useState } from "react"
import { useDispatch } from "react-redux"

export default function EditRecipe({ selectedRecipe, setEditMode, editMode }) {
    const [ingredientArr, setIngredientArr] = useState(selectedRecipe.ingredient);
    const [newRecipe, setNewRecipe] = useState(selectedRecipe);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        if (event.target.name === 'servings') {
            setNewRecipe({ ...newRecipe, [event.target.name]: Number(event.target.value) });
        } else {
            setNewRecipe({ ...newRecipe, [event.target.name]: event.target.value });
        }
    }

    const handleIngredient = index => event => {
        let tempArr = [...ingredientArr];
        if (event.target.name === 'remove') {
            tempArr.splice(index, 1)
        } else if (event.target.name === 'add') {
            tempArr.push('')
        } else if (event.target.name === 'ingredients') {
            tempArr[index] = event.target.value
        }

        setIngredientArr(tempArr)
        setNewRecipe({ ...newRecipe, ingredient: tempArr })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch({ type: 'ADD_RECIPE', payload: newRecipe })
        recipeCancel()
        setNewRecipe(newRecipeDefaultState);
    }

    const recipeCancel = () => {
        dispatch({ type: 'CLOSE_RECIPE_ENTRY' })
        setNewRecipe(newRecipeDefaultState);
    }

    console.log(newRecipe)
    return (
        <div className="recipe-form">
            <header className="recipe-header">
                <h1>EDIT RECIPE</h1>
                <nav className="fav-trash">
                    ❤️ 🗑️
                </nav>
            </header>
            <form onSubmit={handleSubmit}>
                <input
                    required
                    name="recipe_name"
                    type="text"
                    onChange={handleChange}
                    value={newRecipe.recipe_name}
                    placeholder="Recipe Name" />
                {newRecipe.ingredient.map((ingr, i) => (
                    <div key={i}>
                        <input

                            required
                            type="text"
                            name="ingredients"
                            value={ingr.ingredient}
                            onChange={handleIngredient(i)}
                            placeholder="Ingredient" />
                        {i === newRecipe.ingredient.length - 1 ? <button name="add" onClick={handleIngredient(i)} type="button">+</button> : <button name="remove" onClick={handleIngredient(i)} type="button">-</button>}

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
                    value={newRecipe.servings}
                    onChange={handleChange}
                    type="number"
                    placeholder="Servings" />
                <select
                    required
                    name="meal"
                    // value={newRecipe.meal}
                    onChange={handleChange}
                    defaultValue={newRecipe.meal}
                    id="meal">
                    <option disabled value="">Select Meal</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                </select>
                <textarea
                    required
                    onChange={handleChange}
                    value={newRecipe.directions}
                    name="directions"
                    id="directions"
                    cols="30"
                    rows="10"
                />
                <button type="button" onClick={() => setEditMode(!editMode)}>Cancel</button>
                <button type="submit" >Complete</button>
            </form>
        </div >
    )
}