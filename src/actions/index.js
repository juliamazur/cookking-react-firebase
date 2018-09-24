import { recipeRef } from "../config/firebase";
import { todosRef } from "../config/firebase";
import { FETCH_RECIPE_LIST } from "./types";
import { FETCH_TODOS } from "./types";

export const addRecipe = newRecipe => async dispatch => {
  recipeRef.push().set(newRecipe);
};

export const deleteRecipe = id => async dispatch => {
  recipeRef.child(id).remove();
};

export const fetchRecipeList = () => async dispatch => {
  recipeRef.on("value", snapshot => {
    dispatch({
      type: FETCH_RECIPE_LIST, // @TODO powinno byc FETCH_RECIPE_LIST
      payload: snapshot.val()
    });
  });
  };


export const addToDo = newToDo => async dispatch => {
  todosRef.push().set(newToDo);
};

export const completeToDo = completeToDoId => async dispatch => {
  todosRef.child(completeToDoId).remove();
};

export const fetchToDos = () => async dispatch => {
  todosRef.on("value", snapshot => {
    dispatch({
      type: FETCH_TODOS,
      payload: snapshot.val()
    });
  });
};
