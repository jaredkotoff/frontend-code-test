import React, { Component, PropTypes } from 'react';
import { uniq, pull } from 'lodash';

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

  deleteUserRecipe = () => {
    const { recipe: { name }, updateRecipes } = this.props;
    const userRecipes = JSON.parse(localStorage.userRecipes);
    const checked = JSON.parse(localStorage.checked);
    userRecipes.forEach((recipe) => {
      if (recipe.name === name) {
        pull(userRecipes, recipe);
        recipe.ingredients.forEach((ingredient) => {
          pull(checked, ingredient);
        });
      }
    });

    localStorage.userRecipes = JSON.stringify(userRecipes);
    localStorage.checked = JSON.stringify(checked);
    updateRecipes();
  }

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

  renderIngredient(ingredient) {
    return <li key={ingredient}>{ingredient}</li>;
  }

  renderIngredients(ingredients) {
    const sortedIngredients = uniq(ingredients).sort();
    const ingredientList = sortedIngredients.map((ingredient) => this.renderIngredient(ingredient));

    return (
      <ol>{ingredientList}</ol>
    );
  }

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
