import { useState } from 'react';
import Modal from 'react-modal'
import NewRecipeForm from '../NewRecipeForm/NewRecipeForm.js'

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
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    }

    const afterOpenModal = () => {

    }

    const closeModal = () => {
        setModalIsOpen(false)
    }
    return (
        <div>
            <button onClick={openModal}>recipe entry</button>
            <Modal
                ariaHideApp={false}
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="New Recipe"
            >
                <NewRecipeForm closeModal={closeModal} />
            </Modal>
        </div>
    )
}