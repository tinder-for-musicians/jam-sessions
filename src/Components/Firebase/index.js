import firebase from "firebase/app";
import "firebase/storage";

const config = {
    apiKey: "AIzaSyBwxUrs5q5yvXKYapAXj9KPp2js4Dq71cU",
    authDomain: "group-jam-session.firebaseapp.com",
    databaseURL: "https://group-jam-session.firebaseio.com",
    projectId: "group-jam-session",
    storageBucket: "group-jam-session.appspot.com",
    messagingSenderId: "857866874420",
    appId: "1:857866874420:web:d1ea69ad8937cf326ca461",
    measurementId: "G-32XK9CM0GH"
  };



firebase.initializeApp(config);

const storage = firebase.storage();

export {
  storage, firebase as default
}
