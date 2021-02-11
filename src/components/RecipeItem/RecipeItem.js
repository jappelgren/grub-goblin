import { useDrag } from "react-dnd"
import { useDispatch } from "react-redux"

export default function RecipeItem({ recipe, index }) {
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
        dispatch({ type: 'SET_MEAL_INDEX', payload: index })
    }

    const handleDelete = (id) => {
        console.log(id)
        dispatch({ type: 'DELETE_RECIPE', payload: id })
    }

    const handleClick = () => {
        console.log(recipe)
    }

    return (

        <div
            // ref={drag} initiates the div as draggable.
            ref={drag}
            style={{ border: '1px solid black', width: '200px', backgroundColor: 'white' }}
            onMouseDown={handleMouseDown}
            onClick={handleClick}
        >
            <h3>{recipe?.recipe_name}</h3>
            <p>Calories: {Math.round(recipe?.cal / recipe?.servings)}</p>
            <p>Carbs: {recipe?.carb}</p>

            <button onClick={() => handleDelete(recipe.recipes_id)}>Delete recipe</button>
        </div>
    )
}