import { useState } from "react"
import { useSelector } from "react-redux"
import MealItem from "../MealItem/MealItem.js"
import RecipeItem from "../RecipeItem/RecipeItem.js"

export default function Spike() {
    const [recipes, setRecipes] = useState([
        { id: 1, title: 'Soondubu', calories: 200, carbs: 40 },
        { id: 2, title: 'Big Pork Friday', calories: 250, carbs: 20 },
        { id: 3, title: 'New York Strip', calories: 500, carbs: 1 }
    ])
    const dailyTotalCal = useSelector(state => state.dailyNutritionCalc)
    const [meals, setMeals] = useState([{ id: 1, meal: 'Breakfast' }, { id: 2, meal: 'Lunch' }, { id: 3, meal: 'Dinner' }])

    const nutritionTotal = [
        dailyTotalCal.reduce((x, y) => ({ calories: x.calories + y.calories })),
        dailyTotalCal.reduce((x, y) => ({ carbs: x.carbs + y.carbs }))
    ]


    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div

                style={{
                    border: '2px solid black',
                    width: '300px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                {recipes?.map((recipe, index) => (
                    <RecipeItem recipe={recipe} index={index} key={recipe.id} />
                ))}
            </div>
            {meals?.map((meal) => (
                < MealItem meal={meal} recipes={recipes} />
            ))}

            <div>
                Daily Total Calories: {nutritionTotal[0].calories}
                <br />
                Daily Total Carbs: {nutritionTotal[1].carbs}
            </div>
        </div >
    )
}