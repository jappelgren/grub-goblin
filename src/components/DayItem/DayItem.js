import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import MealItem from '../MealItem/MealItem.js'

export default function DayItem({ day, index }) {
    const meals = [{ id: 1, meal: 'Breakfast' }, { id: 2, meal: 'Lunch' }, { id: 3, meal: 'Dinner' }]
    const weekReducer = useSelector(state => state.weekReducer)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch({ type: 'UPDATE_NUTRITION' })
    }, [])




    return (
        <div>
            <div style={{ border: '2px solid black', textAlign: 'center' }}>{day}</div>
            {meals?.map((meal, mealIndex) => (
                < MealItem meal={meal} dayIndex={index} mealIndex={mealIndex} key={meal.id} />
            ))}

            <div>
                Daily Total Calories: 0
                <br />
            Daily Total Carbs: 0
            </div>
        </div>
    )
}