import React, { Component } from 'react';
import RecipeListItem from './recipe-list-item';
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
      <RecipeListItem key={hash(recipe)} recipe={recipe} />
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
