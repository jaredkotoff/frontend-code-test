import React, { Component, PropTypes } from 'react';

// A single ingredient list item that includes a checkbox and the name of the ingredient
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

  // Handles the checking and unchecking of the checkbox
  handleChange = () => {
    const { updateCheck, ingredient: { name } } = this.props;
    // Passes the name of the ingredient back to the parent for processing
    updateCheck(name);
  }

  // Renders a checkbox with a label of the name of the ingredient
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
