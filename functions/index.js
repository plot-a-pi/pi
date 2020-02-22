const functions = require('firebase-functions');
const firebase = require('firebase');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

const dataPointCollection = db.collection('data-points');

exports.getDocs = functions.https.onRequest((req, res) => {
    dataPointCollection.get().then(docs => {
        res.send(docs)
    })
}

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
