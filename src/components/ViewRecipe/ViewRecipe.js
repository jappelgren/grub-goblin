import { useSelector } from 'react-redux';
import IngredientItem from '../IngredientItem/IngredientItem.js';
import ModalHeader from '../ModalHeader/ModalHeader.js';

export default function ViewRecipe({ faved, handleFav, handleDelete, nutritionMode, setNutritionMode }) {
    const selectedRecipe = useSelector(state => state.viewRecipeReducer);
    return (
        <div>
            <ModalHeader faved={faved} handleFav={handleFav} handleDelete={handleDelete} />
            <main className="recipe-modal-main modal-fade">
                <div className="ingr-pic-meal-tag-container">
                    <div className="recipe-modal-ingredients">
                        <div className="chip">
                            INGREDIENTS
                        </div>
                        <ul>
                            {selectedRecipe.ingredient.map((ingredient, i) => (
                                <IngredientItem key={i} ingredient={ingredient} />
                            ))}
                        </ul>
                    </div>

                    <div className="recipe-modal-photo-nutrition">
                        <div className="photo-nutrition-container">
                            <img className="recipe-img" src={selectedRecipe.photo} alt="" />

                            <div onClick={() => setNutritionMode(!nutritionMode)} className="nutrition-banner">NUTRITION</div>
                        </div>

                        <div className="chip">
                            {(selectedRecipe.meal).toUpperCase()}
                        </div>
                    </div>
                </div>
                <div className="recipe-modal-directions">
                    <div className="chip" >DIRECTIONS</div>
                    <p>{selectedRecipe.directions}</p>
                </div>
            </main>
        </div>
    );
}


