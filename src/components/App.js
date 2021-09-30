import React , {useState, useEffect}from 'react';
import RecipeList from './RecipeList';
import '../css/app.css';

export const RecipeContext = React.createContext();

const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes'

function App() {

  const recipeContext = {
    // Since the name is the same (Key:Value) parseInt, no need to do like this
    // handleRecipeAdd: handleRecipeAdd
    handleRecipeAdd,
    handleRecipeDelete
  }

  // Default value
  const [recipes, setRecipes] = useState(sampleRecipes)

  // Read from local stroage and then convert string to object 
  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (recipeJSON != null) setRecipes(JSON.parse(recipeJSON))
  }, [])

  // Save values in local storage so as after each update inside recipes are saved
  // NOTE: To convert object to string so as to be saved in local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])
  function handleRecipeAdd (){
    const newRecipe =  {
      id: Date.now().toString(),
      name: 'New',
      servings: 1,
      cookTime: '1:00',
      instructions: 'Instr',
      ingredients: [
        { id: Date.now().toString(), name: 'Name', amount : '1 Tbs'}
      ]
    }
    setRecipes([...recipes, newRecipe])
  }

  function handleRecipeDelete(id){
    // Give all recipes but which is not this id and then set it as current recipe
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }
  return (
<RecipeContext.Provider value={recipeContext} >
  <RecipeList recipes = {recipes} />
</RecipeContext.Provider>
  );


}



const sampleRecipes = [
  {
    id: 1,
    name: 'Plain Chicken',
    serving: 3,
    cookTime: '1:45',
    instructions: '1. Put salt on Chicken \n 2. Put chicken in oven \n3. Eat chicken',
    ingredients: [
      {
        id: 1,
        name : 'Chicken', 
        amount: '2 Pounds'
      },
      {
        id: 2,
        name : 'Salt', 
        amount: '2 Tbs'
      }
    ]
  },
  {
    id: 2,
    name: 'Plain Fish',
    serving: 2,
    cookTime: '1:45',
    instructions: '1. Put salt on Fish \n 2. Put fish in oven \n3. Eat fish',
    ingredients: [
      {
        id: 1,
        name : 'Fish', 
        amount: '1 Pounds'
      },
      {
        id: 2,
        name : 'Salt', 
        amount: '2 Tbs'
      }
    ]
  
  }
]


export default App;