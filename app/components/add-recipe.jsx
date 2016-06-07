import React, { Component, PropTypes } from 'react';

import { capitalize } from 'lodash';

class AddRecipe extends Component {
  static propTypes = {
    recipes: PropTypes.array.isRequired,
  }

  constructor() {
    super();
    this.state = {
      active: false,
      name: '',
      type: '',
      cookTime: '',
      ingredients: '',
    };
  }

  handleClick = () => {
    this.setState({ active: true });
  }

  handleCancel = () => {
    this.setState({ active: false });
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  }

  handleTypeChange = (e) => {
    this.setState({ type: e.target.value });
  }

  handleCookTimeChange = (e) => {
    this.setState({ cookTime: e.target.value });
  }

  handleIngredientsChange = (e) => {
    this.setState({ ingredients: e.target.value });
  }

  handleSubmit = () => {
    const { name, type, cookTime, ingredients } = this.state;
    const ingredientsArray = ingredients.split(',').map((ingredient) =>
      capitalize(ingredient.trim())
    )
    .filter((ingredient) => {
      if (ingredient.length >= 1) {
        return true;
      }
      return false;
    });
    const newRecipe = {
      name,
      type,
      cook_time: Number(cookTime),
      ingredients: ingredientsArray,
      isUserGenerated: true,
    };
    let userRecipes = [];
    if (localStorage.userRecipes) {
      userRecipes = JSON.parse(localStorage.userRecipes);
    }
    userRecipes.push(newRecipe);
    localStorage.userRecipes = JSON.stringify(userRecipes);
  }

  renderAddButton() {
    return (
      <button
        type="button"
        onClick={this.handleClick}
        className="toggle-add-button"
      >
        Add Recipe
      </button>
    );
  }

  renderAddBox() {
    const { name, type, cookTime } = this.state;
    return (
      <div className="add-recipe-box content-box">
        <form onSubmit={this.handleSubmit}>
          <div className="left-form">
            <label htmlFor="name">Recipe Name:</label>
            <input
              type="text"
              name="name"
              placeholder="SpaPeggy and Meatballs"
              value={name}
              onChange={this.handleNameChange}
              required
            /><br />
            <label htmlFor="type">Recipe Type:</label>
            <input
              type="text"
              name="type"
              placeholder="Texas-Italian"
              value={type}
              onChange={this.handleTypeChange}
              required
            /><br />
            <label htmlFor="cook_time">Cook Time:</label>
            <input
              type="number"
              name="cook_time"
              value={cookTime}
              min={0}
              max={999}
              step={1}
              placeholder="43"
              onChange={this.handleCookTimeChange}
              required
            />
          </div>
          <div className="right-form">
            <label htmlFor="ingredients">Ingredients:</label>
            <textarea
              type="text"
              name="ingredients"
              placeholder="Enter ingredients separated by a comma: Spaghetti, Tomato Sauce"
              onChange={this.handleIngredientsChange}
              required
            />
          </div><br />
          <span className="buttons">
            <button
              className="add-button"
              type="submit"
            >
              Add
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={this.handleCancel}
            >
              Cancel
            </button>
          </span>
        </form>
      </div>
    );
  }

  render() {
    const { active } = this.state;
    let content = this.renderAddButton();
    if (active) {
      content = this.renderAddBox();
    }
    return (
      <div className="add-recipe-container">
        {content}
      </div>
    );
  }
}

export default AddRecipe;
