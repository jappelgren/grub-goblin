import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import IngredientItem from '../IngredientItem/IngredientItem.js'
import ViewRecipe from "../ViewRecipe/ViewRecipe.js"

export default function RecipeViewModal() {
    const selectedRecipe = useSelector(state => state?.viewRecipeReducer)
    const [editMode, setEditMode] = useState(false)
    const [nutritionMode, setNutritionMode] = useState(false)
    const [faved, setfaved] = useState(selectedRecipe.fav)

    const dispatch = useDispatch()
    console.log(selectedRecipe)

    const handleFav = () => {
        dispatch({ type: 'FAV_RECIPE', payload: { recipes_id: selectedRecipe.recipes_id, fav: !faved } })
        setfaved(!faved)
    }

    const handleDelete = () => {
        const id = selectedRecipe.recipes_id
        dispatch({ type: 'DELETE_RECIPE', payload: id })
        dispatch({ type: 'CLOSE_RECIPE_VIEW' })
    }


    return (

        <div className="recipe-view-modal">
            {editMode ? <p>edit</p> : (
                nutritionMode ? <p>nutrition</p> :
                    <ViewRecipe
                        selectedRecipe={selectedRecipe}
                        faved={faved}
                        setfaved={setfaved}
                        handleFav={handleFav}
                        handleDelete={handleDelete}
                        nutritionMode={nutritionMode}
                        setNutritionMode={setNutritionMode}
                    />)}

            <div className="modal-button-container">
                <button onClick={() => dispatch({ type: 'CLOSE_RECIPE_VIEW' })}>DONE</button>
                <button onClick={() => setEditMode(true)}>EDIT</button>
            </div>
        </div>
    )
}