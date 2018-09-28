import React, { Component } from "react";

import Header from './components/Header';
import RecipeForm from './components/RecipeForm';
import RecipeList from "./components/RecipeList";
import Schedule from "./components/Schedule";

class App extends Component {

  state = {
    recipeId: null,
    editRecipe: false,
  };

  editRecipe = id => {
    console.log('EDIT recipe App: ', id);
    this.setState({
      recipeId: id,
      editRecipe: true,
     });
  };

  forkRecipe = id => {
    console.log('FORK recipe App: ', id);
    this.setState({
      recipeId: id,
      editRecipe: false,
     });
  };

  render() {
    return (
      <div className="App">
        <Header/>
        <RecipeForm id={this.state.recipeId} edit={this.state.editRecipe}/>
        <RecipeList appEditCallback={this.editRecipe} appForkCallback={this.forkRecipe}/>
        <Schedule/>
      </div>
    );
  }
}

export default App;
