import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';

import RecipeCardCompact from "./RecipeCardCompact";

const styles = theme => ({
  container: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      alignContent: 'space-evenly',
      margin: 30
    }
  }
});


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
    return ('');
  }

  render() {

    const {classes} = this.props;

    return (
      <div className={classes.container}>
        {this.renderRecipesCompact()}
      </div>
    );
  }
}

export default withStyles(styles)(RecipeLibrary);