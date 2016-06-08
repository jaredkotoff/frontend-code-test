import React, { Component, PropTypes } from 'react';
import RecipeListItem from './recipe-list-item';
import hash from 'object-hash';

// A list of recipes
class RecipeList extends Component {
  static propTypes = {
    recipes: PropTypes.array.isRequired,
    updateRecipes: PropTypes.func.isRequired,
  }

  // Renders a list of recipe elements
  renderRecipes(recipes) {
    return recipes.map((recipe) =>
      <RecipeListItem
        key={hash(recipe)}
        recipe={recipe}
        updateRecipes={this.props.updateRecipes}
      />
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
