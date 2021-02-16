import { useState } from "react";
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import RecipeItem from '../RecipeItem/RecipeItem.js';

export default function MealItem({ meal, dayIndex, mealIndex }) {
    const dailyNutritionCalc = useSelector(state => state.dailyNutritionCalc);
    const weekReducer = useSelector(state => state.weekReducer);
    const recipeSelectedId = useSelector(state => state.recipeSelectedId);
    const dispatch = useDispatch();


    const moveRecipe = () => {
        if (dailyNutritionCalc[dayIndex][mealIndex].week_id) {
            dispatch({
                type: 'UPDATE_MEAL', payload: {
                    week_id: dailyNutritionCalc[dayIndex][mealIndex].week_id,
                    meal_index: mealIndex,
                    day_index: dayIndex,
                    recipe_id: recipeSelectedId
                }
            });

        } else {
            dispatch({ type: 'SET_MEAL', payload: { meal_index: mealIndex, day_index: dayIndex, recipe_id: recipeSelectedId } });


        }

    };

    //called when a recipe is dropped.  Calls moveRecipe above
    const [{ isOver }, drop] = useDrop({
        accept: 'recipe',
        drop: () => moveRecipe(),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    });

    const handleClick = (id) => {
        console.log('event', event);
        dispatch({ type: 'REMOVE_MEAL', payload: { meal_index: mealIndex, day_index: dayIndex, id: id } });

    };

    return (
        <div
            ref={drop}
            className={`meal-container ${meal.meal}`}
        >
            <div className="day-banner">
                <h4>{(meal.meal).toUpperCase()}</h4>
                {dailyNutritionCalc[dayIndex][mealIndex].week_id &&
                    <img
                        className="remove-meal-icon"
                        src="images/iconmonstr-minus-5-white.svg"
                        alt=""
                        onClick={() => handleClick(dailyNutritionCalc[dayIndex][mealIndex].week_id)} />}
            </div>

            {weekReducer.map((meal, index) => {
                // RecipeItem is passed meal (breakfast, lunch, dinner) as recipe, so recipeItem can be reused.
                if (dayIndex == meal.day_index && mealIndex == meal.meal_index) {
                    return (
                        <div className="assigned-container" key={index}>
                            <RecipeItem assigned={'assigned-recipe'} onMouseDown={handleClick} recipe={meal} />

                        </div>
                    );
                }
            })}
        </div>
    );
}
