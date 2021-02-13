import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import DayItem from "../DayItem/DayItem"
import RecipeItem from "../RecipeItem/RecipeItem.js"

export default function Spike() {
    const dispatch = useDispatch()
    const recipes = useSelector(state => state.recipeReducer)

    const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    useEffect(() => {
        dispatch({ type: 'FETCH_RECIPES' })
        dispatch({ type: 'FETCH_WEEK' })
    }, [])

    return (
        <div style={{ display: 'flex' }}>
            <div
                style={{
                    border: '2px solid black',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                {/* This map iterates over the recipes and puts them into a container */}
                {recipes?.map((recipe, index) => (
                    // Passing recipe from recipes, index of the recipe
                    <RecipeItem recipe={recipe} index={index} key={recipe.id} style={{ display: 'flex', flexDirection: 'column' }} />
                ))}
            </div>
            {/* This map iterates over the days of the week and sets them next to the recipe container */}
            {week.map((day, index) => (
                // Passing the recipes, day of the week and index of the day of the week
                <DayItem recipes={recipes} day={day} index={index} key={index} />
            ))}

        </div >
    )
}