import { scheduleRef } from "../../config/firebase";

// TODO error handling
export default () => {
    return new Promise(function (resolve, reject) {
        scheduleRef.once("value").then((snapshot) => {
        return resolve(snapshot.val());
    });
  });
};
