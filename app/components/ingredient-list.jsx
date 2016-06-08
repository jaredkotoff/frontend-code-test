import React, { Component, PropTypes } from 'react';
import IngredientListItem from './ingredient-list-item';

import { includes } from 'lodash';

// A list of ingredient items
class IngredientList extends Component {
  static propTypes = {
    ingredients: PropTypes.object.isRequired,
    updateIngredients: PropTypes.func.isRequired,
    checkedIngredients: PropTypes.array.isRequired,
  }

  // Renders a list of ingredient list elements
  renderIngredients = () => {
    const { ingredients, updateIngredients, checkedIngredients } = this.props;
    // Loops though all ingredients
    return Object.keys(ingredients).map((ingredient) => {
      let checked = false;
      // Checks if the current ingredient is in the list of checked ingredients to set the correct
      // state on render when reloading the app
      if (includes(checkedIngredients, ingredient)) checked = true;
      return (
        <IngredientListItem
          key={ingredient}
          ingredient={ingredients[ingredient]}
          updateCheck={updateIngredients}
          checked={checked}
        />
      );
    });
  }

  render() {
    return (
      <div className="ingredient-list-container">
        <div className="ingredient-list content-box">
          <h2 className="title">Ingredients</h2>
          <ul>
            {this.renderIngredients()}
          </ul>
        </div>
      </div>
    );
  }
}

export default IngredientList;
