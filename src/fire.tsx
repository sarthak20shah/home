import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyB_91dlUz8bNiG87rcsTtF0WQqKYLnspFI",
  authDomain: "my-app-6db6b.firebaseapp.com",
  projectId: "my-app-6db6b",
  storageBucket: "my-app-6db6b.appspot.com",
  messagingSenderId: "456879277442",
  appId: "1:456879277442:web:9d3c9dbfeb5f5dd7e13b9b",
  measurementId: "G-7M81WN2KRT",
};

const fire: firebase.app.App = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

export { fire, auth, database };
