import React, { Component } from "react";
import './App.css';

import {createMuiTheme} from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import Header from './components/Header';
import RecipeForm from './sites/RecipeForm';

import RecipeLibrary from "./components/RecipeLibrary";
import Schedule from "./sites/Schedule";
import ShoppingList from "./components/ShoppingList";
import {recipeRef, scheduleItemRef} from "./config/firebase";
import initialScheduleData from './components/initial-data';

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
});

class App extends Component {

  defaultState = {
    pickedRecipe: null,
    pickedRecipeId: null,
    edit: false,
    fork: false,
    recipeList: {},
    scheduleItems: [],
    scheduleColumns: initialScheduleData.columns,
    scheduleColumnOrder: initialScheduleData.columnOrder,
  };

  state = this.defaultState;

  fetchRecipeList = () => {
      console.log('FETCH recipe list');
      backend.fetchRecipeList().then((data) => {
        this.setState({ recipeList: data });
      });
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

    onScheduleDragEnd = result => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = this.state.scheduleColumns[source.droppableId];
        const finish = this.state.scheduleColumns[destination.droppableId];

        if (start === finish) {
            const newItemIds = Array.from(start.itemIds);
            newItemIds.splice(source.index, 1);
            newItemIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                itemIds: newItemIds,
            };

            const newState = {
                ...this.state,
                scheduleColumns: {
                    ...this.state.scheduleColumns,
                    [newColumn.id]: newColumn,
                },
            };
            this.setState(newState);
            return;
        }

        const startitemIds = Array.from(start.itemIds);
        startitemIds.splice(source.index, 1);
        const newStart = {
            ...start,
            itemIds: startitemIds,
        };

        const finishitemIds = Array.from(finish.itemIds);
        finishitemIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            itemIds: finishitemIds,
        };

        const newState = {
            ...this.state,
            scheduleColumns: {
                ...this.state.scheduleColumns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };
        this.setState(newState);
        return;
    }

    fetchScheduleItems = () => {
        scheduleItemRef.on("child_added", snapshot => {
            let item = snapshot.val();
            item.id = snapshot.key;
            recipeRef.child(item.recipeId).once('value', recipe => {

                let items = this.state.scheduleItems.slice();
                let columns = {...this.state.scheduleColumns};

                item.recipe = recipe.val();
                items.push(item);
                columns['column-0'].itemIds.push(item.id);

                this.setState({
                    scheduleItems: items,
                    scheduleColumns: columns,
                });
            });
        });

        scheduleItemRef.on("child_removed", snapshot => {
            console.log('Schedule item removed: ' + snapshot.key);
            let items = this.state.scheduleItems.slice();
            this.setState({
                scheduleItems: items.filter(el => el.id !== snapshot.key),
            });
        });
    };

    handleScheduleItemDelete = id => (event) => {
        console.log('Schedule item will be removed: ' + id);
        scheduleItemRef.child(id).remove();
    };

    handleScheduleSave = name => (event) => {
        console.log('Schedule will be saved: ' + name);
        //scheduleRef.push().set(data);
    };

    handleScheduleDelete = id => (event) => {
        console.log('Schedule will be deleted: ' + id);
        //scheduleRef.child(id).remove();
    };

    componentDidMount() {
      this.fetchRecipeList();
      this.fetchScheduleItems();
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
            items={this.state.scheduleItems}
            recipeList={this.state.recipeList}
            columns={this.state.scheduleColumns}
            columnOrder={this.state.scheduleColumnOrder}
            onDragEnd={this.onScheduleDragEnd}
            handleItemDelete={this.handleScheduleItemDelete}
            handleSheduleSave={this.handleScheduleSave}
            appEditCallback={this.props.editRecipe}
            appForkCallback={this.props.forkRecipe}
        />
        <ShoppingList
            scheduleItems={this.state.scheduleItems}
            recipeList={this.state.recipeList}
        />
       </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
