import { FETCH_RECIPE } from "../actions/types";
import { FETCH_RECIPE_LIST } from "../actions/types"; 

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_RECIPE:
      // console.log('Action FETCH_RECIPE');
      return action.payload;
    case FETCH_RECIPE_LIST:
        // console.log('Action FETCH_RECIPE_LIST');
      return action.payload;
    default:
      return state;
  }
};
