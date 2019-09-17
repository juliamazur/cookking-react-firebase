import React, {Component} from "react";
import './App.css';

import {createMuiTheme} from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import Header from './components/Header';
import RecipeLibrary from "./components/RecipeLibrary";
import Schedule from "./sites/Schedule";
import ShoppingList from "./components/ShoppingList";
import AppSpeedDial from './components/AppSpeedDial';

import * as backend from './backend/';
import * as functions from './functions/';
import RecipeFormModal from "./sites/RecipeFormModal";

import withFirebaseAuth from "react-with-firebase-auth";

import {firebaseAppAuth, recipeRef} from './config/firebase'
import {providers} from './config/firebase'
import { userRef } from './config/firebase'

import md5 from "md5";


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#383950',
    },
    secondary: {
      main: '#383950',
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

  constructor() {
    super();
    this.handleNameInputChange = this.handleNameInputChange.bind(this);
    this.handleDescriptionInputChange = this.handleDescriptionInputChange.bind(this);
    this.handleIngredientNameInputChange = this.handleIngredientNameInputChange.bind(this);
    this.handleIngredientAmountInputChange = this.handleIngredientAmountInputChange.bind(this);
    this.handleIngredientUnitInputChange = this.handleIngredientUnitInputChange.bind(this);
    this.setType = this.setType.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.handleRemoveIngredient = this.handleRemoveIngredient.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.addToSchedule = this.addToSchedule.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleCopyItem = this.handleCopyItem.bind(this);
    this.handleAddRecipeToColumn = this.handleAddRecipeToColumn.bind(this);
  }

  // const
  // SCHEDULE = {
  //   name: 'Pierwszy',
  //   columns: [
  //     {
  //       id: 'column-0',
  //       items: [
  //         {id: 1, recipeId: '23940-3249-2'},
  //         {id: 2, recipeId: '23940-3249-3'}
  //       ]
  //     },
  //     {
  //       id: 'column-1',
  //       items: [
  //         {id: 4, recipeId: '23940-3249-2'}
  //       ],
  //     }
  //   ]
  // };
  //
  // const
  // USER_DOC = {
  //   name: 'Julia',
  //   recipes: [
  //     {
  //       'id': '23940-3249-3',
  //       'name': 'Zupa pomidorowa',
  //       'description': 'smaczna i zdrowa',
  //       'ingredients': [
  //         {
  //           'name': 'pomidory',
  //           'amount': '2',
  //           'unit': 'kg'
  //         },
  //         {
  //           'name': 'czosnek',
  //           'amount': '1',
  //           'unit': 'szt'
  //         }
  //       ]
  //     },
  //     {
  //       'id': '23940-3249-2',
  //       'name': 'Jajecznica',
  //       'description': ''
  //     },
  //     {
  //       'id': '23940-3249-22',
  //       'name': 'Owsianka',
  //       'description': ''
  //     }
  //   ],
  //   schedules: [
  //     this.SCHEDULE
  //   ]
  // };

  state = {
    modalOpen: false,
    recipeToEdit: {
      name: '',
      description: ''
    },
    ingredientToEdit: {
      name: '',
      amount: '',
      unit: ''
    },
    scheduleToEdit: false,
    userDoc: false
  };

  componentDidMount() {
    backend.fetchUserDoc('-Lo1M7ZO9pUTBJqekV5r').then((data) => {
      this.setState(data);
    });
  }

  saveUserDocToDb() {
    console.log(this.state);
    userRef.child('-Lo1M7ZO9pUTBJqekV5r').update(this.state);
    //userRef.push().set(this.state);
  }

  onDragEnd = result => {
    const {destination, source} = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let newColumns = this.state.scheduleToEdit.columns;
    let sourceColumn = newColumns.find((v) => {
      return v.id === source.droppableId
    });
    let sourceColumnItems = sourceColumn.items;
    const pickedItem = sourceColumnItems.splice(source.index, 1)[0];

    let destinationColumn = newColumns.find((v) => {
      return v.id === destination.droppableId
    });
    if(!destinationColumn) {
      newColumns.push({
        id: destination.droppableId
      });
      destinationColumn = newColumns.find((v) => {
        return v.id === destination.droppableId
      });
    }
    if(!destinationColumn.items) {
      destinationColumn.items = [];
    }
    const destinationColumnItems = destinationColumn.items;
    destinationColumnItems.splice(destination.index, 0, pickedItem);

    const newState = {
      ...this.state,
      scheduleToEdit: {
        ...this.state.scheduleToEdit,
        columns: newColumns,
      },
    };

    this.setState(newState, () => {
      this.saveUserDocToDb();
    });
  }

  handleCopyItem(columnId, index) {
    const newSchedule = {...this.state.scheduleToEdit};
    const newScheduleColumn = newSchedule.columns.find((v) => { return v.id === columnId; });
    const element = newScheduleColumn.items[index];
    newScheduleColumn.items.splice(index, 0, element);

    const newState = {
      ...this.state,
      scheduleToEdit: newSchedule
    };

    this.setState(newState, () => {
      this.saveUserDocToDb();
    });
  }

  handleRemoveItem(columnId, index) {
    const newSchedule = {...this.state.scheduleToEdit};
    const newScheduleColumn = newSchedule.columns.find((v) => { return v.id === columnId; });
    newScheduleColumn.items.splice(index, 1);

    const newState = {
      ...this.state,
      scheduleToEdit: newSchedule
    };

    this.setState(newState, () => {
      this.saveUserDocToDb();
    });
  }

  addToSchedule(id) {
    // @TODO ladniej
    let newColumns = this.state.scheduleToEdit.columns;
    let newColumn = newColumns.find((v) => {return v.id === 'column-0'});

    if(!newColumn.items) {
      newColumn.items = [];
    }

    const d = new Date();
    const newItem = {
      id: md5(d.getTime()),
      recipeId: id
    };

    newColumn.items.push(newItem);

    const newState = {
      ...this.state,
      scheduleToEdit: {
        ...this.state.scheduleToEdit,
        columns: newColumns,
      },
    };
    this.setState(newState).then(() => {
      this.saveUserDocToDb();
    });
  }

  handleAddRecipeToColumn(columnId) {
    const newState = {
      ...this.state,
      columnToAddId: columnId
    };
    this.setState(newState);
  }

  handleNameInputChange(event) {
    event.preventDefault();

    const newRecipe = {...this.state.recipeToEdit};
    newRecipe.name = event.target.value;

    const newState = {
      ...this.state,
      recipeToEdit: newRecipe
    };
    this.setState(newState);
  }

  handleDescriptionInputChange(event) {
    event.preventDefault();

    const newRecipe = {...this.state.recipeToEdit};
    newRecipe.description = event.target.value;

    const newState = {
      ...this.state,
      recipeToEdit: newRecipe
    };
    this.setState(newState);
  }

  setType(type) {
    const newRecipe = {...this.state.recipeToEdit};
    newRecipe.type = type;

    const newState = {
      ...this.state,
      recipeToEdit: newRecipe
    };
    this.setState(newState);
  }

  handleIngredientNameInputChange(event) {
    event.preventDefault();

    let newIngredient = this.state.ingredientToEdit;
    newIngredient.name = event.target.value;

    this.setState({
      ingredientToEdit: newIngredient,
    });
  }

  handleIngredientAmountInputChange(event) {
    event.preventDefault();

    let newIngredient = this.state.ingredientToEdit;
    newIngredient.amount = event.target.value;

    this.setState({
      ingredientToEdit: newIngredient,
    });
  }

  handleIngredientUnitInputChange(event) {
    event.preventDefault();

    let newIngredient = this.state.ingredientToEdit;
    newIngredient.unit = event.target.value;

    this.setState({
      ingredientToEdit: newIngredient,
    });
  }

  handleModalOpen = () => {
    this.setState({modalOpen: true});
  };

  handleModalClose = () => {
    this.setState({recipeToEdit: {}, modalOpen: false});
  };

  addRecipe() {

    if (!this.state.recipeToEdit.name) {
      return true;
    }

    //@TODO poprawic
    let newRecipe = this.state.recipeToEdit;
    let newUserDoc = this.state.userDoc;
    // this is existing recipe - edit it
    if(this.state.recipeToEdit.id) {
      let index = newUserDoc.recipes.findIndex((v) => { return v.id === newRecipe.id; });
      newUserDoc.recipes[index] = newRecipe;
    } else {
      // this is a new recipe - add it
      const d = new Date();
      newRecipe.id = md5(d.getTime());
      let newRecipes = newUserDoc.recipes ? newUserDoc.recipes : [];
      newRecipes.push(newRecipe);
      newUserDoc.recipes = newRecipes;
    }

    this.setState({userDoc: newUserDoc, recipeToEdit: {}, modalOpen: false}, () => {
      this.saveUserDocToDb();
    });
  }

  editRecipe(id) {
    const newRecipeToEdit = this.state.userDoc.recipes.find((v) => { return v.id === id; });
    this.setState({recipeToEdit: newRecipeToEdit});
    this.handleModalOpen();
  }

  addIngredient() {

    if (!this.state.ingredientToEdit.name) {
      return true;
    }

    let newRecipeToEdit = this.state.recipeToEdit;
    const d = new Date();
    let newIngredient = this.state.ingredientToEdit;
    newIngredient.id = md5(d.getTime());

    if (!newRecipeToEdit.ingredients) {
      newRecipeToEdit.ingredients = [];
    }
    newRecipeToEdit.ingredients.push(newIngredient);
    this.setState({recipeToEdit: newRecipeToEdit, ingredientToEdit: {}});
  }

  handleRemoveIngredient(index) {
    let newRecipeToEdit = this.state.recipeToEdit ? this.state.recipeToEdit : {};
    newRecipeToEdit.ingredients.splice(index, 1);

    const newState = {
      ...this.state,
      recipeToEdit: newRecipeToEdit
    };
    this.setState(newState, () => {
      this.saveUserDocToDb();
    });
  }

  deleteRecipe(id) {
    // @TODO ladniej

    // @TODO jesli jest w grafiku to poinformuj i nie usuwaj

    const newRecipes = this.state.userDoc.recipes.filter((r) => {
      return r.id !== id;
    });
    let newUserDoc = this.state.userDoc;
    newUserDoc.recipes = newRecipes;
    this.setState({userDoc: newUserDoc}, () => {
      this.saveUserDocToDb();
    });
  }

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
          {/*<RecipeLibrary*/}
            {/*recipeList={this.state.userDoc ? this.state.userDoc.recipes : []}*/}
            {/*handleDeleteRecipe={this.deleteRecipe}*/}
            {/*handleEditRecipe={this.editRecipe}*/}
            {/*handleAddToSchedule={this.addToSchedule}*/}
          {/*/>*/}
          <RecipeFormModal
            open={this.state.modalOpen}
            recipe={this.state.recipeToEdit}
            ingredient={this.state.ingredientToEdit}
            handleOpen={this.handleModalOpen}
            onClose={this.handleModalClose}
            handleNameInputChange={this.handleNameInputChange}
            handleDescriptionInputChange={this.handleDescriptionInputChange}
            handleIngredientNameInputChange={this.handleIngredientNameInputChange}
            handleIngredientAmountInputChange={this.handleIngredientAmountInputChange}
            handleIngredientUnitInputChange={this.handleIngredientUnitInputChange}
            handleAddIngredient={this.addIngredient}
            handleRemoveIngredient={this.handleRemoveIngredient}
            handleSubmit={this.addRecipe}
            setType={this.setType}
          />
          <Schedule
            recipes={this.state.userDoc ? this.state.userDoc.recipes : []}
            schedule={this.state.scheduleToEdit}
            allSchedules={this.state.userDoc ? this.state.userDoc.schedules : []}
            onDragEnd={this.onDragEnd}
            handleRemoveItem={this.handleRemoveItem}
            handleCopyItem={this.handleCopyItem}
            handleAddRecipeToColumn={this.handleAddRecipeToColumn}
          />
          <ShoppingList
            recipes={this.state.userDoc ? this.state.userDoc.recipes : []}
            schedule={this.state.scheduleToEdit}
          />
          <AppSpeedDial
            handleAddRecipe={this.handleModalOpen}
            zupa='dupa'
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

// export default withFirebaseAuth({
//   providers,
//   firebaseAppAuth,
// })(App);

export default App;
