import React, { Component } from "react";
import './App.css';

import {createMuiTheme} from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import Header from './components/Header';
import RecipeForm from './components/RecipeForm';
import RecipeList from "./components/RecipeList";
import ScheduleContainer from "./components/Schedule";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#000',
        },
        secondary: {
            main: '#24c628',
        },
    },
});

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
      <MuiThemeProvider theme={theme}>
        <Header/>
        <RecipeForm id={this.state.recipeId} edit={this.state.editRecipe}/>
        <RecipeList appEditCallback={this.editRecipe} appForkCallback={this.forkRecipe}/>
        <ScheduleContainer />
       </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
