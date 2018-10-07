import React, { Component } from "react";
import './App.css';

import {createMuiTheme} from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import Header from './components/Header';
import RecipeForm from './components/RecipeForm';
import RecipeList from "./components/RecipeList";
import ScheduleContainer from "./components/Schedule";
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

  state = {
    recipeId: null,
    editRecipe: false,
    recipeList: {},
  };

  fetchRecipeList = () => {
        recipeRef.on("value", snapshot => {
          console.log('fetch recipe list:');
          console.log(snapshot.val());
          const recipeList = snapshot.val();
            this.setState({
                ...this.state,
                recipeList: recipeList,
            });
        });
    };

  editRecipe = id => {
    console.log('EDIT recipe App: ', id);
    this.setState({
      ...this.state,
      recipeId: id,
      editRecipe: true,
     });
  };

  forkRecipe = id => {
    console.log('FORK recipe App: ', id);
    this.setState({
      ...this.state,
      recipeId: id,
      editRecipe: false,
     });
  };

  componentDidMount() {
      this.fetchRecipeList();
  }

  render() {
    return (
      <div className="App">
      <MuiThemeProvider theme={theme}>
        <Header/>
        <RecipeForm id={this.state.recipeId} edit={this.state.editRecipe}/>
        <RecipeList recipeList={this.state.recipeList} appEditCallback={this.editRecipe} appForkCallback={this.forkRecipe}/>
        <ScheduleContainer />
       </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
