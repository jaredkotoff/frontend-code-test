import React, { Component, PropTypes } from 'react';

class IngredientListItem extends Component {
  static propTypes = {
    ingredient: PropTypes.shape({
      name: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
      recipeNames: PropTypes.array.isRequired,
      recipeTypes: PropTypes.array.isRequired,
    }),
    updateCheck: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,
  }

  handleChange = () => {
    const { updateCheck, ingredient: { name } } = this.props;
    updateCheck(name);
  }

  render() {
    const { ingredient, checked } = this.props;
    return (
      <li>
        <input
          type="checkbox"
          name={ingredient.name}
          id={ingredient.name}
          checked={checked}
          onChange={this.handleChange}
        />
        <label htmlFor={ingredient.name}>
          {ingredient.name} <small>({ingredient.count})</small>
        </label>
      </li>
    );
  }
}

export default IngredientListItem;
