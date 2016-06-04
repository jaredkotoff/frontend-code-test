import React, { Component } from 'react';
import RecipeList from './recipe-list.jsx';

require('./app.scss');

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="content">
          <h1>Reci-Pie App</h1>
          <RecipeList />
        </div>
      </div>
    );
  }
}
export default App;
