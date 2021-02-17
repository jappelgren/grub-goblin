import { useSelector } from "react-redux";
import { Spring } from "react-spring/renderprops";
import MealItem from '../MealItem/MealItem.js';

export default function DayItem({ day, index }) {
    const meals = [{ id: 1, meal: 'Breakfast' }, { id: 2, meal: 'Lunch' }, { id: 3, meal: 'Dinner' }];
    const dailyNutritionCalc = useSelector(state => state.dailyNutritionCalc);


    let nutritionTotals = (nutrient) => {
        let total = 0;
        dailyNutritionCalc[index]?.map((recipe) => {
            if (recipe[nutrient]) {
                total += (Math.round(recipe[nutrient] / recipe.servings));
            } else {
                total += 0;
            }
        });
        return total;
    };



    return (
        <div className="day-container">
            <div className="day-labels" >{day}</div>
            {meals?.map((meal, mealIndex) => (
                < MealItem meal={meal} dayIndex={index} mealIndex={mealIndex} key={meal.id} />
            ))}

            <div className="daily-nutrition-container">
                <div className="daily-nutrition-banner">
                    <h3>{day} TOTALS</h3>
                </div>
                <div className="nutrient-value">
                    <p>Calories:</p>
                    <Spring
                        from={{ number: 0 }}
                        to={{ number: nutritionTotals('cal') }}>
                        {props => <div>{props.number.toFixed(0)}</div>}
                    </Spring>
                </div>
                <div className="nutrient-value">
                    <p>Carbs:</p>
                    <Spring
                        from={{ number: 0 }}
                        to={{ number: nutritionTotals('carb') }}>
                        {props => <div>{props.number.toFixed(0)}</div>}
                    </Spring>
                </div>
                <div className="nutrient-value">
                    <p>Sugar:</p>
                    <Spring
                        from={{ number: 0 }}
                        to={{ number: nutritionTotals('sugar') }}>
                        {props => <div>{props.number.toFixed(0)}</div>}
                    </Spring>
                </div>
                <div className="nutrient-value">
                    <p>Fiber:</p>
                    <Spring
                        from={{ number: 0 }}
                        to={{ number: nutritionTotals('fiber') }}>
                        {props => <div>{props.number.toFixed(0)}</div>}
                    </Spring>
                </div>
            </div>
        </div>
    );
}