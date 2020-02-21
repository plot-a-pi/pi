exports.postToGlobalData = async (req, res, data) => {
  if(req.method !== 'POST'){
    return res.status('401').json({
      message: 'POST method required, access denied'
    })
  }

  const snap = await data.get();
  const { size } = snap;

  data.push({
    pointId: size,
    ...req.body
  })

  return res.status('200').json({size, ...req.body})
};

// export const documentWriteListener = 
//     functions.firestore.document('collection/{documentUid}')
//     .onWrite((change, context) => {

//     if (!change.before.exists) {
//         // New document Created : add one to count

//         db.doc(docRef).update({numberOfDocs: FieldValue.increment(1)});

//     } else if (change.before.exists && change.after.exists) {
//         // Updating existing document : Do nothing

//     } 

//     }

// return;
// });
