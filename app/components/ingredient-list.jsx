import React, { Component, PropTypes } from 'react';

import { includes } from 'lodash';

import IngredientListItem from './ingredient-list-item';

class IngredientList extends Component {
  static propTypes = {
    ingredients: PropTypes.object.isRequired,
    updateIngredients: PropTypes.func.isRequired,
    checkedIngredients: PropTypes.array.isRequired,
  }

  renderIngredients = () => {
    const { ingredients, updateIngredients, checkedIngredients } = this.props;
    return Object.keys(ingredients).map((ingredient) => {
      let checked = false;
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
