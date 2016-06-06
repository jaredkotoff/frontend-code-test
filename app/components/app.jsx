import React, { Component } from 'react';
import RecipeList from './recipe-list';
import IngredientList from './ingredient-list';

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
      recipes: recipeData.sort(this.compare),
    };
  }

  componentWillMount() {
    const recipes = recipeData.sort(this.compare);
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
    let checked = [];
    if (localStorage.checked) {
      checked = JSON.parse(localStorage.checked);
    }
    const filteredRecipes = this.filterRecipes(checked);
    this.setState({
      ingredients: sortedIngredients,
      recipes,
      filteredRecipes,
      checked,
    });
  }

  filterRecipes = (checked) => {
    const { recipes } = this.state;

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
    const { checked } = this.state;
    const updatedChecked = checked;
    console.log(updatedChecked);
    if (includes(checked, name)) {
      pull(updatedChecked, name);
    } else {
      updatedChecked.push(name);
    }
    localStorage.checked = JSON.stringify(updatedChecked);
    this.setState({
      checked: updatedChecked,
      filteredRecipes: this.filterRecipes(updatedChecked),
    });
  }

  compare(a, b) {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  render() {
    const { ingredients, filteredRecipes, checked } = this.state;
    return (
      <div className="container">
        <div className="content">
          <h1>Reci-Pie</h1>
          <div className="flexbox">
            <IngredientList
              ingredients={ingredients}
              updateIngredients={this.updateIngredients}
            />
            <RecipeList
              recipes={filteredRecipes}
              checkedIngredients={checked}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
