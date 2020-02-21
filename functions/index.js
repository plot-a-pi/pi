const functions = require('firebase-functions');
const admin = require('firebase-admin');
const globalServices = require('./services/postGlobal');

admin.initializeApp();

const dataPoints = admin.database().ref('dataPoints');
const globalMean = admin.database().ref('globalMean');
const { postToGlobalData } = globalServices;

exports.addGlobalDataPoint = functions.https.onRequest((req, res) => {
  return postToGlobalData(req,res, dataPoints);
})
