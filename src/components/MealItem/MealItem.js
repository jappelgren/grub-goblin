import { useState } from "react"
import { useDrop } from "react-dnd"
import { useSelector, useDispatch } from "react-redux"
import RecipeItem from '../RecipeItem/RecipeItem.js'

export default function MealItem({ meal, recipes, dayIndex }) {

    const dispatch = useDispatch()
    //The index of the recipe most recently dragged and dropped
    const selectedIndex = useSelector(state => state.recipeSelectedIndex)
    //mealRecipe stores the recipe object which was dropped on to the corresponding meal.
    const [mealRecipe, setMealRecipe] = useState([])

    //What happens when a recipe is dropped on a meal.  setMealRecipe is called and stores the dropped recipe,
    //a dispatch is made to a reducer which stores the daily total,  The array sent to the reducer is
    //the recipe at the index that matches the dropped recipe, meal.id signifies which meal was dropped onto
    //dayIndex is the index of the day that the meal resides in.
    const moveRecipe = (index) => {
        setMealRecipe([recipes[index]])
        dispatch({ type: 'UPDATE_NUTRITION', payload: [recipes[index], meal.id - 1, dayIndex] })
    }

    //called when a recipe is dropped.  Calls moveRecipe above
    const [{ isOver }, drop] = useDrop({
        accept: 'recipe',
        drop: () => moveRecipe(selectedIndex),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    })

    //Deleting the recipe resets setMealRecipe to an empty array, dispatch removes the recipe object from the reducer
    //that calculates daily nutrition values.
    const handleClick = () => {
        dispatch({ type: 'REMOVE_NUTRITION', payload: [meal.id - 1, dayIndex] })
        setMealRecipe([])

    }

    return (
        <div
            className={meal.meal}
            ref={drop}
            style={{
                border: '2px solid black',
                width: '225px',
                height: '225px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
            <h4>{meal.meal}</h4>
            {mealRecipe.map((meal, index) => (
        // RecipeItem is passed meal (breakfast, lunch, dinner) as recipe, so recipeItem can be reused.
                <RecipeItem onMouseDown={handleClick} recipe={meal} key={index} />
            ))}
            {mealRecipe.length > 0 && <button onClick={handleClick}>Remove Recipe</button>}
        </div>
    )
}
