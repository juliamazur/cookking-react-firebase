import React, { Component } from "react";
import './App.css';

import {createMuiTheme} from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import Header from './components/Header';
import RecipeForm from './sites/RecipeForm';
import RecipeListTabs from "./components/RecipeListTabs";
import RecipeLibrary from "./components/RecipeLibrary";
import Schedule from "./components/Schedule";
import ShoppingList from "./components/ShoppingList";
import {recipeRef, scheduleItemRef} from "./config/firebase";
import initialScheduleData from './components/initial-data';


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
        recipeRef.on("value", snapshot => {
          const recipeList = snapshot.val();
            this.setState({
                recipeList: recipeList,
            });
        });
    };

  editRecipe = id => {
    console.log('EDIT recipe App: ', id);
    const pickedRecipe = {...this.state.recipeList[id]};
    this.setState({
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
      pickedRecipeId: id,
      pickedRecipe: pickedRecipe,
      edit: false,
      fork: true,
     });
  };


  clearForm = () => {
      this.setState({
          pickedRecipeId: null,
          pickedRecipe: null,
          edit: false,
          fork: false,
      });
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
            callbackClearForm={this.clearForm}
        />
          <RecipeLibrary
              recipeList={this.state.recipeList}
              appEditCallback={this.editRecipe}
              appForkCallback={this.forkRecipe}
          />
        <RecipeListTabs
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
