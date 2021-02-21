import { useSelector } from "react-redux";
import ModalHeader from "../ModalHeader/ModalHeader";

export default function RecipeNutrition({ faved, handleFav, handleDelete }) {
    const viewRecipeReducer = useSelector(state => state.viewRecipeReducer);
    //This is all the nutrition information a recipe can have.  This is so div heavy because i wanted to style
    //the card as close to a real nutrition label as I could.
    return (
        <div>
            <ModalHeader faved={faved} handleFav={handleFav} handleDelete={handleDelete} />
            <div className="nutrition-view modal-fade">
                <div className="nutrition-container">
                    <p className="nutrition-h1">Nutrition Facts</p>
                    <div className="thin-line"></div>
                    <div className="nutrition-info-container">
                        <p>{viewRecipeReducer.servings} servings</p>
                        <div className="fat-line"></div>
                        <p className="per-serving">Amount per serving</p>
                        <div className="calorie-container">
                            <p className="calories">Calories</p>
                            <p className="calorie-number">{Math.round(viewRecipeReducer.cal / viewRecipeReducer.servings)}</p>
                        </div>
                        <div className="medium-line"></div>
                        <div className="twenty-five-pixels"></div>
                        <div className="bold-nutrient-container thin-line">
                            <p className="bold-nutrient">Total Fat</p> {' '} <p>{Math.round(viewRecipeReducer.sat_fat / viewRecipeReducer.servings)}g</p>
                        </div>
                        <p className="thin-line">{'    '}Saturated Fat {Math.round(viewRecipeReducer.sat_fat / viewRecipeReducer.servings)}g</p>
                        <p className="thin-line">{'    '}Trans Fat {((viewRecipeReducer.trans_fat / viewRecipeReducer.servings).toFixed(2)).replace(/^0+/, '')}g</p>
                        <div className="bold-nutrient-container thin-line">
                            <p className="bold-nutrient">Cholesteral</p> {' '} <p>{Math.round(viewRecipeReducer.chol / viewRecipeReducer.servings)}mg</p>
                        </div>
                        <div className="bold-nutrient-container thin-line">
                            <p className="bold-nutrient">Sodium</p> {' '} <p>{Math.round(viewRecipeReducer.sodium / viewRecipeReducer.servings)}mg</p>
                        </div>
                        <div className="bold-nutrient-container thin-line">
                            <p className="bold-nutrient">Total Carbohydrates</p> {' '} <p>{Math.round(viewRecipeReducer.carb / viewRecipeReducer.servings)}g</p>
                        </div>
                        <p className="thin-line">{'    '}Fiber {Math.round(viewRecipeReducer.fiber / viewRecipeReducer.servings)}g</p>
                        <p className="thin-line">{'    '}Sugar {Math.round(viewRecipeReducer.sugar / viewRecipeReducer.servings)}g</p>
                        <div className="bold-nutrient-container thin-line">
                            <p className="bold-nutrient">Protein</p> {' '} <p>{Math.round(viewRecipeReducer.protein / viewRecipeReducer.servings)}g</p>
                        </div>
                        <div className="fat-line"></div>
                        <div className="twenty-five-pixels"></div>
                        <p className="thin-line">Vitamin D {Math.round(viewRecipeReducer.vit_d / viewRecipeReducer.servings)}μg</p>
                        <p className="thin-line">Calcium {Math.round(viewRecipeReducer.calcium / viewRecipeReducer.servings)}mg</p>
                        <p className="thin-line">Iron {Math.round(viewRecipeReducer.iron / viewRecipeReducer.servings)}mg</p>
                        <p className="thin-line">Potassium {Math.round(viewRecipeReducer.potassium / viewRecipeReducer.servings)}mg</p>
                        <p className="thin-line">Magnesium {Math.round(viewRecipeReducer.magnesium / viewRecipeReducer.servings)}mg</p>
                        <p className="thin-line">Phosphorus {Math.round(viewRecipeReducer.phosphorus / viewRecipeReducer.servings)}mg</p>
                        <p className="thin-line">Vitamin A {Math.round(viewRecipeReducer.vit_a / viewRecipeReducer.servings)}μg</p>
                        <p className="thin-line">Vitamin B1 {Math.round(viewRecipeReducer.vit_b1 / viewRecipeReducer.servings)}mg</p>
                        <p className="thin-line">Vitamin B2 {Math.round(viewRecipeReducer.vit_b2 / viewRecipeReducer.servings)}mg</p>
                        <p className="thin-line">Vitamin B3 {Math.round(viewRecipeReducer.vit_b3 / viewRecipeReducer.servings)}mg</p>
                        <p className="thin-line">Vitamin B6 {Math.round(viewRecipeReducer.vit_b6 / viewRecipeReducer.servings)}mg</p>
                        <p className="thin-line">Vitamin B9 {Math.round(viewRecipeReducer.vit_b9 / viewRecipeReducer.servings)}μg</p>
                        <p className="thin-line">Vitamin B12 {Math.round(viewRecipeReducer.vit_b12 / viewRecipeReducer.servings)}μg</p>
                        <p className="thin-line">Vitamin C {Math.round(viewRecipeReducer.vit_c / viewRecipeReducer.servings)}mg</p>
                        <p className="thin-line">Vitamin E {Math.round(viewRecipeReducer.vit_e / viewRecipeReducer.servings)}mg</p>
                        <p className="thin-line">Vitamin K {Math.round(viewRecipeReducer.vit_k / viewRecipeReducer.servings)}μg</p>
                        <p className="thin-line">Zinc {Math.round(viewRecipeReducer.zinc / viewRecipeReducer.servings)}mg</p>

                    </div>
                </div>
            </div>

        </div>
    );
}
