import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Spring } from "react-spring/renderprops";
import MealItem from '../MealItem/MealItem.js';

export default function DayItem({ day, index }) {
    const meals = [{ id: 1, meal: 'Breakfast' }, { id: 2, meal: 'Lunch' }, { id: 3, meal: 'Dinner' }];
    const dailyNutritionCalc = useSelector(state => state.dailyNutritionCalc);

    //nutritionTotals takes the nutrient to total as an argument and returns the daily total for that particular
    //nutrient
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

    //rerenders the page if the nutrient total changes, ie. recipes are added or deleted from a space on the 
    //calendar
    useEffect(() => {
    }, [dailyNutritionCalc]);


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
                <div className="nutrition-margin">
                    <div className="nutrient-value">
                        <p>Calories:</p>
                        {/* the Spring component (part of the react-spring library) here makes the numbers count up or down. */}
                        <Spring
                            from={{ number: 0 }}
                            to={{ number: nutritionTotals('cal') }}>
                            {props => <div>{props.number.toFixed(0)}</div>}
                        </Spring>
                    </div>
                    <div className="nutrient-value">
                        <p>Total Fat:</p>
                        <Spring
                            from={{ number: 0 }}
                            to={{ number: nutritionTotals('fat') }}>
                            {props => <div>{props.number.toFixed(0)}g</div>}
                        </Spring>
                    </div>
                    <div className="nutrient-value">
                        <p>   Saturated Fat:</p>
                        <Spring
                            from={{ number: 0 }}
                            to={{ number: nutritionTotals('sat_fat') }}>
                            {props => <div>{props.number.toFixed(0)}g</div>}
                        </Spring>
                    </div>
                    <div className="nutrient-value">
                        <p>   Trans Fat:</p>
                        <Spring
                            from={{ number: 0 }}
                            to={{ number: nutritionTotals('trans_fat') }}>
                            {props => <div>{props.number.toFixed(2)}g</div>}
                        </Spring>
                    </div>
                    <div className="nutrient-value">
                        <p>Cholestoral:</p>
                        <Spring
                            from={{ number: 0 }}
                            to={{ number: nutritionTotals('chol') }}>
                            {props => <div>{props.number.toFixed(0)}mg</div>}
                        </Spring>
                    </div>
                    <div className="nutrient-value">
                        <p>Sodium:</p>
                        <Spring
                            from={{ number: 0 }}
                            to={{ number: nutritionTotals('sodium') }}>
                            {props => <div>{props.number.toFixed(0)}mg</div>}
                        </Spring>
                    </div>
                    <div className="nutrient-value">
                        <p>Carbohydrates:</p>
                        <Spring
                            from={{ number: 0 }}
                            to={{ number: nutritionTotals('carb') }}>
                            {props => <div>{props.number.toFixed(0)}g</div>}
                        </Spring>
                    </div>
                    <div className="nutrient-value">
                        <p>   Fiber:</p>
                        <Spring
                            from={{ number: 0 }}
                            to={{ number: nutritionTotals('fiber') }}>
                            {props => <div>{props.number.toFixed(0)}g</div>}
                        </Spring>
                    </div>
                    <div className="nutrient-value">
                        <p>   Sugar:</p>
                        <Spring
                            from={{ number: 0 }}
                            to={{ number: nutritionTotals('sugar') }}>
                            {props => <div>{props.number.toFixed(0)}g</div>}
                        </Spring>
                    </div>
                    <div className="nutrient-value">
                        <p>Protein:</p>
                        <Spring
                            from={{ number: 0 }}
                            to={{ number: nutritionTotals('protein') }}>
                            {props => <div>{props.number.toFixed(0)}g</div>}
                        </Spring>
                    </div>
                </div>
            </div>
        </div>
    );
}