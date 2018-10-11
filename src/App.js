import React, { Component } from "react";
import './App.css';

import {createMuiTheme} from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import Header from './components/Header';
import RecipeForm from './components/RecipeForm';
import RecipeList from "./components/RecipeList";
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
    shoppingList: [],
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
                let shoppingList = this.state.shoppingList.slice();
                let columns = {...this.state.scheduleColumns};

                item.name = recipe.val().name;
                item.imageUrl = recipe.val().imageUrl;
                items.push(item);
                columns['column-0'].itemIds.push(item.id);

                const unique = (value, index, self) => {
                    return self.indexOf(value) === index;
                }

                this.setState({
                    scheduleItems: items,
                    scheduleColumns: columns,
                    shoppingList: shoppingList.concat(recipe.val().ingredients).filter(unique),
                });
            });
        });
        scheduleItemRef.on("child_removed", snapshot => {
            console.log('Schedule item removed: ' + snapshot.key);
            let items = this.state.scheduleItems.slice();
            this.setState({ scheduleItems: items.filter(el => el.id !== snapshot.key) });
            // TODO shopping list update
        });
    };

    handleScheduleItemDelete = id => (event) => {
        console.log('Schedule item will be removed: ' + id);
        scheduleItemRef.child(id).remove();
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
        <RecipeList
            recipeList={this.state.recipeList}
            appEditCallback={this.editRecipe}
            appForkCallback={this.forkRecipe}
        />
        <Schedule
            items={this.state.scheduleItems}
            columns={this.state.scheduleColumns}
            columnOrder={this.state.scheduleColumnOrder}
            onDragEnd={this.onScheduleDragEnd}
            handleItemDelete={this.handleScheduleItemDelete}
        />
        <ShoppingList
            shoppingList={this.state.shoppingList}
        />
       </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
