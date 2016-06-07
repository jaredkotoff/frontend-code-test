import React, { Component, PropTypes } from 'react';

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
      ingredients: [],
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

  handleSubmit = () => {
    const { name, type, cookTime, ingredients } = this.state;
    const newRecipe = {
      name,
      type,
      cook_time: Number(cookTime),
      ingredients,
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
          <label htmlFor="name">Recipe Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleNameChange}
            required
          /><br />
          <label htmlFor="type">Recipe Type:</label>
          <input
            type="text"
            name="type"
            value={type}
            onChange={this.handleTypeChange}
            required
          /><br />
          <label htmlFor="cook_time">Cook Time:</label>
          <input
            type="number"
            name="cook_time"
            value={cookTime}
            onChange={this.handleCookTimeChange}
            required
          /><br />
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
              handleSubmit={this.handleCancel}
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
