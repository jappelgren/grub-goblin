import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DayItem from "../DayItem/DayItem";
import RecipeItem from "../RecipeItem/RecipeItem.js";


export default function Spike() {
    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipeReducer);
    const [scroll, setScroll] = useState('');

    const week = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

    //Generates empty divs to fill the recipe container on dashboard.  The empty divs make everything spaced correctly even
    // when there are less than 6 recipes.
    const emptyBoxesNumber = 6 - recipes.length;
    const emptyBoxes = [];


    //controls whether the recipe container scrolls.  When there are empty boxes it doesn't
    //when there more than 6 recipes it does.
    const scrollStatus = () => {
        if (recipes.length > 6) {
            setScroll('recipe-container-scroll');
        } else {
            setScroll('recipe-container-hidden');
        }
    };


    for (let i = 0; i < emptyBoxesNumber; i++) {
        emptyBoxes.push(<div key={i} className="empty-box"></div>);
    }

    //checks if there is an odd amount of recipes and makes an extra div so the last recipe stays justified to the left of 
    //the container.
    if (emptyBoxesNumber < 0 && recipes.length % 2 === 1) {
        emptyBoxes.push(<div key="one box" className="empty-box"></div>);
    }
    //end div generation code.



    useEffect(() => {
        dispatch({ type: 'FETCH_RECIPES' });
        dispatch({ type: 'FETCH_WEEK' });
    }, []);

    useEffect(() => {
        scrollStatus();

    }, [recipes.length]);

    return (
        <div className="dashboard-container" style={{ display: 'flex' }}>


            {/* This map iterates over the days of the week and sets them next to the recipe container */}
            {week.map((day, index) => (
                // Passing the recipes, day of the week and index of the day of the week
                <DayItem recipes={recipes} day={day} index={index} key={index} />
            ))}

            <div className="recipe-container-container" >
                <div className="recipe-container-banner">
                    <h3>RECIPES</h3>
                </div>
                <div className={`recipe-container ${scroll}`}>
                    {/* This map iterates over the recipes and puts them into a container */}
                    {recipes?.map((recipe, index) => (
                        // Passing recipe from recipes, index of the recipe
                        <RecipeItem assigned={'recipe-card'} recipe={recipe} index={index} key={recipe.id} style={{ display: 'flex', flexDirection: 'column' }} />
                    ))}
                    {emptyBoxes}
                </div>
            </div>


        </div >
    );
}