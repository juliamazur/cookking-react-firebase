import React, {Component} from "react";
import RecipeCardCompact from "./RecipeCardCompact";
import Grid from '@material-ui/core/Grid';

class RecipeLibrary extends Component {

  renderRecipesCompact() {
    const {recipeList} = this.props;
    const recipes = recipeList.map((recipe) => {
      return <RecipeCardCompact
        key={recipe.id}
        id={recipe.id}
        item={recipe}
        deleteRecipe={this.props.handleDeleteRecipe}
        editRecipe={this.props.handleEditRecipe}
        addToSchedule={this.props.handleAddToSchedule}
      />;
    });
    if (recipes.length) {
      return recipes;
    }
    return (
      <div>
        <h4>Nie masz jeszcze żadnych przepisów.</h4>
      </div>
    );
  }

  render() {
    return (

      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {this.renderRecipesCompact()}
      </Grid>

    );
  }
}

export default RecipeLibrary;