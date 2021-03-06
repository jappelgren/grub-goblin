import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DayItem from "../DayItem/DayItem";
import Nav from "../Nav/Nav";
import RecipeItem from "../RecipeItem/RecipeItem.js";


export default function Spike() {
    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipeReducer);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState(recipes);
    const [scroll, setScroll] = useState('');
    const [favFilter, setFavFilter] = useState(false);

    const week = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

    //Generates empty divs to fill the recipe container on dashboard.  The empty divs make everything spaced correctly even
    // when there are less than 6 recipes.
    const emptyBoxesNumber = 6 - recipes.length;
    const emptyBoxes = [];

    //search takes searchText from the nav component and uses a regular expression to see if it exists.
    //First checking the recipe's name and then each of it's ingredients.  Breaking if it finds one, which
    //makes it so doubles aren't displayed in the results.
    const search = () => {
        const re = new RegExp(`${searchText}`, 'gi');
        let resultArr = [];
        for (let recipe of recipes) {
            if (re.test(recipe?.recipe_name)) {
                resultArr.push(recipe);
            } else {
                for (let ingr of recipe.ingredient) {
                    if (re.test(ingr.ingredient)) {
                        resultArr.push(recipe);
                        break;
                    }
                }
            }
        }
        setSearchResults(resultArr);

    };


    //controls whether the recipe container scrolls.  When there are empty boxes it doesn't
    //when there more than 6 recipes it does.
    const scrollStatus = () => {
        if (recipes.length > 6) {
            setScroll('recipe-container-scroll');
        } else {
            setScroll('recipe-container-hidden');
        }
    };

    //decides how many empty divs should be appended to the recipe list if there are less than 6 recipes
    for (let i = 0; i < emptyBoxesNumber; i++) {
        emptyBoxes.push(<div key={i} className="empty-box"></div>);
    }

    //checks if there is an odd amount of recipes and makes an extra div so the last recipe stays justified to the left of 
    //the container.
    if (emptyBoxesNumber < 0 && recipes.length % 2 === 1) {
        emptyBoxes.push(<div key="one box" className="empty-box"></div>);
    }
    //end div generation code.

    let switchPosition;

    if (favFilter) {
        switchPosition = 'switchOn';
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_RECIPES' });
        dispatch({ type: 'FETCH_WEEK' });

    }, []);

    useEffect(() => {
        scrollStatus();
    }, [recipes.length]);

    useEffect(() => {
        setSearchResults(recipes);
    }, [recipes]);

    useEffect(() => {
        search();
    }, [searchText]);


    return (
        <>
            <Nav searchText={searchText} setSearchText={setSearchText} search={search} />

            <div className="dashboard-container" style={{ display: 'flex' }}>

                {/* This map iterates over the days of the week and sets them next to the recipe container */}
                {week.map((day, index) => (
                    // Passing the recipes, day of the week and index of the day of the week
                    <DayItem recipes={recipes} day={day} index={index} key={index} />
                ))}

                <div className="recipe-container-container" >
                    <div className="recipe-container-banner">
                        <h3>RECIPES</h3>
                        <div className="fav-filter-container">
                            <p className={`${switchPosition}-title`} onClick={() => setFavFilter(!favFilter)}>FAVORITES</p>
                            <div className={`switch-body ${switchPosition}-body`} onClick={() => setFavFilter(!favFilter)}>
                                <div className={`switch-circle ${switchPosition}`}></div>
                            </div>
                        </div>
                    </div>
                    <div className={`recipe-container ${scroll}`}>
                        {/* This map iterates over the recipes and puts them into a container */}
                        {searchResults?.map((recipe, index) => {
                            // Passing recipe from recipes, index of the recipe
                            if (favFilter) {
                                if (recipe.fav) {
                                    return (
                                        <RecipeItem
                                            assigned={'recipe-card'}
                                            recipe={recipe}
                                            index={index}
                                            key={recipe.id}
                                        />
                                    );
                                }
                            } else {
                                return (
                                    <RecipeItem
                                        assigned={'recipe-card'}
                                        recipe={recipe}
                                        index={index}
                                        key={recipe.id}
                                    />
                                );
                            }

                        })}
                        {emptyBoxes}
                    </div>
                </div>
            </div >
        </>
    );
}