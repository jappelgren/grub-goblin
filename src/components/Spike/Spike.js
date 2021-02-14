import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DayItem from "../DayItem/DayItem";
import RecipeItem from "../RecipeItem/RecipeItem.js";

export default function Spike() {
    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipeReducer);

    const week = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

    useEffect(() => {
        dispatch({ type: 'FETCH_RECIPES' });
        dispatch({ type: 'FETCH_WEEK' });
    }, []);

    return (
        <div style={{ display: 'flex' }}>

            {/* This map iterates over the days of the week and sets them next to the recipe container */}
            {week.map((day, index) => (
                // Passing the recipes, day of the week and index of the day of the week
                <DayItem recipes={recipes} day={day} index={index} key={index} />
            ))}
            <div>
                {/* This map iterates over the recipes and puts them into a container */}
                {recipes?.map((recipe, index) => (
                    // Passing recipe from recipes, index of the recipe
                    <RecipeItem assigned={''} recipe={recipe} index={index} key={recipe.id} style={{ display: 'flex', flexDirection: 'column' }} />
                ))}
            </div>

        </div >
    );
}