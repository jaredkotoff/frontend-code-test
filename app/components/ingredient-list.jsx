import React, { Component, PropTypes } from 'react';

import IngredientListItem from './ingredient-list-item';

class IngredientList extends Component {
  static propTypes = {
    ingredients: PropTypes.object.isRequired,
    updateIngredients: PropTypes.func.isRequired,
  }

  renderIngredients = () => {
    const { ingredients, updateIngredients } = this.props;
    return Object.keys(ingredients).map((ingredient) =>
      <IngredientListItem
        key={ingredient}
        ingredient={ingredients[ingredient]}
        updateCheck={updateIngredients}
      />
    );
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
