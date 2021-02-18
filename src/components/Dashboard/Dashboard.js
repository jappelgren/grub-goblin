import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import NewRecipeForm from '../NewRecipeForm/NewRecipeForm.js';
import RecipeImportForm from '../RecipeImportForm/RecipeImportForm.js';
import Spinner from '../Spinner/Spinner.js';
import RecipeViewModal from '../ViewEditNutrition/ViewEditNutrition.js';

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


    return (
        <div>
            <button onClick={() => dispatch({ type: 'OPEN_RECIPE_ENTRY' })}>Recipe Entry</button>
            <button onClick={() => dispatch({ type: 'OPEN_RECIPE_IMPORT' })}>Import Recipe</button>
            <button onClick={() => dispatch({ type: 'CLEAR_WEEK' })}>Clear Week</button>
            <Modal
                ariaHideApp={false}
                isOpen={modalState.recipeEntry}
                // onAfterOpen={afterRecipeOpenModal}
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
                // onAfterOpen={afterImportOpenModal}
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
                // onAfterOpen={afterImportOpenModal}
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