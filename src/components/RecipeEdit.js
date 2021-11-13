import React, {useContext} from "react";
import RecipeIngredientEdit from "./RecipeIngredientEdit";
import { RecipeContext } from "./App";

export default function RecipeEdit( {recipe} ) {
    const {handleRecipeChange, handleRecipeSelect} = useContext(RecipeContext)

    function handleChange(changes) {
        //  {...recipe, ...changes} => Has all recipe except the one from changes
        handleRecipeChange(recipe.id, {...recipe, ...changes})
    }

    function handleIngredientChange(id, ingredient){
        const newIngredient = [...recipe.ingredients]
        const index = newIngredient.findIndex( i => i.id === id)
        newIngredient[index] = ingredient
        handleChange({ingredients: newIngredient})
    }


    function  handleRecipeAdd(){
        const newIngredient = {
            id: Date.now.toString(),
            name: '',
            amount: ''
        }
        handleChange({ingredients: [...recipe.ingredients, newIngredient]})
    }

    function handleIngredientDelete(id) {
        handleChange(
            {
                ingredients: recipe.ingredients.filter(i => i.id !== id)
            }
        )
    }
    return (
        <div className="recipe-edit">
            <div className="recipe-edit__remove-button-container">
                <button 
                className="btn recipe-edit__remove-button"
                onClick={() => handleRecipeSelect(undefined)}
                >&times;
                </button>
                <div className="recipe-edit__details-grid">
                    <label 
                    htmlFor="name" 
                    className="recipe-edit__label">
                        Name
                    </label>
                    <input 
                    type="text" 
                    name="name"
                    onChange={e => handleChange({ name: e.target.value})}
                    id="name" value={recipe.name} className="recipe-edit__input"/>
                    <label 
                    htmlFor="cookTime"  className="recipe-edit__label">Cook Time</label>
                    <input 
                    type="text" 
                    name="cookTime" 
                    onChange={e => handleChange({ cookTime: e.target.value})}
                    value={recipe.cookTime}
                    id="cookTime" className="recipe-edit__input" />
                    <label 
                    htmlFor="servings" 
                    className="recipe-edit__label">Servings</label>
                    <input 
                    type="number" min="1" 
                    name="servings" 
                    id="servings"  
                    onChange={e => handleChange({ serving: parseInt(e.target.value) || ''})}
                    value={recipe.serving}
                    className="recipe-edit__input"/>
                    <label 
                    htmlFor="instructions"
                    className="recipe-edit__label">Instructions</label>
                    <textarea 
                    name="instructions" 
                    id="instructions"
                    onChange={e => handleChange({ instructions: (e.target.value)})}
                    value={recipe.instructions}
                    className="recipe-edit__input"
                    /> 
                </div>
                <br />
                <label className="recipe-edit__label">Ingredients</label>
                <div className="recipe-edit__ingredient-grid">
                    <div>Name</div>
                    <div>Amount</div>
                    <div></div>
                    {recipe.ingredients.map(ingredient => (
                        <RecipeIngredientEdit 
                        key={ingredient.id} 
                        ingredient={ingredient}
                        handleIngredientChange={handleIngredientChange}
                        handleIngredientDelete={handleIngredientDelete}
                        />
                    ))}
                </div>
                <div className="recipe-edit__add-ingredient-btn-container">
                    <button 
                    className="btn btn--primary"
                    onClick={() => handleRecipeAdd()}
                    >Add ingredients</button>
                </div>
            </div>
        </div>
    )
}