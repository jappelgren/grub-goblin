import { useDrag } from "react-dnd"
import { useDispatch } from "react-redux"

export default function RecipeItem({ recipe }) {
    const [{ isDragging }, drag] = useDrag({
        item: { type: 'recipe' },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    })

    const dispatch = useDispatch()

    const handleMouseDown = () => {
        dispatch({ type: 'SET_MON_BREAKFAST', payload: recipe.id - 1 })
    }

    return (

        <div
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