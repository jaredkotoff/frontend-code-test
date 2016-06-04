import React, { Component } from 'react';

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
    console.log(this.state.data[0].name);
    return this.state.data.map((recipe) => <h2>{recipe.name}</h2>);
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
