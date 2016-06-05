import React, { Component, PropTypes } from 'react';

class IngredientListItem extends Component {
  static propTypes = {
    ingredient: PropTypes.shape({
      name: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
      recipeNames: PropTypes.array.isRequired,
      recipeTypes: PropTypes.array.isRequired,
    }),
  }

  render() {
    const { ingredient } = this.props;

    return (
      <li>{ingredient.name} ({ingredient.count})</li>
    );
  }
}

export default IngredientListItem;
