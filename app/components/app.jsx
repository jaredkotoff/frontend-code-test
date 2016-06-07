import React, { Component } from 'react';
import RecipeList from './recipe-list';
import IngredientList from './ingredient-list';
import AddRecipe from './add-recipe';

import { includes, intersection, pull, uniq } from 'lodash';

require('./app.scss');
const recipeData = require('../data/recipes.json');

class App extends Component {
  constructor() {
    super();
    this.state = {
      checked: [],
      filteredRecipes: [],
      ingredients: [],
      recipes: [],
    };
  }

  componentWillMount() {
    this.loadApp();
  }

  loadApp = () => {
    let checked = [];
    // Get users filtered ingredient list form localStorage
    if (localStorage.checked) {
      checked = JSON.parse(localStorage.checked);
    }

    let userRecipes = [];
    // Get any recipes the user added from localStorage
    if (localStorage.userRecipes) {
      userRecipes = JSON.parse(localStorage.userRecipes);
    }

    // Combine the json data with the user's recipes and sort them alphabetically
    const recipes = recipeData.concat(userRecipes).sort(this.compare);
    // Get list of recipes that have any ingredients that are checked
    const filteredRecipes = this.filterRecipes(checked, recipes);
    // Generate a list of all possible ingredients
    const ingredients = this.generateIngredients(recipes);
    this.setState({
      checked,
      filteredRecipes,
      ingredients,
      recipes,
    });
  }

  // Takes in an array of recipie objects and returns an object of ingredients with some stats
  generateIngredients(recipes) {
    const ingredients = {};

    // Go through each recipe
    recipes.forEach((recipe) => {
      // Filter out duplicates of ingredients
      const uniqIngredients = uniq(recipe.ingredients);
      // Go through each ingredient
      uniqIngredients.forEach((ingredient) => {
        // Set default properties for first time ingredients
        let count = 0;
        let recipeNames = [];
        let recipeTypes = [];
        // See if the ingredient already exists in the object
        if (ingredients[ingredient]) {
          // Retrieve previous data for the ingredient
          count = ingredients[ingredient].count;
          recipeNames = ingredients[ingredient].recipeNames;
          recipeTypes = ingredients[ingredient].recipeTypes;
        }
        // Increase the count of how many recipes this ingredient appears in
        count += 1;
        // Add the recipes name to a list
        recipeNames.push(recipe.name);
        // Add the recipe type to a list
        recipeTypes.push(recipe.type);
        // Add or update the ingredient to the object
        ingredients[ingredient] = {
          name: ingredient,
          count,
          recipeNames,
          recipeTypes,
        };
      });
    });

    const sortedIngredients = {};
    // Sort the object alphabetically
    Object.keys(ingredients).sort().forEach((key) => {
      sortedIngredients[key] = ingredients[key];
    });

    return sortedIngredients;
  }

  // Takes in an array of ingredient names and an array of recipe objects and
  // returns an array of recipe objects that use any of the ingredients in the first array
  filterRecipes(checked, recipes) {
    // If no ingredients are checked show all recipes
    if (!checked.length) {
      return recipes;
    }

    let filteredRecipes = [];
    filteredRecipes = recipes.filter((recipe) => {
      // intersection is 0 if the recipe doesn't use at least one of the ingredients
      if (intersection(recipe.ingredients, checked).length) {
        return recipe;
      }
      return false;
    });
    return filteredRecipes;
  }

  // Gets recipes from JSON file and localStorage and updates the app's state
  fetchRecipes = () => {
    let checked = [];
    if (localStorage.checked) {
      checked = JSON.parse(localStorage.checked);
    }

    let userRecipes = [];
    if (localStorage.userRecipes) {
      userRecipes = JSON.parse(localStorage.userRecipes);
    }

    const allRecipes = recipeData.concat(userRecipes);
    const ingredients = this.generateIngredients(allRecipes);
    this.setState({
      checked,
      filteredRecipes: this.filterRecipes(checked, allRecipes),
      ingredients,
    });
  }

  // Takes in an ingredient and adds or removes it from the state and localStorage
  updateIngredients = (ingredient) => {
    const { checked, recipes } = this.state;
    if (includes(checked, ingredient)) {
      // If the checked list already has the ingredient then remove it
      pull(checked, ingredient);
    } else {
      // Add the ingredient to the list if its not there
      checked.push(ingredient);
    }
    // Sync the user's localStorage to the new list
    localStorage.checked = JSON.stringify(checked);
    // Update the state and refilter the recipes
    this.setState({
      checked,
      filteredRecipes: this.filterRecipes(checked, recipes),
    });
  }

  resetApp = () => {
    localStorage.clear();
    this.loadApp();
  }

  // Takes in two objects and compare's their name attirbute to sort them alphabetically
  compare(a, b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  }

  render() {
    const { ingredients, filteredRecipes, checked, recipes } = this.state;
    return (
      <div className="container">
        <div className="content">
          <h1>Reci-Pie</h1>
          <AddRecipe
            recipes={recipes}
            resetApp={this.resetApp}
          />
          <div className="flexbox">
            <IngredientList
              ingredients={ingredients}
              updateIngredients={this.updateIngredients}
              checkedIngredients={checked}
            />
            <RecipeList
              recipes={filteredRecipes}
              updateRecipes={this.fetchRecipes}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
