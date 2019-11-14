import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';

import ListRecipeCardMidi from "./card/ListRecipeCardMidi";

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

  renderRecipesCompact(recipeList, noEdit) {
    const recipes = recipeList.sort((a,b) => { return a.name > b.name ? 1 : -1; }).map((recipe) => {
      return <ListRecipeCardMidi
        key={recipe.id}
        item={recipe}
        noEdit={noEdit}
        editRecipe={this.props.handleEditRecipe}
        deleteRecipe={this.props.handleDeleteRecipe}
        addToSchedule={this.props.handleAddToSchedule}
        handleAvatarClick={this.props.handleAvatarClick}
      />;
    });
    if (recipes.length) {
      return recipes;
    }
    return ('');
  }

  render() {

    const {classes, title, recipeList, noEdit} = this.props;

    return (
      <div className={classes.container}>
        <div><h3 style={{padding: 15}}>{title ? title : 'moje przepisy'}</h3></div>
        {this.renderRecipesCompact(recipeList, noEdit)}
      </div>
    );
  }
}

export default withStyles(styles)(RecipeLibrary);