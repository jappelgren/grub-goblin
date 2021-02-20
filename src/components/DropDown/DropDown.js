import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import NewRecipeForm from '../NewRecipeForm/NewRecipeForm.js';
import RecipeImportForm from '../RecipeImportForm/RecipeImportForm.js';
import RecipeViewModal from '../ViewEditNutrition/ViewEditNutrition.js';
import LogOutButton from '../LogOutButton/LogOutButton.jsx';
import { useState } from 'react';

//customStyles is the style for all modals used throughout the app, except the actual dropdown,
//which is styled in the App.css file.
const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '20px',
        margin: '0',
        padding: '0',
        border: 'none'
    }
};


export default function Dashboard() {
    const dispatch = useDispatch();
    const modalState = useSelector(state => state?.modalReducer);
    const [menuOpen, setMenuOpen] = useState(false);

    //changes the class for the dropdown menu. Hiding it or revealing it.
    const handleMenuClick = () => {
        if (menuOpen) {
            return 'menu-open';
        } else {
            return 'menu-closed';
        }
    };


    return (
        <div>
            <img onClick={() => setMenuOpen(!menuOpen)} className="hamburger" src="images/iconmonstr-menu-5.svg" alt="A green circular menu button" />
            <div className={handleMenuClick()} onClick={() => setMenuOpen(!menuOpen)}>

                <div>
                    {/* clicking on any button dispatches to a modal reducer which tells the app which modal to open or close */}
                    <button onClick={() => dispatch({ type: 'OPEN_RECIPE_ENTRY' })}> <img src="images/iconmonstr-plus-5.svg" alt="" /> <p>Recipe Entry</p></button>
                    <button onClick={() => dispatch({ type: 'OPEN_RECIPE_IMPORT' })}> <img src="images/iconmonstr-plus-5.svg" alt="" /> <p>Import Recipe</p></button>
                    <button onClick={() => dispatch({ type: 'CLEAR_WEEK' })}> <img src="images/iconmonstr-eraser-1.svg" alt="Green Eraser icon" /> <p>Clear Week</p></button>
                    <LogOutButton />
                </div>

            </div>
            <Modal
                ariaHideApp={false}
                isOpen={modalState.recipeEntry}
                onRequestClose={() => dispatch({ type: 'CLOSE_RECIPE_ENTRY' })}
                style={customStyles}
                contentLabel="New Recipe"
                closeTimeoutMS={300}
            >
                <NewRecipeForm />
            </Modal>

            <Modal
                ariaHideApp={false}
                isOpen={modalState.recipeImport}
                onRequestClose={() => dispatch({ type: 'CLOSE_RECIPE_IMPORT' })}
                style={customStyles}
                contentLabel="Import New Recipe"
                closeTimeoutMS={300}
            >
                <RecipeImportForm />
            </Modal>

            <Modal
                ariaHideApp={false}
                isOpen={modalState.recipeView}
                onRequestClose={() => dispatch({ type: 'CLOSE_RECIPE_VIEW' })}
                style={customStyles}
                contentLabel="Import New Recipe"
                closeTimeoutMS={300}
            >
                <RecipeViewModal />
            </Modal>
        </div>
    );
}