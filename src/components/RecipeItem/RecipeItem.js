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
        dispatch({ type: 'SET_MEAL_INDEX', payload: recipe.id - 1 })
    }

    return (

        <div
            // ref={drag} initiates the div as draggable.
            ref={drag}
            style={{ border: '1px solid black', width: '200px', backgroundColor: 'white' }}
            onMouseDown={handleMouseDown}
        >
            <h3>{recipe?.title}</h3>
            <p>Calories: {recipe?.calories}</p>
            <p>Carbs: {recipe?.carbs}</p>
        </div>
    )
}