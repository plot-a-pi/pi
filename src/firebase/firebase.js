import firebase from 'firebase/app';
import 'firebase/firestore';

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
