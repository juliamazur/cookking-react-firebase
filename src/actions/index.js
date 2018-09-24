import { recipeRef } from "../config/firebase";
import { todosRef } from "../config/firebase";
import { FETCH_RECIPE } from "./types";
import { FETCH_RECIPE_LIST } from "./types";
import { FETCH_TODOS } from "./types";

export const addRecipe = newRecipe => async dispatch => {
  recipeRef.push().set(newRecipe);
};

export const deleteRecipe = id => async dispatch => {
  recipeRef.child(id).remove();
};

export const fetchRecipe = id => async dispatch => {
  recipeRef.child(id).on("value", snapshot => {
    console.log(snapshot.val());
    dispatch({
      type: FETCH_RECIPE,
      payload: snapshot.val()
    });
  });
};

export const fetchRecipeList = () => async dispatch => {
  recipeRef.on("value", snapshot => {
    dispatch({
      type: FETCH_RECIPE_LIST,
      payload: snapshot.val()
    });
  });
};

export const editRecipe = (id, data) => async dispatch => {
  recipeRef.child(id).update(data);
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
