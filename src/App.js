import React from 'react';
import RecipeList from './RecipeList';

function App() {
  return (
    <>
    <RecipeList recipes = {sampleRecipes}/>
    </>
  );
}

const sampleRecipes = [
  {
    id: 1,
    name: 'Plain Chicken',
    serving: 3,
    cookTime: '1:45',
    instructions: '1. Put salt on Chicken \n 2. Put chicken in oven \n3. Eat chicken'
  },
  {
    id: 2,
    name: 'Plain Fish',
    serving: 2,
    cookTime: '1:45',
    instructions: '1. Put salt on Fish \n 2. Put fish in oven \n3. Eat fish'
  }
]


export default App;