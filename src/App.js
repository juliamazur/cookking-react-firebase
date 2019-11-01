import React, {Component} from "react";
import './App.css';

import {Button} from '@material-ui/core';

import {createMuiTheme} from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import Header from './components/Header';
import RecipeLibrary from "./components/RecipeLibrary";
// import RecipeListTabs from "./components/recipe_list/RecipeListTabs";
import RecipeLibraryModal from "./components/recipe_list/RecipeLibraryModal";
import Schedule from "./sites/Schedule";
// import ScheduleView from "./components/schedule/ScheduleView";
import ShoppingList from "./components/ShoppingList";
import RecipeListFab from './components/recipe_list/RecipeListFab';
import Modal from './components/Modal';
// import RecipeForm from './components/form/RecipeForm';
import RecipeFormModal from './components/modal/RecipeFormModal';
import ScheduleForm from './sites/ScheduleForm';
import CardBasic from './components/card/CardBasic';
import PaperContainer from './components/containers/PaperContainer';
import ScheduleSelect from "./components/schedule/ScheduleSelect";

import * as backend from './backend/';
import withFirebaseAuth from "react-with-firebase-auth";
import {firebaseAppAuth, firebaseUser} from './config/firebase'
import {providers} from './config/firebase'
import { userRef } from './config/firebase'

import md5 from "md5";
import firebase from "firebase/index";

// import withWidth, { isWidthUp } from '@material-ui/core/withWidth';


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
    this.setStateFromDB();
  }


   setStateFromDB() {
       try {
         firebase.auth().onAuthStateChanged(this.authHandler.bind(this));
       } catch (e) {
         this.logError(e);
       }
  }

  authHandler(user) {

    if (user) {
      backend.fetchUserDoc(user.uid).then((data) => {
        const newState = {uid: user.uid, name: user.displayName, ...data};
        this.setState(newState);
        // to have DB doc for new users thtat didnt do anything yet
        this.save(newState);
      });

      backend.fetchAllUserDocs().then((data) => {
        let allUsers = [];
        for(let uid in data) {
          let userDoc = data[uid];
          allUsers.push({uid: uid, name: userDoc.name});
        }
        this.setState({allUsers: allUsers});
      });
    } else {
      this.setState(this.INITIAL_STATE);
    }
}

  logError(e) {
    console.error(e.code + ' | ' + e.message);
  }

  async saveUserDocToDb() {
    const user = await this.getUser();
    if(!user.uid) {
      // @TODO handle errors, no user signed in etc
      return;
    }

    const stateToDb = {};
    stateToDb.uid = this.state.uid;
    stateToDb.name = this.state.name;
    stateToDb.activeScheduleId = this.state.activeScheduleId;
    stateToDb.userDoc = this.state.userDoc;

    userRef.child(user.uid).update(stateToDb);
    //userRef.push().set(this.state);
  }

  getUser() {
    // @TODO try catch
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          resolve(user);
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

    const activeSchedule = this.getActiveSchedule();
    const newColumns = this.getScheduleColumns(activeSchedule);
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
    if(!this.state.userDoc.schedules) {
      return '';
    }
    const schedules = this.state.userDoc.schedules;
    return schedules.find((v) => { return v.id ===  this.state.activeScheduleId });
  }

  getSchedules() {
    return this.state.userDoc.schedules ? this.state.userDoc.schedules.slice() : [];
  }

  getScheduleColumns(activeSchedule) {
    return activeSchedule.columns ? activeSchedule.columns : [];
  }

  handleRemoveItem(columnId, index) {
    const newSchedule = this.getActiveSchedule();
    const newScheduleColumn = newSchedule.columns.find((v) => { return v.id === columnId; });
    newScheduleColumn.items.splice(index, 1);

    this.saveActiveSchedule(newSchedule);
  }

  addToSchedule(id) {
    const activeSchedule = this.getActiveSchedule();
    const newColumns = activeSchedule.columns ? activeSchedule.columns : [];
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
    // @TODO dont save modalOpen, showOtherUserData etc.
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

  handleShowUserList() {
    const newState = {
      ...this.state,
      usersModalOpen: true
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

  handleUsersModalClose = () => {
    this.setState({usersModalOpen: false});
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

  async displayUserData(user) {
    // @TODO async await
    const data = await backend.fetchUserDoc(user.uid)
    const otherUserData = {uid: user.uid, name: data.name, userDoc: (data.userDoc ? data.userDoc : {})};
    this.setState({otherUserData: otherUserData, usersModalOpen: false});
  }

  displayMyData() {
    this.setState({otherUserData: ''});
  }

  getScheduleDashboard() {

    const uid = this.state.uid;
    const userDoc = this.state.userDoc;
    const scheduleId = this.state.activeScheduleId;

    const pick = (...props) => o => props.reduce((a, e) => ({ ...a, [e]: o[e] }), {});
    const scheduleList = userDoc.schedules ?
      this.state.userDoc.schedules.map(pick('id', 'name'))
      : [];

    return this.getScheduleComponent(uid, userDoc, scheduleId, scheduleList);
  }

  getOtherUserSchedule() {

    const uid = this.state.otherUserData.uid;
    const userDoc = this.state.otherUserData.userDoc ? this.state.otherUserData.userDoc : {};
    const scheduleId = this.state.otherUserData.userDoc ? this.state.otherUserData.userDoc.schedules[0].id : '';

    const pick = (...props) => o => props.reduce((a, e) => ({ ...a, [e]: o[e] }), {});
    const scheduleList = userDoc.schedules ?
      userDoc.schedules.map(pick('id', 'name'))
      : [];

    return this.getScheduleViewComponent(uid, userDoc, scheduleId, scheduleList);
  }

  getScheduleViewComponent(uid, userDoc, scheduleId, scheduleList) {

    return(
      <div>
      {/*<ScheduleSelect
        scheduleList={scheduleList}
        pickedScheduleId={scheduleId}
      />

      <ScheduleView
        key={uid}
        userDoc={userDoc}
        scheduleId={scheduleId}
      />
      */}
      </div>
    );
  }


  getScheduleComponent(uid, userDoc, scheduleId, scheduleList) {

    return(
      <div>
      <ScheduleSelect
        editable={true}
        scheduleList={scheduleList}
        pickedScheduleId={this.state.activeScheduleId ? this.state.activeScheduleId : ''}
        handleScheduleChange={this.handleScheduleChange.bind(this)}
        handleAddSchedule={this.handleScheduleModalOpen.bind(this)}
        handleDeleteSchedule={this.handleDeleteSchedule.bind(this)}
      />
      <Schedule
        key={uid}
        schedules={userDoc.schedules ? userDoc.schedules : []}
        recipes={userDoc.recipes ? userDoc.recipes : []}
        scheduleId={scheduleId}
        onDragEnd={this.onDragEnd}
        handleRemoveItem={this.handleRemoveItem}
        handleAddRecipeToColumn={this.handleAddRecipeToColumn}
      />
      </div>
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

  displayModal() {

    if(this.state.modalOpen) {
      return(
        <RecipeFormModal
          key={this.state.recipeToEditId}
          open={true}
          onClose={this.handleModalClose}
          recipe={this.getRecipeToEdit()}
          handleSubmit={this.saveRecipe.bind(this)}
        />
      );
    }

    if(this.state.scheduleModalOpen) {
      return(<Modal
        open={true}
        onClose={this.handleScheduleModalClose}
        handleSubmit={this.addSchedule}
        content={this.getScheduleForm()}
      />);
    }

    if(this.state.recipeListModalOpen) {
      return(<Modal
        open={true}
        onClose={this.handleRecipeListModalClose}
//            @TODO save button should be removed from this modal
        handleSubmit={this.addRecipeToSchedule}
        content={this.getRecipeModalList()}
        fullScreen={true}
      />);
    }

    if(this.state.usersModalOpen) {
      return(
        <Modal
          open={true}
          onClose={this.handleUsersModalClose}
          content={this.state.allUsers ?
            this.state.allUsers
            .map((user) => {
              return(<CardBasic key={user.uid} content={user.name} onClick={() => {this.displayUserData(user)}}/>)
            })
            : ''}
        />
      );
    }
  }


  getDashboard() {
    return(
      <div>
      <PaperContainer
        content={this.getScheduleDashboard()}
      />
      {this.getShoppingListComponent()}
      <RecipeLibrary
        recipeList={this.state.userDoc.recipes ? this.state.userDoc.recipes : []}
        handleDeleteRecipe={this.deleteRecipe}
        handleEditRecipe={this.editRecipe.bind(this)}
        handleAddToSchedule={this.addToSchedule}
        handleAvatarClick={this.changeAvatar}
      />
      <RecipeListFab
        onClick={this.handleModalOpen}
      />
      </div>
    );
  }

  getApp() {
    if(this.state.otherUserData) {
    return(<div>{this.displayOtherUserData()}</div>);
    }
    return(<div>{this.getDashboard()}</div>);
  }

  displayOtherUserData() {
    return this.getOtherUserSchedule();
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
        {/* @TODO dont show menu when user is logged out */}
          <Header
            user={user}
            uid={this.state.uid}
            signOut={() => {signOut().then(() => { this.setState(this.INITIAL_STATE)})}}
            signInWithGoogle={() => {signInWithGoogle().then(() => {this.setStateFromDB()})}}
            handleShowUserList={this.handleShowUserList.bind(this)}
            displayMyData={this.displayMyData.bind(this)}
          />
          {this.displayModal()}
          {user ? '' : this.getMainNotLoggedInPage()}
          {user ? this.getApp() : ''}
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
