import { useSelector } from "react-redux"
import MealItem from '../MealItem/MealItem.js'

export default function DayItem({ day, index }) {
    const meals = [{ id: 1, meal: 'Breakfast' }, { id: 2, meal: 'Lunch' }, { id: 3, meal: 'Dinner' }]
    const dailyNutritionCalc = useSelector(state => state.dailyNutritionCalc)


    let nutritionTotals = (nutrient) => {
        let total = 0
        dailyNutritionCalc[index]?.map((recipe) => {
            if (recipe[nutrient]) {
                total += (Math.round(recipe[nutrient] / recipe.servings))
            } else {
                total += 0
            }
        })
        return total
    }



    return (
        <div className="day-container">
            <div className="day-labels" >{day}</div>
            {meals?.map((meal, mealIndex) => (
                < MealItem meal={meal} dayIndex={index} mealIndex={mealIndex} key={meal.id} />
            ))}

            <div>
                Daily Total Calories: {nutritionTotals('cal')}
                <br />
            Daily Total Carbs: {nutritionTotals('carb')}
            </div>
        </div>
    )
}