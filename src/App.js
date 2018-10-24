import React, { Component } from "react";
import './App.css';

import {createMuiTheme} from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import Header from './components/Header';
import RecipeForm from './sites/RecipeForm';

import RecipeLibrary from "./components/RecipeLibrary";
import Schedule from "./sites/Schedule";
import ShoppingList from "./components/ShoppingList";

import * as backend from './backend/';
import * as functions from './functions/';


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#000',
        },
        secondary: {
            main: '#fce514',
        },
    },
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            'Montserrat',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
    },
});

class App extends Component {

  defaultState = {
    pickedRecipe: null,
    pickedRecipeId: null,
    edit: false,
    fork: false,
    recipeList: {},
    usedRecipes: [],
  };

  state = this.defaultState;

  fetchRecipeList = () => {
      console.log('FETCH recipe list');
      backend.fetchRecipeList().then((data) => {
        this.setState({ recipeList: data });
      });
    };

    usedRecipeListUpdate = usedRecipes => {
        console.log('USED RECIPES UPDATE');
        this.setState({ usedRecipes: usedRecipes });
    };

  editRecipe = id => {
    console.log('EDIT recipe App: ', id);
    this.setState( functions.editRecipe({...this.state.recipeList}, id) );
  };

  forkRecipe = id => {
    console.log('FORK recipe App: ', id);
    this.setState( functions.forkRecipe({...this.state.recipeList}, id) );
  };

  recipeFormAfterSubmit = () => {
      console.log('AFTER SUBMIT');
      this.setState( functions.clearRecipeForm() );
      this.fetchRecipeList();
  };

    componentDidMount() {
      this.fetchRecipeList();
  }

  render() {
    return (
      <div className="App">
      <MuiThemeProvider theme={theme}>
        <Header/>
        <RecipeForm
            id={this.state.pickedRecipeId}
            recipe={this.state.pickedRecipe}
            fork={this.state.fork}
            edit={this.state.edit}
            callbackAfterSubmit={this.recipeFormAfterSubmit}
        />
          <RecipeLibrary
              recipeList={this.state.recipeList}
              appEditCallback={this.editRecipe}
              appForkCallback={this.forkRecipe}
          />

        <Schedule
            recipeList={this.state.recipeList}
            usedRecipeListUpdate={this.usedRecipeListUpdate}
        />
        <ShoppingList
            usedRecipes={this.state.usedRecipes}
            recipeList={this.state.recipeList}
        />
       </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
