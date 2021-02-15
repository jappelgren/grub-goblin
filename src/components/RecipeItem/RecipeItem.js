import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { useSpring, animated } from 'react-spring';

const calc = (x, y) => [-(y - window.innerHeight / 2) / 70, (x - window.innerWidth / 2) / 70, 1.1];
const trans = (x, y, s) => `perspective(500px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

export default function RecipeItem({ recipe, index, assigned }) {
    const dispatch = useDispatch();

    //Sets the recipe as a draggable item, gives it a type of recipe
    const [{ isDragging }, drag] = useDrag({
        item: { type: 'recipe' },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    });
    //handleMouseDown sends the index of the recipe selected in drag to a reducer
    const handleMouseDown = () => {
        dispatch({ type: 'SET_MEAL_ID', payload: recipe.recipes_id });
    };

    const handleClick = () => {
        dispatch({ type: 'VIEW_SELECTED_RECIPE', payload: recipe });
        dispatch({ type: 'OPEN_RECIPE_VIEW' });
    };

    const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 2, tension: 400, friction: 20 } }));


    return (

        <animated.div
            // ref={drag} initiates the div as draggable.
            ref={drag}
            onMouseDown={handleMouseDown}
            className={`${assigned}`}
            onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
            onMouseLeave={() => set({ xys: [0, 0, 1] })}
            style={{ transform: props.xys.interpolate(trans), backgroundImage: `url(${recipe?.photo})` }}
            onClick={handleClick}
        >
            {recipe?.fav && <img className="card-fav" src="images/iconmonstr-favorite-3.svg" alt="" />}

            <div className="recipe-card-banner">
                <h3 onClick={handleClick}>{recipe?.recipe_name}</h3>
            </div>
        </animated.div >
    );
}