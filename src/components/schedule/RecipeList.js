import React, { Component } from "react";
import RecipeCardMini from "../RecipeCardMini";
import Grid from '@material-ui/core/Grid';

class RecipeList extends Component {

  editRecipe = id => {
    console.log('EDIT recipe RecipeList: ', id);
    this.props.appEditCallback(id);
  };

  forkRecipe = id => {
    console.log('FORK recipe RecipeList: ', id);
    this.props.appForkCallback(id);
  };

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
    return (
      <div className="recipe-list-placeholder">
        <Grid container>
          {
              this.getRecipes().map((value, key) =>
                  <RecipeCardMini
                    key={key}
                    id={value.id}
                    item={value}
                    callbackEditRecipe={this.editRecipe}
                    callbackForkRecipe={this.forkRecipe}
                  />
              )
          }
        </Grid>
      </div>
    );
  }
}

export default RecipeList;
