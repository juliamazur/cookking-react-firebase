import { userRef } from "../../config/firebase";

// TODO error handling
export default () => {
    return new Promise(function (resolve, reject) {
        userRef.once("value").then((snapshot) => {
        return resolve(snapshot.val());
    });
  });
};
