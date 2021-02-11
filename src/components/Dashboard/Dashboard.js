import { useState } from 'react';
import Modal from 'react-modal'
import NewRecipeForm from '../NewRecipeForm/NewRecipeForm.js'
import RecipeImportForm from '../RecipeImportForm/RecipeImportForm.js'

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.31)'
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

export default function Dashboard() {
    const [recipeModalIsOpen, setRecipeModalIsOpen] = useState(false);

    const openRecipeModal = () => {
        setRecipeModalIsOpen(true);
    }

    const afterRecipeOpenModal = () => {

    }

    const closeRecipeModal = () => {
        setRecipeModalIsOpen(false)
    }

    const [importModalIsOpen, setImportModalIsOpen] = useState(false);

    const openImportModal = () => {
        setImportModalIsOpen(true);
    }

    const afterImportOpenModal = () => {

    }

    const closeImportModal = () => {
        setImportModalIsOpen(false)
    }

    return (
        <div>
            <button onClick={openRecipeModal}>Recipe Entry</button>
            <button onClick={openImportModal}>Import Recipe</button>
            <Modal
                ariaHideApp={false}
                isOpen={recipeModalIsOpen}
                onAfterOpen={afterRecipeOpenModal}
                onRequestClose={closeRecipeModal}
                style={customStyles}
                contentLabel="New Recipe"
            >
                <NewRecipeForm closeModal={closeRecipeModal} />
            </Modal>

            <Modal
                ariaHideApp={false}
                isOpen={importModalIsOpen}
                onAfterOpen={afterImportOpenModal}
                onRequestClose={closeImportModal}
                style={customStyles}
                contentLabel="Import New Recipe"
            >
                <RecipeImportForm closeModal={closeImportModal}/>
            </Modal>

        </div>
    )
}