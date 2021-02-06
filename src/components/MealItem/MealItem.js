import { useState } from "react"
import { useDrop } from "react-dnd"
import { useSelector, useDispatch } from "react-redux"
import RecipeItem from '../RecipeItem/RecipeItem.js'

export default function MealItem({ meal, recipes }) {

    const dispatch = useDispatch()
    const selectedIndex = useSelector(state => state.mondayBreakfast)
    const [mealRecipe, setMealRecipe] = useState([])

    console.log(`Hi austin, it's me, ${meal.meal}`, mealRecipe)



    const moveRecipe = (index) => {
        setMealRecipe([recipes[index]])
        dispatch({ type: 'UPDATE_NUTRITION', payload: [recipes[index], meal.id - 1] })
    }

    const [{ isOver }, drop] = useDrop({
        accept: 'recipe',
        drop: () => moveRecipe(selectedIndex),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    })

    const handleClick = () => {
        dispatch({ type: 'REMOVE_NUTRITION', payload: meal.id - 1 })
        setMealRecipe([])

    }

    return (
        <div
            className={meal.meal}
            ref={drop}
            style={{
                border: '2px solid black',
                width: '300px',
                height: '397px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
            <h1>{meal.meal}</h1>
            {mealRecipe.map((meal, index) => (
                <RecipeItem recipe={meal} key={index} />
            ))}
            {mealRecipe.length > 0 && <button onClick={handleClick}>Remove Recipe</button>}
        </div>
    )
}