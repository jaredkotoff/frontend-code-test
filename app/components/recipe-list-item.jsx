import React, { Component, PropTypes } from 'react';
import { uniq } from 'lodash';

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
    const { name, type, cook_time: cookTime, ingredients } = this.props.recipe;

    return (
      <div className="recipe content-box">
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
