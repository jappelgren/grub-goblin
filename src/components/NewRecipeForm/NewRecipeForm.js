import { useState } from "react"

export default function NewRecipeForm({ closeModal }) {
    const newRecipeDefaultState = { recipe_name: '', photo: '', directions: '', servings: '', meal: '', ingredients: [] }
    const [newRecipe, setNewRecipe] = useState(newRecipeDefaultState)

    const handleChange = (event) => {
        if (event.target.name === 'servings') {
            setNewRecipe({ ...newRecipe, [event.target.name]: Number(event.target.value) })
        } else {
            setNewRecipe({ ...newRecipe, [event.target.name]: event.target.value })
        }

    }

    const handleSubmit = (event) => {
        event.preventDefault()
        closeModal();
        setNewRecipe(newRecipeDefaultState);
    }

    const recipeCancel = () => {
        closeModal()
        setNewRecipe(newRecipeDefaultState);
    }

    console.log(newRecipe)
    return (
        <div className="recipe-form">
            <header className="recipe-header">
                <h1>ADD RECIPE</h1>
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
                <input
                    required
                    type="text"
                    placeholder="Ingredient" />
                <button>+</button>
                <input
                    name="photo"
                    value={newRecipe.photo}
                    onChange={handleChange}
                    type="text"
                    placeholder="Image URL" />
                <input
                    required
                    name="servings"
                    value={newRecipe.serving}
                    onChange={handleChange}
                    type="number"
                    placeholder="Servings" />
                <select
                    required
                    name="Meal"
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
                <button type="reset" onClick={recipeCancel}>Cancel</button>
                <button type="submit" >Complete</button>
            </form>
        </div>
    )
}