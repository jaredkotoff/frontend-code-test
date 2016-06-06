import React, { Component, PropTypes } from 'react';

class IngredientListItem extends Component {
  static propTypes = {
    ingredient: PropTypes.shape({
      name: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
      recipeNames: PropTypes.array.isRequired,
      recipeTypes: PropTypes.array.isRequired,
    }),
    updateCheck: PropTypes.func.isRequired,
  }

  constructor() {
    super();
    this.state = {
      checked: false,
    };
  }

  handleChange = () => {
    const { updateCheck, ingredient: { name } } = this.props;
    this.setState({ checked: !this.state.checked });
    updateCheck(name);
  }

  render() {
    const { ingredient } = this.props;
    const { checked } = this.state;

    return (
      <li>
        <input
          type="checkbox"
          name={ingredient.name}
          value={checked}
          onChange={this.handleChange}
        />
        {ingredient.name} <small>({ingredient.count})</small>
      </li>
    );
  }
}

export default IngredientListItem;
