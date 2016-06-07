DataScience's Frontend Code Test
==================

This is an at-home exercise that DataScience uses as part of their standard interview process for frontend and full-stack developers.

## Instructions

1. run `npm install`
2. run `webpack -p` for production, `webpack` to build, or `webpack --watch` for active development
3. open `index.html`

## Requirements

Using provided JSON data representing a collection of meal recipes, create a micro frontend application that meets the following criteria:

* Display a list (or table) of recipes.
* Allow filtering of recipes by a single ingredient.
* Add checkboxes to allow selection of multiple recipes.
* Show an alphabetically ordered list of distinct ingredients for the selected recipes. This should update as recipes are selected / unselected.
* Persist the selections locally and regenerate the view on page refresh.
* In a README note any required setup to be able to run the app, such as modifying hosts file, etc.
