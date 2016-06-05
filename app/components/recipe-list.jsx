import React, { Component, PropTypes } from 'react';
import RecipeListItem from './recipe-list-item';
import hash from 'object-hash';

class RecipeList extends Component {
  static propTypes = {
    recipes: PropTypes.array.isRequired,
  }

  renderRecipes(recipes) {
    return recipes.map((recipe) =>
      <RecipeListItem key={hash(recipe)} recipe={recipe} />
    );
  }

  render() {
    const { recipes } = this.props;
    return (
      <div className="recipe-list">
        {this.renderRecipes(recipes)}
      </div>
    );
  }

}

export default RecipeList;
