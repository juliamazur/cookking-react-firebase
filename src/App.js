import React, {Component} from "react";
import './App.css';

import {Button} from '@material-ui/core';

import {createMuiTheme} from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import NetworkDetector from './components/NetworkDetector';


import Header from './components/Header';
import RecipeLibrary from "./components/RecipeLibrary";
// import RecipeListTabs from "./components/recipe_list/RecipeListTabs";
import RecipeLibraryModal from "./components/recipe_list/RecipeLibraryModal";
import Schedule from "./sites/Schedule";
import ScheduleView from "./components/schedule/ScheduleView";
import ShoppingList from "./components/ShoppingList";
import RecipeListFab from './components/recipe_list/RecipeListFab';
import Modal from './components/Modal';
// import RecipeForm from './components/form/RecipeForm';
import RecipeFormModal from './components/modal/RecipeFormModal';
import ScheduleForm from './sites/ScheduleForm';
import CardBasic from './components/card/CardBasic';
import PaperContainer from './components/containers/PaperContainer';
import ScheduleSelect from "./components/schedule/ScheduleSelect";

import PrivacyPolicy from "./components/PrivacyPolicy";

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
    this.addSchedule = this.addSchedule.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.addToSchedule = this.addToSchedule.bind(this);
    this.changeAvatar = this.changeAvatar.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleAddRecipeToColumn = this.handleAddRecipeToColumn.bind(this);
  }

  const
  DEFAULT_RECIPES = [
    {
      id: 1,
      name: 'Szakszuka',
      image: 'szakszuka.jpg',
      description: "Cebulę i czosnek zeszklić na oliwie. Dodać pomidory i sos sojowy, chwilę poddusić. \
        Wbić ostrożnie jajka, poczekać aż białko się zetnie, posolić, opruszyć fetą i listkami bazylii.",
      ingredients: [
        {id: 1, name: 'jajka', amount: '4', unit: 'szt'},
        {id: 2, name: 'czosnek', amount: '1', unit: 'ząbek'},
        {id: 3, name: 'cebula', amount: '1', unit: 'szt'},
        {id: 4, name: 'pomidory krojone', amount: '1', unit: 'puszka'},
        {id: 5, name: 'sos sojowy', amount: '2', unit: 'łyżki'},
        {id: 6, name: 'bazylia - świeże liście', amount: '1', unit: 'garść'},
        {id: 7, name: 'ser feta', amount: '1/2', unit: 'opakowania'}
      ]
    },
    {
      id: 2,
      name: 'Owsianka pieczona',
      image: 'oatmeal.jpg'
    },
    {
      id: 3,
      name: 'Bananowe pankejki',
      image: 'pancakes.jpg',
      description: "Banana rozgnieść widelcem, wymieszać dokładnie z jajkami. Patelnię rozgrzać, \
      posmarować masłem. Nakładać łyżką ciasto, formując niewielkie placuszki. Smażyć z dwóch stron, \
      uważając, żeby się nie przypaliły. \
      Można podać z owocami \
      i syropem klonowym albo miodem.",
      ingredients: [
        {id: 1, name: 'banan', amount: '1', unit: 'szt'},
        {id: 2, name: 'jajka', amount: '2', unit: 'szt'},
        {id: 3, name: 'maliny', amount: '10', unit: 'szt'},
        {id: 4, name: 'syrop klonowy', amount: '2', unit: 'łyżki'}
      ]
    },
    {
      id: 4,
      name: 'Spaghetti z pomidorami',
      image: 'spaghetti.jpg',
      description: 'Cebulę zeszklić na oliwie, dodać wyciśnięty przez praskę czosnek, pomidory. \
      Makaron ugotować wg przepisu na opakowaniu, do gotowania dodać łyżkę oliwy. Podawać z tartym parmezanem i bazylią.',
      ingredients: [
        {id: 1, name: 'makaron spaghetti', amount: '1/2', unit: 'opakowania'},
        {id: 2, name: 'pomidory krojone', amount: '1', unit: 'puszka'},
        {id: 3, name: 'cebula', amount: '1', unit: 'szt'},
        {id: 4, name: 'czosnek', amount: '2', unit: 'ząbki'},
        {id: 5, name: 'oliwa', amount: '50', unit: 'ml'},
        {id: 6, name: 'bazylia - świeże liście', amount: '1', unit: 'garść'},
        {id: 7, name: 'ser parmezan', amount: '50', unit: 'g'}
      ]
    },
    {
      id: 5,
      name: 'Pizza na tortilli',
      image: 'pizza.jpg',
      description: "Tortillę położyć na talerzu. Posmarować sosem pomidorowym, posypać serem i dodatkami. \
      Patelnię rozgrzać, zsunąć tortillę i podgrzewać, aż ser się rozpuści.",
      ingredients: [
        {id: 1, name: 'tortilla', amount: '1', unit: 'szt'},
        {id: 2, name: 'ser mozarella tarty', amount: '100', unit: 'g'},
        {id: 3, name: 'sos pomidorowy z bazylią', amount: '1/2', unit: 'słoika'},
        {id: 4, name: 'oliwki czarne', amount: '10', unit: 'szt'},
        {id: 5, name: 'fenkuł w oleju', amount: '2', unit: 'szt'},
      ]
    },
    {
      id: 6,
      name: 'Sałatka grecka',
      image: 'greek_salad.jpg',
      description: 'Warzywa i ser pokroić w grubą kostkę, wszystko wymieszać w misce.',
      ingredients: [
        {id: 1, name: 'pomidor', amount: '2', unit: 'szt'},
        {id: 2, name: 'papryka', amount: '1', unit: 'szt'},
        {id: 3, name: 'ogórek długi', amount: '1/2', unit: 'szt'},
        {id: 4, name: 'cebula (jeśli lubimy)', amount: '1/2', unit: 'szt'},
        {id: 5, name: 'oliwki czarne', amount: '10', unit: 'szt'},
        {id: 6, name: 'oliwa z oliwek', amount: '3', unit: 'łyżki'},
        {id: 7, name: 'ser feta', amount: '1/2', unit: 'opakowania'}
      ]
    },
    {
      id: 7,
      name: 'Łosoś pieczony',
      image: 'salmon.jpg',
      ingredients: [
        {id: 1, name: 'łosoś', amount: '300', unit: 'g'},
        {id: 2, name: 'papryka', amount: '1', unit: 'szt'},
        {id: 3, name: 'cukinia', amount: '1', unit: 'szt'},
        {id: 4, name: 'cebula', amount: '1', unit: 'szt'},
        {id: 5, name: 'czosnek', amount: '2', unit: 'ząbki'}
      ]
    },
    {
      id: 8,
      name: 'Jajecznica',
      image: 'jajecznica.jpeg'
    },
    {
      id: 9,
      name: 'Shake truskawkowy',
      image: 'shake_truskawkowy.jpeg',
      description: 'Wszystkie składniki zblendować.',
      ingredients: [
        {id: 1, name: 'kefir', amount: '900', unit: 'ml'},
        {id: 2, name: 'banan', amount: '1', unit: 'szt'},
        {id: 3, name: 'truskawki mrożone', amount: '1', unit: 'opakowanie'},
        {id: 4, name: 'cukier puder', amount: '50', unit: 'g'}
      ]
    },
    {
      id: 10,
      name: 'Shake jagodowy',
      image: 'shake_jagodowy.jpeg',
      description: 'Wszystkie składniki zblendować.',
      ingredients: [
        {id: 1, name: 'kefir', amount: '900', unit: 'ml'},
        {id: 2, name: 'banan', amount: '2', unit: 'szt'},
        {id: 3, name: 'jagody mrożone', amount: '1', unit: 'opakowanie'},
        {id: 4, name: 'cukier puder', amount: '50', unit: 'g'}
      ]
    },
    {
      id: 11,
      name: 'Shake matcha',
      image: 'shake_matcha.jpeg',
      description: 'Wszystkie składniki zblendować. Daktyle warto wcześniej namoczyć w gorącej wodzie.',
      ingredients: [
        {id: 1, name: 'kefir', amount: '900', unit: 'ml'},
        {id: 2, name: 'banan', amount: '2', unit: 'szt'},
        {id: 3, name: 'herbarta matcha', amount: '3', unit: 'łyżeczki'},
        {id: 4, name: 'daktyle', amount: '10', unit: 'szt'}
      ]
    }
  ];


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
    userDoc: {
      recipes: [],
      schedules: []
    }
  };

  state = this.INITIAL_STATE;

  componentDidMount() {
    try {
      firebase.auth().onAuthStateChanged(this.authHandler.bind(this));
    } catch (e) {
      this.logError(e);
    }
  }

  authHandler(user) {

    if (user) {
      backend.fetchUserDoc(user.uid).then((data) => {
        const newState = {uid: user.uid, name: '', ...data};
        // to have DB doc for new users that didnt do anything yet
        if(!newState.userDoc) {
          this.save(newState);
        } else {
          this.setState(newState);
        }
      });

      // backend.fetchAllUserDocs().then((data) => {
      //   let allUsers = [];
      //   for(let uid in data) {
      //     let userDoc = data[uid];
      //     allUsers.push({uid: uid, name: userDoc.name});
      //     // if(userDoc.userDoc && userDoc.userDoc.recipes) {
      //     //   userDoc.userDoc.recipes.forEach((item) => { console.log(item.name); });
      //     // }
      //     //console.log(userDoc.userDoc ? userDoc.userDoc.recipes : '');
      //   }
      //   this.setState({allUsers: allUsers});
      // });
    } else {
      this.setState(this.INITIAL_STATE);
    }
}

  logError(e) {
    console.error(e.code + ' | ' + e.message);
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

  handleOtherScheduleChange(event) {
    const newState = {
      ...this.state,
      otherScheduleId: event.target.value
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
    const COLUMN_ZERO = 'column-0';
    const columnToAddId = this.state.columnToAddId ? this.state.columnToAddId : COLUMN_ZERO;

    const d = new Date();
    const newItem = {
      id: md5(d.getTime()),
      recipeId: id
    };

    if(!activeSchedule.columns) {
      activeSchedule.columns = [];
    }

    let columnToAdd = activeSchedule.columns.find((v) => {return v.id === columnToAddId});
    if(!columnToAdd) {
      activeSchedule.columns.push({
        id: columnToAddId
      });
      columnToAdd = activeSchedule.columns.find((v) => {return v.id === columnToAddId});
    }

    if(!columnToAdd.items) {
      columnToAdd.items = [];
    }

    columnToAdd.items.push(newItem);

    this.saveScheduleColumns(activeSchedule.columns);
    this.handleRecipeListModalClose();
  }

  save(newState) {
    // @TODO dont save modalOpen, showOtherUserData etc.
    this.setState(newState);
    this.saveDocToDb(newState);
  }



  saveDocToDb(newState) {
    if(!newState.uid) {
      return;
    }

    let stateToDb = {};
    stateToDb.uid = newState.uid;
    if(newState.name) {
      stateToDb.name = newState.name;
    }
    if(newState.activeScheduleId !== undefined) {
      stateToDb.activeScheduleId = newState.activeScheduleId;
    }
    if(newState.userDoc) {
      stateToDb.userDoc = newState.userDoc;
    }

    this.updateUserRef(newState.uid, stateToDb);
  }

  async updateUserRef(uid, doc) {
    try {
      await userRef.child(uid).update(doc);
    } catch (error) {
      console.error(error);
    }
  }

// @TODO do wywalenia
  async saveUserDocToDb() {
    const user = await this.getUser();
    if(!user.uid || !this.state.uid) {
      // @TODO handle errors, no user signed in etc
      return;
    }

    const stateToDb = {};
    stateToDb.uid = this.state.uid;
    stateToDb.name = this.state.name;
    if(this.state.activeScheduleId) {
      stateToDb.activeScheduleId = this.state.activeScheduleId;
    }

    stateToDb.userDoc = this.state.userDoc;

    userRef.child(user.uid).update(stateToDb);
    //userRef.push().set(this.state);
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

  handlePrivacyPolicyModalOpen = () => {
    this.setState({privacyPolicyModalOpen: true});
  };

  handlePrivacyPolicyModalClose = () => {
    this.setState({privacyPolicyModalOpen: false});
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
      activeScheduleId: '',
      userDoc: {...this.state.userDoc, schedules: newSchedules}
    };

    this.save(newState);
  }

  deleteRecipe(id) {    
    // @TODO jesli jest w grafiku to poinformuj i nie usuwaj
    const newRecipes = this.state.userDoc.recipes.filter((r) => {
      return r.id !== id;
    });

    const newState = {
      ...this.state,
      userDoc: {...this.state.userDoc, recipes: newRecipes}
    };

    this.save(newState);
  }

  copyRecipe(recipe) {

    const newUserDoc = {...this.state.userDoc};
    const recipes = newUserDoc.recipes ? newUserDoc.recipes.slice() : [];

    // deep cloning, works if there are just strings, numbers and arrays
    const newRecipe = JSON.parse(JSON.stringify(recipe));

    const d = new Date();
    newRecipe.id = md5(d.getTime());
    recipes.push(newRecipe);


    const newState = {
      ...this.state,
      userDoc: {...this.state.userDoc, recipes: recipes}
    };

    this.save(newState);
  }

  getScheduleForm() {
    return (<ScheduleForm
      handleNameInputChange={this.handleScheduleNameInputChange}
      name={this.state.newScheduleName}
    />);
  }

  getRecipeModalList() {
    return(<RecipeLibraryModal
      open={true}
      title='Dodaj przepisy do jadłospisu'
      onClose={this.handleRecipeListModalClose}
      handleSubmit={this.addRecipesToSchedule.bind(this)}
      fullScreen={true}
      recipeList={this.state.userDoc.recipes ? this.state.userDoc.recipes : []}
      defaultRecipes={this.DEFAULT_RECIPES}
    />);
  }

  getPrivacyPolicy() {
    return (<PrivacyPolicy/>);
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

  addRecipesToSchedule(picked) {
    picked.map(item => {
      this.addToSchedule(item);
    });
  }

  // async displayUserData(user) {
  // }

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

  // getOtherUserSchedule() {

  //   if(!this.state.otherUserData.userDoc.schedules) {
  //     return '';
  //   }

  //   const uid = this.state.otherUserData.uid;
  //   const userDoc = this.state.otherUserData.userDoc ? this.state.otherUserData.userDoc : {};
  //   const scheduleId = this.state.otherScheduleId ? this.state.otherScheduleId : this.state.otherUserData.userDoc.schedules[0].id;

  //   const pick = (...props) => o => props.reduce((a, e) => ({ ...a, [e]: o[e] }), {});
  //   const scheduleList = userDoc.schedules ?
  //     userDoc.schedules.map(pick('id', 'name'))
  //     : [];

  //   return this.getScheduleViewComponent(uid, userDoc, scheduleId, scheduleList);
  // }

  getScheduleViewComponent(uid, userDoc, scheduleId, scheduleList) {

    return(
      <div>
      <ScheduleSelect
        scheduleList={scheduleList}
        pickedScheduleId={scheduleId}
        handleScheduleChange={this.handleOtherScheduleChange.bind(this)}
      />
      <ScheduleView
        key={uid}
        schedules={userDoc.schedules ? userDoc.schedules : []}
        recipes={userDoc.recipes ? userDoc.recipes : []}
        scheduleId={scheduleId}
      />
      </div>
    );
  }


  getScheduleComponent(uid, userDoc, scheduleId, scheduleList) {
    const recipes = this.DEFAULT_RECIPES.concat(userDoc.recipes);

      if(this.state.activeScheduleId) {
        return(
          <div>
           <h3 style={{padding: 15}}>mój jadłospis</h3>
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
            recipes={recipes}
            scheduleId={scheduleId}
            onDragEnd={this.onDragEnd}
            handleRemoveItem={this.handleRemoveItem}
            handleAddRecipeToColumn={this.handleAddRecipeToColumn}
          />
          </div>
        );
      } else {
        return this.getWelcomeComponent();
      }

  }

  getWelcomeComponent() {
    return(
      <div style={{textAlign: 'center', padding: 30}}>
        <h3>Dobrze Cię widzieć!</h3>
        <p style={{fontSize: '1.2em'}}>Jesteś o krok od ogarnięcia jadłospisu na ten tydzień :)</p>
        <p style={{fontSize: '1.2em'}}>Kliknij przycisk w prawym dolnym rogu, aby dodać przepis.</p>
        <p>
          <Button
          style={{
            margin: '30px',
            backgroundColor: 'black',
            color: 'white',
            padding: '15px 25px'
          }}
          onClick={this.handleScheduleModalOpen.bind(this)}>
            Nowy jadłospis
          </Button>
        </p>

      </div>
    );
  }

  getShoppingListComponent() {
    const userRecipes = this.state.userDoc.recipes ? this.state.userDoc.recipes.slice() : [];
    const recipes = this.DEFAULT_RECIPES.concat(userRecipes);
    const schedule = this.getActiveSchedule();
      if(schedule && recipes) {
      return(
        <ShoppingList
          recipes={recipes}
          schedule={schedule}
        />
      );
    } else {
      return('');
    }
  }

  // Photo by Daria Shevtsova from Pexels
  // https://www.pexels.com/photo/woman-in-white-and-black-striped-sweatshirt-holding-filled-white-ceramic-bowl-923182/
  getMainNotLoggedInPage() {
    return(
    <div>
    <div style={{
      backgroundImage: `url(${'/static/images/main.jpg'})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      height: '100vh' 
      }}>
      <div
        style={{
          /* color: '#fff', */
          fontSize: '50px',
          fontFamily: 'Sacramento',
          /* textShadow: '2px 2px 5px #000', */
          textAlign: 'center',
          /* paddingTop: '20%' */
          paddingTop: '5%'
        }}
      >
        <div
        style={{
          /* textAlign: 'center',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          margin: '10px auto',
          backgroundImage: `url(${'/static/images/main_mini.jpg'})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center center', */
        }}
      ></div>
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
      </div>
      <div style={{
        backgroundColor: '#000',
        fontSize: '11px',
        fontWeight: 'light',
        fontFamily: 'arial', 
        width: '100%',
        position: 'fixed', 
        bottom: 0, 
        textAlign: 'center', 
        color: '#fff'}}>
        <p>
          Twoje dane przetważane są zgodnie z 
          <span
            style={{color: 'red', cursor: 'pointer'}} 
            onClick={this.handlePrivacyPolicyModalOpen}> Polityką Prywatności</span>.
          Logując się do aplikacji, akceptujesz jej warunki.
        </p>
      </div>
      </div>
      );
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
      return this.getRecipeModalList();
    }

    if(this.state.privacyPolicyModalOpen) {
      return(<Modal
        open={true}
        onClose={this.handlePrivacyPolicyModalClose}
        content={this.getPrivacyPolicy()}
      />);
    }

    if(this.state.usersModalOpen) {
      // return(
      //   <Modal
      //     open={true}
      //     onClose={this.handleUsersModalClose}
      //     content={this.state.allUsers ?
      //       this.state.allUsers
      //       .map((user) => {
      //         return(<CardBasic key={user.uid} content={user.name} onClick={() => {this.displayUserData(user)}}/>)
      //       })
      //       : ''}
      //   />
      // );
    }
  }

  getRecipeLibrary() {
    if(this.state.userDoc.recipes && this.state.userDoc.recipes.length > 0) {
      return(<PaperContainer
        content={
          <RecipeLibrary
          recipeList={this.state.userDoc.recipes}
          handleDeleteRecipe={this.deleteRecipe.bind(this)}
          handleEditRecipe={this.editRecipe.bind(this)}
          handleAddToSchedule={this.addToSchedule}
          handleAvatarClick={this.changeAvatar}
        />}
      />);
    }

    return '';
  }

  getDefaultLibrary() {
      return(<PaperContainer
        content={
          <RecipeLibrary
          title="polecane"
          noEdit={true}
          recipeList={this.DEFAULT_RECIPES}
          handleCopyRecipe={this.copyRecipe.bind(this)}
        />}
      />);
  }


  getDashboard() {
    return(
      <div>
      <PaperContainer
        content={this.getScheduleDashboard()}
      />
      {this.getShoppingListComponent()}
      {this.getRecipeLibrary()}
      {this.getDefaultLibrary()}
      <RecipeListFab
        onClick={this.handleModalOpen}
      />
      </div>
    );
  }

  getApp() {
    // if(this.state.otherUserData) {
    // return(<div>{this.displayOtherUserData()}</div>);
    // }
    return(<div>{this.getDashboard()}</div>);
  }

  // displayOtherUserData() {
  //   return (<PaperContainer
  //       content={this.getOtherUserSchedule()}
  //     />);
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
        {/* @TODO dont show menu when user is logged out */}
          <Header
            user={user}
            uid={this.state.uid}
            signOut={() => {signOut().then(() => { this.setState(this.INITIAL_STATE)})}}
            signInWithGoogle={signInWithGoogle}
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
})(NetworkDetector(App));

// export default App;
