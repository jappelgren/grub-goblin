import { useSelector } from "react-redux"
import MealItem from '../MealItem/MealItem.js'

export default function DayItem({ recipes, index }) {
    const dailyTotalCal = useSelector(state => state.dailyNutritionCalc)
    const meals = [{ id: 1, meal: 'Breakfast' }, { id: 2, meal: 'Lunch' }, { id: 3, meal: 'Dinner' }]

    const nutritionTotal = [
        dailyTotalCal[index].reduce((x, y) => ({ calories: x.calories + y.calories })),
        dailyTotalCal[index].reduce((x, y) => ({ carbs: x.carbs + y.carbs }))
    ]

    return (
        <div>
            {meals?.map((meal) => (
                < MealItem meal={meal} recipes={recipes} dayIndex={index} />
            ))}

            <div>
                Daily Total Calories: {nutritionTotal[0].calories}
                <br />
            Daily Total Carbs: {nutritionTotal[1].carbs}
            </div>
        </div>
    )
}