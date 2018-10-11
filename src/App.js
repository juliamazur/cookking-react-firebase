import React, { Component } from "react";
import './App.css';

import {createMuiTheme} from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import Header from './components/Header';
import RecipeForm from './components/RecipeForm';
import RecipeList from "./components/RecipeList";
import Schedule from "./components/Schedule";
import ShoppingList from "./components/ShoppingList";
import {recipeRef} from "./config/firebase";


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#000',
        },
        secondary: {
            main: '#fce514',
        },
    },
});

class App extends Component {

  defaultState = {
    pickedRecipe: null,
    pickedRecipeId: null,
    edit: false,
    fork: false,
    recipeList: {},
    shoppingList: {},
  };

  state = this.defaultState;

  fetchRecipeList = () => {
        recipeRef.on("value", snapshot => {
          const recipeList = snapshot.val();
            this.setState({
                ...this.state,
                recipeList: recipeList,
            });
        });
    };

  editRecipe = id => {
    console.log('EDIT recipe App: ', id);
    const pickedRecipe = {...this.state.recipeList[id]};
    this.setState({
      ...this.state,
        pickedRecipeId: id,
        pickedRecipe: pickedRecipe,
        edit: true,
        fork: false,
     });
  };

  forkRecipe = id => {
    console.log('FORK recipe App: ', id);
      const pickedRecipe = {...this.state.recipeList[id]};
    this.setState({
      ...this.state,
      pickedRecipeId: id,
      pickedRecipe: pickedRecipe,
      edit: false,
      fork: true,
     });
  };


  clearForm = () => {
      // TODO blokuje odswiezenie listy przepisow :(
      // this.setState({
      //     ...this.state,
      //     pickedRecipeId: null,
      //     pickedRecipe: null,
      //     edit: false,
      //     fork: false,
      // });
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
            callbackClearForm={this.clearForm}
        />
        <RecipeList
            recipeList={this.state.recipeList}
            appEditCallback={this.editRecipe}
            appForkCallback={this.forkRecipe}
        />
        <Schedule />
        <ShoppingList
            shoppingList={this.state.shoppingList}
        />
       </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
