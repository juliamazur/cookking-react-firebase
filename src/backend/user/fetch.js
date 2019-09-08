import { userRef } from "../../config/firebase";

// TODO error handling
export default (id) => {
    return new Promise(function (resolve, reject) {
      userRef.child(id).once("value").then((snapshot) => {
        return resolve(snapshot.val());
    });
  });
};
