import { combineReducers } from "redux";

import data from "./dataReducer";
import scheduleItemData from "./scheduleItemReducer";

export default combineReducers({
  data, scheduleItemData
});


// import { combineReducers } from "redux";
//
// import * as data from "./dataReducer";
// import * as scheduleItemData from "./scheduleItemReducer";
//
// const allReducers = Object.assign({}, data, scheduleItemData);
// const reducer = combineReducers(allReducers);
//
// export default reducer;
