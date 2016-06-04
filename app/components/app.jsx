import React, { Component } from 'react';
import RecipeList from './recipe-list';
import IngredientList from './ingredient-list';

require('./app.scss');

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="content">
          <h1>Reci-Pie App</h1>
          <div className="flexbox">
            <IngredientList />
            <RecipeList />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
