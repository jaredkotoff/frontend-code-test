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
      <li>
        <input type="checkbox" name={ingredient.name} value={ingredient.name} />
        {ingredient.name} <small>({ingredient.count})</small>
      </li>
    );
  }
}

export default IngredientListItem;
