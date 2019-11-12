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

  renderRecipesCompact() {
    const {recipeList} = this.props;
    const recipes = recipeList.sort((a,b) => { return a.name > b.name ? 1 : -1; }).map((recipe) => {
      return <ListRecipeCardMidi
        key={recipe.id}
        item={recipe}
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

    const {classes} = this.props;

    return (
      <div className={classes.container}>
        <div style={{width: '100%'}}><h3>moje przepisy</h3></div>
        {this.renderRecipesCompact()}
      </div>
    );
  }
}

export default withStyles(styles)(RecipeLibrary);