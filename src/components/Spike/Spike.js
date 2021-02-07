import { useState } from "react"
import { useSelector } from "react-redux"
import MealItem from "../MealItem/MealItem.js"
import RecipeItem from "../RecipeItem/RecipeItem.js"
import DayItem from "../DayItem/DayItem"

export default function Spike() {

    //This data will come from database
    const recipes = [
        { id: 1, title: 'Soondubu', calories: 200, carbs: 40 },
        { id: 2, title: 'Big Pork Friday', calories: 250, carbs: 20 },
        { id: 3, title: 'New York Strip', calories: 500, carbs: 1 },
        { id: 4, title: 'Donkey Burger', calories: 343, carbs: 89 }
    ]
    //This data will come from database
    const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']



    return (
        <div style={{ display: 'flex' }}>
            <div
                style={{
                    border: '2px solid black',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                {/* This map iterates over the recipes and puts them into a container */}
                {recipes?.map((recipe, index) => (
                    // Passing recipe from recipes, index of the recipe
                    <RecipeItem recipe={recipe} index={index} key={recipe.id} style={{ display: 'flex', flexDirection: 'column' }} />
                ))}
            </div>
            {/* This map iterates over the days of the week and sets them next to the recipe container */}
            {week.map((day, index) => (
                // Passing the recipes, day of the week and index of the day of the week
                <DayItem recipes={recipes} day={day} index={index} />
            ))}

        </div >
    )
}