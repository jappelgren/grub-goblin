import { useSelector } from "react-redux"
import MealItem from '../MealItem/MealItem.js'

export default function DayItem({ recipes, day, index }) {
    const meals = [{ id: 1, meal: 'Breakfast' }, { id: 2, meal: 'Lunch' }, { id: 3, meal: 'Dinner' }]


    return (
        <div>
            <div style={{ border: '2px solid black', textAlign: 'center' }}>{day}</div>
            {meals?.map((meal, mealIndex) => (
                < MealItem meal={meal} recipes={recipes} dayIndex={index} mealIndex={mealIndex} key={meal.id} />
            ))}

            <div>
                Daily Total Calories: 0
                <br />
            Daily Total Carbs: 0
            </div>
        </div>
    )
}