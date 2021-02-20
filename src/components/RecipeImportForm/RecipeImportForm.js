import { useState } from "react";
import { useDispatch } from "react-redux";

export default function RecipeImportForm() {
    const [importUrl, setImportUrl] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({ type: 'IMPORT_RECIPE', payload: importUrl });
        dispatch({ type: 'CLOSE_RECIPE_IMPORT' });
    };

    return (

        <div className="import-form">
            <form onSubmit={handleSubmit}>
                <div className="import-input-container edit-main">
                    <input className="" value={importUrl} onChange={(event) => setImportUrl(event.target.value)} type="url" placeholder="Enter Recipe URL" />
                </div>
                <div className="modal-button-container edit-buttons">
                    <button className="goblin-button" type="submit">Submit</button>
                    <button className="goblin-button" onClick={() => dispatch({ type: 'CLOSE_RECIPE_IMPORT' })} type="button">Cancel</button>
                </div>
            </form >
        </div>

    );
}