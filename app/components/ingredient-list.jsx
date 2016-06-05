import React, { Component, PropTypes } from 'react';
import { uniq } from 'lodash';

import IngredientListItem from './ingredient-list-item';

class IngredientList extends Component {
  static propTypes = {
    recipes: PropTypes.array.isRequired,
  }

  constructor() {
    super();
    this.state = {
      ingredients: {},
    };
  }

  componentWillMount() {
    const { recipes } = this.props;
    const ingredients = {};

    recipes.forEach((recipe) => {
      const uniqIngredients = uniq(recipe.ingredients);
      uniqIngredients.forEach((ingredient) => {
        let count = 0;
        let recipeNames = [];
        let recipeTypes = [];
        if (ingredients[ingredient]) {
          count = ingredients[ingredient].count;
          recipeNames = ingredients[ingredient].recipeNames;
          recipeTypes = ingredients[ingredient].recipeTypes;
        }
        count += 1;
        recipeNames.push(recipe.name);
        recipeTypes.push(recipe.type);
        ingredients[ingredient] = {
          name: ingredient,
          count,
          recipeNames,
          recipeTypes,
        };
      });
    });

    this.setState({ ingredients });
  }

  renderIngredients(ingredients) {
    return Object.keys(ingredients).map((ingredient) =>
      <IngredientListItem key={ingredient} ingredient={ingredients[ingredient]} />
    );
  }

  render() {
    const { ingredients } = this.state;
    return (
      <div className="ingredient-list-container">
        <div className="ingredient-list content-box">
          <h2 className="title">Ingredients</h2>
          <ul>
            {this.renderIngredients(ingredients)}
          </ul>
        </div>
      </div>
    );
  }
}

export default IngredientList;
