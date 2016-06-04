import React, { Component, PropTypes } from 'react';

class RecipeListItem extends Component {
  static propTypes = {
    recipe: PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      cook_time: PropTypes.number.isRequired,
      ingredients: PropTypes.array.isRequired,
    }),
  }

  renderIngredient(ingredient) {
    return `${ingredient}`;
  }

  renderIngredients(ingredients) {
    const ingredientList = ingredients.map((ingredient, i, arr) => {
      let str = this.renderIngredient(ingredient);
      if (i + 1 !== arr.length) str += ', ';
      return str;
    });

    return ingredientList;
  }

  render() {
    const { name, type, cook_time: cookTime, ingredients } = this.props.recipe;

    return (
      <div className="recipe">
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
