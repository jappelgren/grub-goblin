import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalHeader from "../ModalHeader/ModalHeader";

export default function EditRecipe({ setEditMode, editMode, handleFav, handleDelete, faved }) {
    const selectedRecipe = useSelector(state => state.viewRecipeReducer);
    const [ingredientArr, setIngredientArr] = useState(selectedRecipe.ingredient);
    const [newRecipe, setNewRecipe] = useState(selectedRecipe);
    const [addBtnPosition, setAddBtnPosition] = useState(selectedRecipe.ingredient.length - 1);
    const dispatch = useDispatch();
    console.log(addBtnPosition);

    const handleChange = (event) => {
        if (event.target.name === 'servings') {
            setNewRecipe({ ...newRecipe, [event.target.name]: Number(event.target.value) });
        } else {
            setNewRecipe({ ...newRecipe, [event.target.name]: event.target.value });
        }
    };

    const handleIngredient = index => event => {
        let tempArr = [...ingredientArr];
        if (event.target.name === 'remove') {
            tempArr[index] = { ...tempArr[index], delete: true };
            setAddBtnPosition(addBtnPosition - 1);
        } else if (event.target.name === 'add') {
            tempArr.push({ id: null, quantity: null, measure: null, ingredient: '', delete: false, recipe_id: selectedRecipe.recipe_id });
            setAddBtnPosition(addBtnPosition + 1);
        } else if (event.target.name === 'ingredients') {
            tempArr[index] = { ...tempArr[index], ingredient: event.target.value, recipe_id: selectedRecipe.recipe_id };
        }

        setIngredientArr(tempArr);
        setNewRecipe({ ...newRecipe, ingredient: tempArr, update: true });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({ type: 'EDIT_RECIPE', payload: newRecipe });
        recipeCancel();
    };

    const recipeCancel = () => {
        dispatch({ type: 'CLOSE_RECIPE_VIEW' });
        // setNewRecipe({});
    };

    console.log(newRecipe);
    return (
        <div className="recipe-form">
            <ModalHeader faved={faved} handleFav={handleFav} handleDelete={handleDelete} />
            <form onSubmit={handleSubmit}>
                <input
                    required
                    name="recipe_name"
                    type="text"
                    onChange={handleChange}
                    value={newRecipe.recipe_name}
                    placeholder="Recipe Name" />
                {newRecipe.ingredient.map((ingr, i) => {
                    if (!ingr.delete)
                        return (

                            <div key={i}>
                                <input
                                    required
                                    type="text"
                                    name="ingredients"
                                    value={ingr.ingredient}
                                    onChange={handleIngredient(i)}
                                    placeholder="Ingredient"
                                />

                                <img
                                    name="remove"
                                    onClick={handleIngredient(i)}
                                    className="plus-minus-icon"
                                    src="images/iconmonstr-minus-5.svg"
                                    alt="A green circle with a white minus symbol in the center"
                                />

                            </div>
                        );
                })}
                <img name="add" onClick={handleIngredient()} className="plus-minus-icon" src="images/iconmonstr-plus-5.svg" alt="" />
                <input
                    name="photo"
                    value={newRecipe.photo}
                    onChange={handleChange}
                    type="text"
                    placeholder="Image URL" />
                <input
                    required
                    name="servings"
                    value={newRecipe.servings}
                    onChange={handleChange}
                    type="number"
                    placeholder="Servings" />
                <select
                    required
                    name="meal"
                    // value={newRecipe.meal}
                    onChange={handleChange}
                    defaultValue={newRecipe.meal}
                    id="meal">
                    <option disabled value="">Select Meal</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                </select>
                <textarea
                    required
                    onChange={handleChange}
                    value={newRecipe.directions}
                    name="directions"
                    id="directions"
                    cols="30"
                    rows="10"
                />
                <button className="goblin-button" type="button" onClick={() => setEditMode(!editMode)}>CANCEL</button>
                <button className="goblin-button" type="submit" >COMPLETE</button>

            </form>
        </div >
    );
}