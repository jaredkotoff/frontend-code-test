import React, { Component } from 'react';
import RecipeList from './recipe-list';
import IngredientList from './ingredient-list';

require('./app.scss');
const recipeData = require('../data/recipes.json');

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: '',
    };
  }

  componentWillMount() {
    const recipeSortedData = recipeData.sort(this.compare);
    this.setState({
      data: recipeSortedData,
    });
  }

  compare(a, b) {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  render() {
    const { data } = this.state;
    return (
      <div className="container">
        <div className="content">
          <h1>Reci-Pie App</h1>
          <div className="flexbox">
            <IngredientList recipes={data} />
            <RecipeList recipes={data} />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
