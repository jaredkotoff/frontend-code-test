import React, { Component, PropTypes } from 'react';

// Renders a button that toggles a bot that allows a user to add recipes to the list
class AddRecipe extends Component {
  static propTypes = {
    recipes: PropTypes.array.isRequired,
    resetApp: PropTypes.func.isRequired,
    updateApp: PropTypes.func.isRequired,
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

  // Takes in a string and returns a Title Case String
  titleName(name) {
    return name.trim().replace(/\b\w+/g, (s) =>
      s.charAt(0).toUpperCase() + s.substr(1).toLowerCase()
    );
  }

  // Adds the new recipe to the app
  handleSubmit = (e) => {
    // Stops the GET request
    e.preventDefault();
    const { updateApp } = this.props;
    const { name, type, cookTime, ingredients } = this.state;
    // Break up the string of ingredients by commas
    const ingredientsArray = ingredients.split(',').map((ingredient) =>
      // Fix casing on the ingredient name
      this.titleName(ingredient)
    ).filter((ingredient) => {
      // Make sure the string isn't an empty string
      if (ingredient.length >= 1) {
        return true;
      }
      return false;
    });

    // New recipe object
    const newRecipe = {
      name: this.titleName(name),
      type: this.titleName(type),
      cook_time: Number(cookTime),
      ingredients: ingredientsArray,
      isUserGenerated: true,
    };
    let userRecipes = [];
    // Get current list of recipes if it exists
    if (localStorage.userRecipes) {
      userRecipes = JSON.parse(localStorage.userRecipes);
    }
    // Add the new recipe to the list
    userRecipes.push(newRecipe);
    // Sync the localStorage to the new updated list
    localStorage.userRecipes = JSON.stringify(userRecipes);
    // Clears the input form
    this.resetState();
    // Forces the app to update
    updateApp();
  }

  // Sets the form's state back to default
  resetState = () => {
    this.setState({
      active: false,
      name: '',
      type: '',
      cookTime: '',
      ingredients: '',
    });
  }

  // A simple button to toggle the active state which determins if it should display the input box
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

  // Renders a div that has the form for a user to add a new recipe
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
              id="name"
              placeholder="SpaPeggy and Meatballs"
              value={name}
              onChange={this.handleNameChange}
              required
            /><br />
            <label htmlFor="type">Recipe Type:</label>
            <input
              type="text"
              name="type"
              id="type"
              placeholder="Texas-Italian"
              value={type}
              onChange={this.handleTypeChange}
              required
            /><br />
            <label htmlFor="cook_time">Cook Time:</label>
            <input
              type="number"
              name="cook_time"
              id="cook_time"
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
              id="ingredients"
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

  // Renders a button that calls a function that clears the users localStorage (see main app.jsx)
  renderResetButton() {
    return (
      <button
        type="button"
        title="Resets all user generated content"
        className="reset-app-button"
        onClick={this.props.resetApp}
      >
        Reset App
      </button>
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
        {content}{this.renderResetButton()}
      </div>
    );
  }
}

export default AddRecipe;
