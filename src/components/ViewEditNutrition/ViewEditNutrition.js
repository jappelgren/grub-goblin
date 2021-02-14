import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import EditRecipe from "../EditRecipe/EditRecipe.js"
import RecipeNutrition from "../RecipeNutrition/RecipeNutrition.js"
import ViewRecipe from "../ViewRecipe/ViewRecipe.js"
import { useSpring, animated as a } from 'react-spring'

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
            {editMode ? <EditRecipe
                setEditMode={setEditMode}
                editMode={editMode}
                handleFav={handleFav}
                handleDelete={handleDelete}
                faved={faved}
            /> : (
                    nutritionMode ?
                        <RecipeNutrition
                            faved={faved}
                            handleFav={handleFav}
                            handleDelete={handleDelete}
                        /> :
                        <ViewRecipe
                            faved={faved}
                            setfaved={setfaved}
                            handleFav={handleFav}
                            handleDelete={handleDelete}
                            nutritionMode={nutritionMode}
                            setNutritionMode={setNutritionMode}
                        />)}

            <div className="modal-button-container">
                {nutritionMode ? <button className="goblin-button" onClick={() => setNutritionMode(!nutritionMode)}>BACK</button> :
                    (editMode ? <></> :
                        <div>
                            <button className="goblin-button" onClick={() => dispatch({ type: 'CLOSE_RECIPE_VIEW' })}>DONE</button>
                            <button className="goblin-button" onClick={() => setEditMode(!editMode)}>EDIT</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}