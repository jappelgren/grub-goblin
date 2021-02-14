import { useDrag } from "react-dnd"
import { useDispatch } from "react-redux"

export default function RecipeItem({ recipe, index, assigned }) {
    const dispatch = useDispatch()

    //Sets the recipe as a draggable item, gives it a type of recipe
    const [{ isDragging }, drag] = useDrag({
        item: { type: 'recipe' },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    })
    //handleMouseDown sends the index of the recipe selected in drag to a reducer
    const handleMouseDown = () => {
        dispatch({ type: 'SET_MEAL_ID', payload: recipe.recipes_id })
    }

    const handleClick = () => {
        dispatch({ type: 'VIEW_SELECTED_RECIPE', payload: recipe })
        dispatch({ type: 'OPEN_RECIPE_VIEW' })
    }


    return (

        <div
            // ref={drag} initiates the div as draggable.
            ref={drag}
            style={{ border: '1px solid black', backgroundColor: 'white' }}
            onMouseDown={handleMouseDown}
            className={`recipe-card ${assigned}`}
        >
            <h3 onClick={handleClick}>{recipe?.recipe_name}</h3>
            <p>Calories: {Math.round(recipe?.cal / recipe?.servings)}</p>
            <p>Carbs: {Math.round(recipe?.carb / recipe?.servings)}</p>
        </div >
    )
}