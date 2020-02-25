import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp({
  apiKey: 'AIzaSyCqogSdWZ-jW3hcCe-eljYKUL2Rsr6zVZo',
  authDomain: 'plot-a-pi.firebaseapp.com',
  databaseURL: 'https://plot-a-pi.firebaseio.com',
  projectId: 'plot-a-pi',
  storageBucket: 'plot-a-pi.appspot.com',
  messagingSenderId: '470192475850',
  appId: '1:470192475850:web:27390054dc9be10153ee33'
});

export const app = firebase;
export const firestore = app.firestore();

export const globalDataCollection = firestore.collection('data-points');
export const globalStatsCollection = firestore.collection('stats');
export const sessionDataCollection = firestore.collection('sessions');


export const auth = app.auth();
export const loginMethod = auth.signInWithPopup;
export const googleProvider = new firebase.auth.GithubAuthProvider();

export const loginWithProvider = () => {
  return firebase.auth().signInWithPopup(googleProvider);
};

export const subscribe = (fn, noUserFn) => firebase.auth().onAuthStateChanged(user => {
  if(user) {
    fn(user);
  } else {
    noUserFn && noUserFn();
  }
});

export const signOut = () => firebase.auth().signOut();
