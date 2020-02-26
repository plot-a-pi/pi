import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp({
  apiKey: 'AIzaSyDM4044iZQzUk72ZYXJG44YufBvR2rOopY',
  authDomain: 'plot-a-pi-prod.firebaseapp.com',
  databaseURL: 'https://plot-a-pi-prod.firebaseio.com',
  projectId: 'plot-a-pi-prod',
  storageBucket: 'plot-a-pi-prod.appspot.com',
  messagingSenderId: '461662526878',
  appId: '1:461662526878:web:b22efb0205bd4f4df98a8f'
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
