import { useSelector } from "react-redux"

export default function ModalHeader({ faved, handleFav, handleDelete }) {
    const selectedRecipe = useSelector(state => state.viewRecipeReducer)

    return (
        <header className="recipe-header">
            <h1>{(selectedRecipe.recipe_name).toUpperCase()}</h1>

            <nav className="fav-trash edit-fav-trash">
                {faved ?
                    <div className="icon-container" onClick={handleFav}>
                        <svg className="faved-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 
                                    6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/>
                        </svg>
                    </div> :
                    <div className="icon-container" onClick={handleFav}>
                        <svg className="unfaved-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M6.28 3c3.236.001 4.973 3.491 5.72 5.031.75-1.547 2.469-5.021 5.726-5.021
                                    2.058 0 4.274 1.309 4.274 4.182 0 3.442-4.744 7.851-10 13-5.258-5.151-10-9.559-10-13
                                    0-2.676 1.965-4.193 4.28-4.192zm.001-2c-3.183 0-6.281 2.187-6.281 6.192 0 4.661 5.57
                                    9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-4.011-3.097-6.182-6.274-6.182-2.204 0-4.446
                                    1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248z" />
                        </svg>
                    </div>
                }

                <div className="icon-container" onClick={handleDelete}>
                    <svg className="trash-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 
                                1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 
                                1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 
                                0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/>
                    </svg>
                </div>
            </nav>
        </header>
    )
}
