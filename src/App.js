import React, {Component} from "react";
import './App.css';

import {Button} from '@material-ui/core';

import {createMuiTheme} from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import Header from './components/Header';
import RecipeLibrary from "./components/RecipeLibrary";
import RecipeListTabs from "./components/recipe_list/RecipeListTabs";
import RecipeLibraryModal from "./components/recipe_list/RecipeLibraryModal";
import Schedule from "./sites/Schedule";
import ShoppingList from "./components/ShoppingList";
import RecipeListFab from './components/recipe_list/RecipeListFab';
import Modal from './components/Modal';
import RecipeForm from './components/form/RecipeForm';
import RecipeFormModal from './components/modal/RecipeFormModal';
import ScheduleForm from './sites/ScheduleForm';

import * as backend from './backend/';
import withFirebaseAuth from "react-with-firebase-auth";
import {firebaseAppAuth, firebaseUser} from './config/firebase'
import {providers} from './config/firebase'
import { userRef } from './config/firebase'

import md5 from "md5";
import firebase from "firebase/index";

import withWidth, { isWidthUp } from '@material-ui/core/withWidth';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#111',
    },
    secondary: {
      main: '#eee',
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
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.addSchedule = this.addSchedule.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.addToSchedule = this.addToSchedule.bind(this);
    this.changeAvatar = this.changeAvatar.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
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

  const
  INITIAL_STATE = {
    recipeToEdit: {
      name: '',
      description: ''
    },
    ingredientToEdit: {
      name: '',
      amount: '',
      unit: ''
    },
    filterRecipeId: 0,
    recipeListFiltered: [],
    userDoc: {}
  };

  state = this.INITIAL_STATE;

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
      this.setState({uid: uid, ...data});
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

    if(!this.state.newScheduleName) {
      //@TODO show validation error
      return;
    }

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

  handleSubmitRecipe() {
    this.setState({submitRecipeForm: true, modalOpen: false});
  }

  saveRecipe(recipe) {

    const newUserDoc = {...this.state.userDoc};
    const newRecipes = newUserDoc.recipes ? newUserDoc.recipes.slice() : [];

    if(!recipe.avatar) {
      recipe.avatar = this.getRandomAvatar();
    }

    //@TODO check recipeToEditId instead?
    const currentRecipe = newRecipes.find((v) => { return v.id === recipe.id; });
    const currentRecipeIndex = newRecipes.findIndex((v) => { return v.id === recipe.id; });
    if(currentRecipe) {
      // this is existing recipe - overwrite it
      newRecipes[currentRecipeIndex] = recipe;
    } else
    {
      // this is a new recipe - add it
      const d = new Date();
      recipe.id = md5(d.getTime());
      newRecipes.push(recipe);
    }

    newUserDoc.recipes = newRecipes;

    // @TODO use save()
    this.setState({userDoc: newUserDoc, recipeToEditId: null, modalOpen: false}, () => {
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
    this.setState({recipeToEditId: id});
    this.handleModalOpen();
  }

  handleDeleteSchedule() {
    const schedules = this.getSchedules();
    const newSchedules = schedules.filter((v) => { return v.id !==  this.state.activeScheduleId });

    const newState = {
      ...this.state,
      userDoc: {...this.state.userDoc, schedules: newSchedules}
    };

    this.save(newState);
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
      handleEditRecipe={this.editRecipe.bind(this)}
      handleAddToSchedule={this.addToSchedule}
      handleAvatarClick={this.changeAvatar}
    />);
  }

  getRecipeToEdit() {

    //@TODO refactor
    const emptyRecipe = {
      name: '',
      description: '',
      ingredient: {
        name: '',
        amount: '',
        unit: ''
      },
      ingredients: []
    };

    const id = this.state.recipeToEditId;
    const recipes = this.state.userDoc.recipes ? this.state.userDoc.recipes : [];
    const recipe = recipes.find((v) => { return v.id === id; });

    return recipe ? recipe : emptyRecipe;
  }

  getScheduleComponent() {
    return(
      <Schedule
        key={this.state.uid}
        recipes={this.state.userDoc.recipes ? this.state.userDoc.recipes : []}
        schedule={this.getActiveSchedule()}
        allSchedules={this.state.userDoc.schedules ? this.state.userDoc.schedules : []}
        onDragEnd={this.onDragEnd}
        handleRemoveItem={this.handleRemoveItem}
        handleAddRecipeToColumn={this.handleAddRecipeToColumn}
        handleScheduleChange={this.handleScheduleChange}
        handleAddSchedule={this.handleScheduleModalOpen}
        handleDeleteSchedule={this.handleDeleteSchedule.bind(this)}
      />
    );
  }

  getShoppingListComponent() {
    return(
      <ShoppingList
        recipes={this.state.userDoc.recipes ? this.state.userDoc.recipes : []}
        schedule={this.getActiveSchedule()}
      />
    );
  }

  // Photo by Daria Shevtsova from Pexels
  // https://www.pexels.com/photo/woman-in-white-and-black-striped-sweatshirt-holding-filled-white-ceramic-bowl-923182/
  getMainNotLoggedInPage() {
    return(<div style={{
      backgroundImage: `url(${'/static/images/main.jpg'})`,
      backgroundSize: '100% auto',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      height: '100vh'
      }}>
      <div
        style={{
          color: '#fff',
          fontSize: '50px',
          fontFamily: 'Sacramento',
          textShadow: '2px 2px 5px #000',
          textAlign: 'center',
          paddingTop: '20%'
        }}
      >
      Co na obiad? To&nbsp;proste!</div>
      <Button
        onClick={this.props.signInWithGoogle}
        style={{
          display: 'block',
          margin: '30px auto',
          backgroundColor: 'black',
          color: 'white',
          padding: '15px 25px'
        }}
      >Zaloguj przez Google</Button>
      </div>);
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
            uid={this.state.uid}
            signOut={() => {signOut().then(() => { this.setState(this.INITIAL_STATE)})}}
            signInWithGoogle={() => {signInWithGoogle().then(() => {this.setStateFromDB()})}}
          />
          <RecipeFormModal
            key={this.state.recipeToEditId}
            open={this.state.modalOpen ? this.state.modalOpen : false}
            onClose={this.handleModalClose}
            recipe={this.getRecipeToEdit()}
            handleSubmit={this.saveRecipe.bind(this)}
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
//            @TODO save button should probably be removed from this modal
            handleSubmit={this.addRecipeToSchedule}
            content={this.getRecipeModalList()}
            fullScreen={true}
          />
          {/* @TODO check if user is logged in, dont use uid */}
          {this.state.uid ? '' : this.getMainNotLoggedInPage()}
          {this.state.uid ? this.getScheduleComponent() : ''}
          {this.state.uid ? this.getShoppingListComponent() : ''}
          {/*
          <RecipeLibrary
            recipeList={this.state.userDoc.recipes ? this.state.userDoc.recipes : []}
            handleDeleteRecipe={this.deleteRecipe}
            handleEditRecipe={this.editRecipe.bind(this)}
            handleAddToSchedule={this.addToSchedule}
            handleAvatarClick={this.changeAvatar}
          />
          */}
          {this.state.uid ?
            <RecipeListFab
              onClick={this.handleModalOpen}
            /> : ''}
        </MuiThemeProvider>
      </div>
    );
  }
}

// export default withWidth()(App);


export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
  firebaseUser
})(App);

// export default App;
