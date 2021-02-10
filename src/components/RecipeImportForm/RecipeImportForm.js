import { useState } from "react"
import { useDispatch } from "react-redux";

export default function RecipeImportForm({ closeModal }) {
    const [importUrl, setImportUrl] = useState('');
    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({ type: 'IMPORT_RECIPE', payload: importUrl })
        closeModal();
    }

    return (
        <form onSubmit={handleSubmit}>

            <input value={importUrl} onChange={(event) => setImportUrl(event.target.value)} type="url" placeholder="Enter Recipe URL" />
            <button type="submit">Submit</button>
            <button onClick={closeModal} type="button">Cancel</button>
        </form>
    )
}