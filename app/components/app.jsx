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

    let checked = [];
    if (localStorage.checked) {
      checked = JSON.parse(localStorage.checked);
    }

    let userRecipes = [];
    if (localStorage.userRecipes) {
      userRecipes = JSON.parse(localStorage.userRecipes);
    }

    const allRecipes = recipeData.concat(userRecipes);

    this.state = {
      checked,
      filteredRecipes: [],
      ingredients: [],
      recipes: allRecipes.sort(this.compare),
    };
  }

  componentWillMount() {
    const { recipes, checked } = this.state;

    const filteredRecipes = this.filterRecipes(checked, recipes);
    const ingredients = this.generateIngredients(recipes);
    this.setState({
      checked,
      filteredRecipes,
      ingredients,
      recipes,
    });
  }

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

  generateIngredients(recipes) {
    const ingredients = {};

    recipes.forEach((recipe) => {
      const uniqIngredients = uniq(recipe.ingredients);
      uniqIngredients.forEach((ingredient) => {
        let count = 0;
        let recipeNames = [];
        let recipeTypes = [];
        if (ingredients[ingredient]) {
          count = ingredients[ingredient].count;
          recipeNames = ingredients[ingredient].recipeNames;
          recipeTypes = ingredients[ingredient].recipeTypes;
        }
        count += 1;
        recipeNames.push(recipe.name);
        recipeTypes.push(recipe.type);
        ingredients[ingredient] = {
          name: ingredient,
          count,
          recipeNames,
          recipeTypes,
        };
      });
    });

    const sortedIngredients = {};
    Object.keys(ingredients).sort().forEach((key) => {
      sortedIngredients[key] = ingredients[key];
    });

    return sortedIngredients;
  }

  filterRecipes(checked, recipes) {
    if (!checked.length) {
      return recipes;
    }

    let filteredRecipes = [];
    filteredRecipes = recipes.filter((recipe) => {
      if (intersection(recipe.ingredients, checked).length) {
        return recipe;
      }
      return null;
    });
    return filteredRecipes;
  }

  updateIngredients = (name) => {
    const { checked, recipes } = this.state;
    const updatedChecked = checked;
    if (includes(checked, name)) {
      pull(updatedChecked, name);
    } else {
      updatedChecked.push(name);
    }
    localStorage.checked = JSON.stringify(updatedChecked);
    this.setState({
      checked: updatedChecked,
      filteredRecipes: this.filterRecipes(updatedChecked, recipes),
    });
  }

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
