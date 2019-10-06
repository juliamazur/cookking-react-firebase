import React, {Component} from "react";
import './App.css';

import {createMuiTheme} from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import Header from './components/Header';
import RecipeLibrary from "./components/RecipeLibrary";
import RecipeLibraryModal from "./components/recipe_list/RecipeLibraryModal";
import Schedule from "./sites/Schedule";
import ShoppingList from "./components/ShoppingList";
import AppSpeedDial from './components/AppSpeedDial';
import Modal from './components/Modal';
import RecipeForm from './sites/RecipeForm';
import ScheduleForm from './sites/ScheduleForm';

import * as backend from './backend/';
// import * as functions from './functions/';
import withFirebaseAuth from "react-with-firebase-auth";
import {firebaseAppAuth, firebaseUser} from './config/firebase'
import {providers} from './config/firebase'
import { userRef } from './config/firebase'

import md5 from "md5";
import firebase from "firebase/index";


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#111',
    },
    secondary: {
      main: '#666',
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
    this.handleScheduleNameInputChange = this.handleScheduleNameInputChange.bind(this);
    this.handleNameInputChange = this.handleNameInputChange.bind(this);
    this.handleDescriptionInputChange = this.handleDescriptionInputChange.bind(this);
    this.handleIngredientNameInputChange = this.handleIngredientNameInputChange.bind(this);
    this.handleIngredientAmountInputChange = this.handleIngredientAmountInputChange.bind(this);
    this.handleIngredientUnitInputChange = this.handleIngredientUnitInputChange.bind(this);
    this.handleTypeInputChange = this.handleTypeInputChange.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.handleRemoveIngredient = this.handleRemoveIngredient.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.addSchedule = this.addSchedule.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.addToSchedule = this.addToSchedule.bind(this);
    this.changeAvatar = this.changeAvatar.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleCopyItem = this.handleCopyItem.bind(this);
    this.handleAddRecipeToColumn = this.handleAddRecipeToColumn.bind(this);
    this.handleScheduleChange = this.handleScheduleChange.bind(this);
  }

  const
  SCHEDULE = {
    name: 'Pierwszy',
    columns: [
      {
        id: 'column-0',
        items: [
          {id: 1, recipeId: '23940-3249-2'},
          {id: 2, recipeId: '23940-3249-3'}
        ]
      },
      {
        id: 'column-1',
        items: [
          {id: 4, recipeId: '23940-3249-2'}
        ],
      }
    ]
  };

  const
  USER_DOC = {
    name: 'Julia',
    recipes: [
      {
        'id': '23940-3249-3',
        'name': 'Zupa pomidorowa',
        'description': 'smaczna i zdrowa',
        'ingredients': [
          {
            'name': 'pomidory',
            'amount': '2',
            'unit': 'kg'
          },
          {
            'name': 'czosnek',
            'amount': '1',
            'unit': 'szt'
          }
        ]
      },
      {
        'id': '23940-3249-2',
        'name': 'Jajecznica',
        'description': ''
      },
      {
        'id': '23940-3249-22',
        'name': 'Owsianka',
        'description': ''
      }
    ],
    schedules: [
      this.SCHEDULE
    ]
  };

  state = {
    recipeToEdit: {
      name: '',
      description: ''
    },
    ingredientToEdit: {
      name: '',
      amount: '',
      unit: ''
    },
    userDoc: {}
  };

  componentDidMount() {
    //@TODO handle no logged user
    this.setStateFromDB();
    // this.setState({
    //   userDoc: this.USER_DOC
    // });
  }

  async setStateFromDB() {
    const uid = await this.getUid();
    if(!uid) {
      // @TODO handle errors, no user signed in etc
      return;
    }
    backend.fetchUserDoc(uid).then((data) => {
      this.setState(data);
    });
  }

  async saveUserDocToDb() {
    const uid = await this.getUid();
    if(!uid) {
      // @TODO handle errors, no user signed in etc
      return;
    }

    userRef.child(uid).update(this.state);
    //userRef.push().set(this.state);
  }


  getUid() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          resolve(user.uid);
        } else {
          // No user is signed in.
          // @TODO handle errors, no user signed in etc
          resolve();
        }
      });
    });
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

    const newColumns = this.getActiveScheduleColumns();
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

    this.saveScheduleColumns(newColumns);
  }

  saveActiveSchedule(newSchedule) {
    const schedules = this.getSchedules();
    schedules[this.state.activeScheduleId] = newSchedule;
    const newState = {
      ...this.state,
      userDoc: {...this.state.userDoc, schedules: schedules}
    };

    this.save(newState);
  }

  getSchedules() {
    return this.state.userDoc.schedules ? this.state.userDoc.schedules.slice() : [];
  }

  addSchedule() {
    const d = new Date();
    const id = md5(d.getTime());
    const newSchedule = {
      id: id,
      name: this.state.newScheduleName
    };

    const schedules = this.getSchedules();
    schedules.push(newSchedule);

    const newState = {
      ...this.state,
      newScheduleName: '',
      activeScheduleId: id,
      userDoc: {...this.state.userDoc, schedules: schedules}
    };

    this.save(newState);
    this.handleScheduleModalClose();
  }

  handleScheduleChange(event) {
    const newState = {
      ...this.state,
      activeScheduleId: event.target.value
    };
    this.save(newState);
  }

  saveScheduleColumns(newColumns) {
    const newSchedule = this.getActiveSchedule();
    newSchedule.columns = newColumns;

    this.saveActiveSchedule(newSchedule);
  }

  getActiveSchedule() {
    const schedules = this.getSchedules();
    return schedules.find((v) => { return v.id ===  this.state.activeScheduleId });
  }

  getActiveScheduleColumns() {
    const activeSchedule = this.getActiveSchedule();
    return activeSchedule.columns ? activeSchedule.columns : [];
  }

  handleCopyItem(columnId, index) {
    const newSchedule = this.getActiveSchedule();
    const newScheduleColumn = newSchedule.columns.find((v) => { return v.id === columnId; });
    const element = newScheduleColumn.items[index];
    newScheduleColumn.items.splice(index, 0, element);

    this.saveActiveSchedule(newSchedule);
  }

  handleRemoveItem(columnId, index) {
    const newSchedule = this.getActiveSchedule();
    const newScheduleColumn = newSchedule.columns.find((v) => { return v.id === columnId; });
    newScheduleColumn.items.splice(index, 1);

    this.saveActiveSchedule(newSchedule);
  }

  addToSchedule(id) {
    const newColumns = this.getActiveScheduleColumns();
    const columnId = this.state.columnToAddId ? this.state.columnToAddId : 'column-0';
    let newColumn = newColumns.find((v) => {return v.id === columnId});

    if(!newColumn) {
      newColumn = {
        id: columnId,
        items: []
      };
    }

    if(!newColumn.items) {
      newColumn.items = [];
    }

    const d = new Date();
    const newItem = {
      id: md5(d.getTime()),
      recipeId: id
    };

    newColumn.items.push(newItem);
    newColumns.push(newColumn);
    this.saveScheduleColumns(newColumns);
    this.handleRecipeListModalClose();
  }

  save(newState) {
    this.setState(newState, () => {
      this.saveUserDocToDb();
    });
  }

  handleAddRecipeToColumn(columnId) {
    const newState = {
      ...this.state,
      recipeListModalOpen: true,
      columnToAddId: columnId
    };
    this.setState(newState);
  }

  handleScheduleNameInputChange(event) {
    event.preventDefault();

    const newState = {
      ...this.state,
      newScheduleName: event.target.value
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

  handleTypeInputChange(event) {

    event.preventDefault();

    const newType = event.target.value;
    const newRecipe = {...this.state.recipeToEdit};
    newRecipe.type = newType;

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

  handleScheduleModalOpen = () => {
    this.setState({scheduleModalOpen: true});
  };

  handleScheduleModalClose = () => {
    this.setState({scheduleModalOpen: false});
  };

  handleRecipeListModalClose = () => {
    this.setState({recipeListModalOpen: false, columnToAddId: ''});
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

      if(!newRecipe.avatar) {
        newRecipe.avatar = this.getRandomAvatar();
      }

      let newRecipes = newUserDoc.recipes ? newUserDoc.recipes : [];
      newRecipes.push(newRecipe);
      newUserDoc.recipes = newRecipes;
    }

    // @TODO use save()
    this.setState({userDoc: newUserDoc, recipeToEdit: {}, modalOpen: false}, () => {
      this.saveUserDocToDb();
    });
  }


  changeAvatar(id) {

    const newUserDoc = {...this.state.userDoc};
    const newRecipe = newUserDoc.recipes.find((v) => { return v.id === id; });


    newRecipe.avatar = this.getRandomAvatar();
    const newState = {
      ...this.state,
      userDoc: newUserDoc
    };

    this.save(newState);
  }

  getRandomAvatar() {
    const images = ['jajo_a.png','kura_a.png','hamburger_a.png','pizza_a.png','marchewka_a.png','arbuz_a.png','wisnia_a.png','ciacho_a.png'];
    return images[Math.floor(Math.random()*images.length)];
  }

  editRecipe(id) {

    const newRecipeToEdit = this.state.userDoc.recipes.find((v) => { return v.id === id; });

    //@TODO - its temporary avatar setup
    if(!newRecipeToEdit.avatar) {
      newRecipeToEdit.avatar = this.getRandomAvatar();
    }

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

  getRecipeForm() {
    return (<RecipeForm
      recipe={this.state.recipeToEdit}
      ingredient={this.state.ingredientToEdit}
      handleNameInputChange={this.handleNameInputChange}
      handleDescriptionInputChange={this.handleDescriptionInputChange}
      handleIngredientNameInputChange={this.handleIngredientNameInputChange}
      handleIngredientAmountInputChange={this.handleIngredientAmountInputChange}
      handleIngredientUnitInputChange={this.handleIngredientUnitInputChange}
      handleAddIngredient={this.addIngredient}
      handleRemoveIngredient={this.handleRemoveIngredient}
      handleTypeChange={this.handleTypeInputChange}
    />);
  }

  getScheduleForm() {
    return (<ScheduleForm
      handleNameInputChange={this.handleScheduleNameInputChange}
      name={this.state.newScheduleName}
    />);
  }

  getRecipeModalList() {
    return(<RecipeLibraryModal
      recipeList={this.state.userDoc.recipes ? this.state.userDoc.recipes : []}
      handleDeleteRecipe={this.deleteRecipe}
      handleEditRecipe={this.editRecipe}
      handleAddToSchedule={this.addToSchedule}
      handleAvatarClick={this.changeAvatar}
    />);
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
          <Modal
            open={this.state.modalOpen ? this.state.modalOpen : false}
            onClose={this.handleModalClose}
            handleSubmit={this.addRecipe}
            content={this.getRecipeForm()}
          />
          <Modal
            open={this.state.scheduleModalOpen ? this.state.scheduleModalOpen : false}
            onClose={this.handleScheduleModalClose}
            handleSubmit={this.addSchedule}
            content={this.getScheduleForm()}
          />
          <Modal
            open={this.state.recipeListModalOpen ? this.state.recipeListModalOpen : false}
            onClose={this.handleRecipeListModalClose}
            handleSubmit={this.addRecipeToSchedule}
            content={this.getRecipeModalList()}
          />
          <Schedule
            recipes={this.state.userDoc.recipes ? this.state.userDoc.recipes : []}
            schedule={this.getActiveSchedule()}
            allSchedules={this.state.userDoc.schedules ? this.state.userDoc.schedules : []}
            onDragEnd={this.onDragEnd}
            handleRemoveItem={this.handleRemoveItem}
            handleCopyItem={this.handleCopyItem}
            handleAddRecipeToColumn={this.handleAddRecipeToColumn}
            handleScheduleChange={this.handleScheduleChange}
          />
          <ShoppingList
            recipes={this.state.userDoc.recipes ? this.state.userDoc.recipes : []}
            schedule={this.getActiveSchedule()}
          />
          <RecipeLibrary
            recipeList={this.state.userDoc.recipes ? this.state.userDoc.recipes : []}
            handleDeleteRecipe={this.deleteRecipe}
            handleEditRecipe={this.editRecipe}
            handleAddToSchedule={this.addToSchedule}
            handleAvatarClick={this.changeAvatar}
          />
          <AppSpeedDial
            handleAddRecipe={this.handleModalOpen}
            handleAddSchedule={this.handleScheduleModalOpen}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
  firebaseUser
})(App);

// export default App;
