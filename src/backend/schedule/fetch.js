import { scheduleRef } from "../../config/firebase";

// TODO error handling
export default (id) => {
    return new Promise(function (resolve, reject) {
        scheduleRef.child(id).once("value").then((snapshot) => {
        return resolve(snapshot.val());
    });
  });
};
