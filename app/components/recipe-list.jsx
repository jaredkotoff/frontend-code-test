import React, { Component } from 'react';
import hash from 'object-hash';

const recipeData = require('../data/recipes.json');

class RecipeList extends Component {
  constructor() {
    super();
    this.state = {
      data: '',
    };
  }

  componentWillMount() {
    this.setState({
      data: recipeData,
    });
  }

  renderJson() {
    return this.state.data.map((recipe) =>
      <h2 key={hash(recipe)}>{recipe.name}</h2>
    );
  }

  render() {
    return (
      <div>
        {this.renderJson()}
      </div>
    );
  }

}

export default RecipeList;
