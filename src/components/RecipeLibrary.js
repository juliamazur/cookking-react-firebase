import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';

import ListRecipeCardMidi from "./card/ListRecipeCardMidi";
import SearchInput from "./search/SearchInput";

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

  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      filteredList: props.recipeList
    };
  }

  renderRecipesCompact(recipeList, noEdit) {

    const filteredRecipes = this.state.searchValue ?
    recipeList
      .slice()
      .filter((item) => {return item.name.toLowerCase().includes(this.state.searchValue.toLowerCase())})
    : recipeList;  

    const recipes = filteredRecipes.sort((a,b) => { return a.name > b.name ? 1 : -1; }).map((recipe) => {
      return <ListRecipeCardMidi
        key={recipe.id}
        item={recipe}
        noEdit={noEdit}
        editRecipe={this.props.handleEditRecipe}
        deleteRecipe={this.props.handleDeleteRecipe}
        copyRecipe={this.props.handleCopyRecipe}
        addToSchedule={this.props.handleAddToSchedule}
        handleAvatarClick={this.props.handleAvatarClick}
      />;
    });
    if (recipes.length) {
      return recipes;
    }
    return ('');
  }

  handleSearchChange(event) {
    event.preventDefault();
    const searchValue = event.target.value;
    const filteredList = searchValue ?
      this.props.recipeList.slice().filter((item) => {return item.name.toLowerCase().includes(searchValue.toLowerCase())})
      : this.props.recipeList;

    this.setState({searchValue: searchValue, filteredList: filteredList});
  }

  render() {

    const {classes, title, recipeList, noEdit} = this.props;

    return (
      <div className={classes.container}>
        <div style={{width: '100%'}}><h3 style={{padding: 15}}>{title ? title : 'moje przepisy'}</h3></div>
        <SearchInput
          value={this.state.searchValue}
          handleChange={this.handleSearchChange.bind(this)}
        />
        {this.renderRecipesCompact(recipeList, noEdit)}
      </div>
    );
  }
}

export default withStyles(styles)(RecipeLibrary);