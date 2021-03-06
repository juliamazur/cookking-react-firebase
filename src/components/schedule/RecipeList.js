import React, { Component } from "react";
// import { TransitionGroup } from "react-transition-group";

import RecipeCardMini from "./RecipeCardMini";
import Grid from '@material-ui/core/Grid';

class RecipeList extends Component {


  // TODO refactor
  getRecipes = () => {
    let recipeArray = [];
    const recipeList = this.props.recipeList;

    if(!recipeList) {
      return recipeArray;
    }

      for (var key in recipeList) {
          let item = recipeList[key];
        if (item.meals && item.meals.includes(this.props.mealId)) {
           item.id = key;
           recipeArray.push(item);
        }
      }

      return recipeArray;
  };

  render() {
    const items = this.getRecipes().map((value, key) =>
        <RecipeCardMini
            key={key}
            id={value.id}
            item={value}
            handleUseRecipe={this.props.handleUseRecipe}
        />
    );

    return (
      <div className="recipe-list-placeholder">
        <Grid container>
          {items}
        </Grid>
      </div>
    );
  }
}

export default RecipeList;
