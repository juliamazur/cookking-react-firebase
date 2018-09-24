import React, { Component } from "react";

import Header from './components/Header';
import RecipeForm from './components/RecipeForm';
import RecipeList from "./components/RecipeList";

class App extends Component {

  state = { editRecipeId: null };

  editRecipe = id => {
    console.log('EDIT recipe App: ', id);
    this.setState({ editRecipeId: id });
  };

  render() {
    return (
      <div className="App">
        <Header/>
        <RecipeForm editRecipeId={this.state.editRecipeId}/>
        <RecipeList appCallback={this.editRecipe}/>
      </div>
    );
  }
}

export default App;
