import { recipeRef } from "../../config/firebase";

// TODO error handling
export default () => {
    return new Promise(function (resolve, reject) {
    recipeRef.once("value").then((snapshot) => {
        return resolve(snapshot.val());
    });
  });
};
