import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { useSpring, animated } from 'react-spring';

const calc = (x, y) => [-(y - window.innerHeight / 2) / 30, (x - window.innerWidth / 2) / 30, 1.1];
const trans = (x, y, s) => `perspective(2000px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

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

    const [props, set] = useSpring(() => ({ xys: [2, 2, 1], config: { mass: 30, tension: 300, friction: 100 } }));


    return (

        <animated.div
            // ref={drag} initiates the div as draggable.
            ref={drag}
            onMouseDown={handleMouseDown}
            className={`${assigned}`}
            onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
            onMouseLeave={() => set({ xys: [1, 1, 1] })}
            style={{ transform: props.xys.interpolate(trans), backgroundImage: `url(${recipe?.photo})` }}
        >

            <div className="recipe-card-banner">
                    <h3 onClick={handleClick}>{recipe?.recipe_name}</h3>
            </div>
        </animated.div >
    );
}