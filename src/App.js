import React, { Component } from "react";
import './App.css';

import {createMuiTheme} from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import Header from './components/Header';
// import RecipeForm from './sites/RecipeForm';

import RecipeLibrary from "./components/RecipeLibrary";
import Schedule from "./sites/Schedule";
import ShoppingList from "./components/ShoppingList";

import * as backend from './backend/';
import * as functions from './functions/';
import RecipeFormModal from "./sites/RecipeFormModal";

import withFirebaseAuth from "react-with-firebase-auth";

import { firebaseAppAuth } from './config/firebase'
import { providers } from './config/firebase'


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
      useNextVariants: true,
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
    pickedRecipe: {
        name: '',
        description: '',
        imageUrl: '',
        ingredient: '',
        ingredients: [],
        meal: '',
        meals: [],
        alert: null,
    },
    pickedRecipeId: null,
    edit: false,
    fork: false,
    recipeList: {},
    usedRecipes: [],
    modalOpen: false,
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
    this.handleModalOpen();
  };

  recipeFormAfterSubmit = () => {
      console.log('AFTER SUBMIT');
      this.setState( functions.clearRecipeForm() );
      this.fetchRecipeList();
  };

    handleModalOpen = () => {
        this.setState({ modalOpen: true });
    };

    handleModalClose = () => {
        this.setState({ modalOpen: false });
    };

    componentDidMount() {
      this.fetchRecipeList();
  }
  //
  // render() {
  //
  //   const {
  //     user,
  //     signOut,
  //     signInWithGoogle,
  //   } = this.props;
  //
  //   return (
  //     <div className="App">
  //       <header className="App-header">
  //
  //         {
  //           user
  //             ? <p>Hello, {user.displayName}</p>
  //             : <p>Please sign in.</p>
  //         }
  //         {
  //           user
  //             ? <button onClick={signOut}>Sign out</button>
  //             : <button onClick={signInWithGoogle}>Sign in with Google</button>
  //         }
  //       </header>
  //     </div>
  //   );
  // }

  render() {

      const {
        user,
        signOut,
        signInWithGoogle,
      } = this.props;


    return (
      <div className="App">
      <MuiThemeProvider theme={theme}>
        <Header
          user={user}
          signOut={signOut}
          signInWithGoogle={signInWithGoogle}
        />
          <RecipeFormModal
              open={this.state.modalOpen}
              handleOpen={this.handleModalOpen}
              handleClose={this.handleModalClose}
              id={this.state.pickedRecipeId}
              recipe={this.state.pickedRecipe}
              fork={this.state.fork}
              edit={this.state.edit}
              callbackAfterSubmit={this.recipeFormAfterSubmit}
          />

        {/*<RecipeForm*/}
              {/*id={this.state.pickedRecipeId}*/}
              {/*recipe={this.state.pickedRecipe}*/}
              {/*fork={this.state.fork}*/}
              {/*edit={this.state.edit}*/}
              {/*callbackAfterSubmit={this.recipeFormAfterSubmit}*/}
          {/*/>*/}
          {/*<RecipeLibrary*/}
              {/*recipeList={this.state.recipeList}*/}
              {/*appEditCallback={this.editRecipe}*/}
              {/*addRecipeCallback={this.handleModalOpen}*/}
          {/*/>*/}
        <Schedule
            recipeList={this.state.recipeList}
            usedRecipeListUpdate={this.usedRecipeListUpdate}
            editRecipe={this.editRecipe}
            handleModalOpen={this.handleModalOpen}
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

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
