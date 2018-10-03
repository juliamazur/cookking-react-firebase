import { FETCH_SCHEDULE_ITEM_LIST } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_SCHEDULE_ITEM_LIST:
        // console.log('Action FETCH_SCHEDULE_ITEM_LIST');
        // console.log(action.payload);
        return action.payload;
    default:
      return state;
  }
};
