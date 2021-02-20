export default function IngredientItem({ ingredient }) {
    //Does this need to be it's own component?  Probably not, but it is.
    return (
        <li>{ingredient.ingredient}</li>
    );
}