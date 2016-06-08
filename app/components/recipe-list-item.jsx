import React, { Component, PropTypes } from 'react';
import { uniq, pull } from 'lodash';

// A single recipe element
class RecipeListItem extends Component {
  static propTypes = {
    recipe: PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      cook_time: PropTypes.number.isRequired,
      ingredients: PropTypes.array.isRequired,
      isUserGenerated: PropTypes.bool,
    }),
    updateRecipes: PropTypes.func.isRequired,
  }

  // Allows a user to remove a recipe after if it was user created
  deleteUserRecipe = () => {
    const { recipe: { name }, updateRecipes } = this.props;
    // gets a list of user created recipes from the localStorage
    const userRecipes = JSON.parse(localStorage.userRecipes);
    let checked = [];
    // Gets a list of checked ingredients from the localStorage
    if (localStorage.checked) {
      checked = JSON.parse(localStorage.checked);
    }
    // Remove the recipe and uncheck ingredients
    userRecipes.forEach((recipe) => {
      // Find the current recipe in the list of user recipes
      if (recipe.name === name) {
        // Remove the recipe from the list
        pull(userRecipes, recipe);
        // Remove uncheck all ingredients that are in the recipe
        recipe.ingredients.forEach((ingredient) => {
          pull(checked, ingredient);
        });
      }
    });

    // Sync back the localStorage data
    localStorage.userRecipes = JSON.stringify(userRecipes);
    localStorage.checked = JSON.stringify(checked);
    // Force the recipe data to update
    updateRecipes();
  }

  // Renders a delete button if the recipe is user generated
  renderDeleteButton(isUserGenerated) {
    if (!isUserGenerated) return null;
    return (
      <button
        type="button"
        className="delete-button"
        onClick={this.deleteUserRecipe}
        title="This is a user added recipe and can be deleted"
      >
        X
      </button>
    );
  }

  // Returns an ingredient li
  renderIngredient(ingredient) {
    return <li key={ingredient}>{ingredient}</li>;
  }

  // Renders a list of ingredients in the recipe
  renderIngredients(ingredients) {
    // Removes duplicates and alphabetically sorts the ingredients
    const sortedIngredients = uniq(ingredients).sort();
    // Gets all ingredients with html
    const ingredientList = sortedIngredients.map((ingredient) => this.renderIngredient(ingredient));

    return (
      <ol>{ingredientList}</ol>
    );
  }

  // Renders the recipe with info and the list of ingredients
  render() {
    const { name, type, cook_time: cookTime, ingredients, isUserGenerated } = this.props.recipe;

    return (
      <div className="recipe content-box">
        {this.renderDeleteButton(isUserGenerated)}
        <h2 className="recipe-name">{name}</h2>
        <span className="recipe-info">
          {type} - {cookTime} mins
        </span><br />
        <div className="recipe-ingredients">
          {this.renderIngredients(ingredients)}
        </div>
      </div>
    );
  }
}

export default RecipeListItem;
