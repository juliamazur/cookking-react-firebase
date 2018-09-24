import React, { Component } from "react";
import Header from './components/Header';
import RecipeForm from './components/RecipeForm';
import RecipeList from "./components/RecipeList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <RecipeForm/>
        <RecipeList/>
      </div>
    );
  }
}

export default App;
