// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');

const cors = require('cors')({origin: true});

// const admin = require('firebase-admin');
// admin.initializeApp(functions.config().firebase);

// const firestore = functions.firestore;

// exports.onUserStatusChange = functions.database
//     .ref('.info/connected')
//     .onUpdate((event, context) => {

//         var db = admin.firestore();
//         var fieldValue = require("firebase-admin").firestore.FieldValue;

//         const usersRef = db.collection("users");
//         var snapShot = event.after;

//         return event.after.ref.once('value')
//             .then(statusSnap => snapShot.val())
//             .then(status => {
//                 if (status === 'offline'){
//                     usersRef
//                         .doc(context.params.userId)
//                         .set({
//                             online: false
//                         }, {merge: true});

//                 }
//                 return null;
//             })
// });

// 'use strict';

// const functions = require('firebase-functions');
// const admin = require('firebase-admin');

// // Follow instructions to set up admin credentials:
// // https://firebase.google.com/docs/functions/local-emulator#set_up_admin_credentials_optional
// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
//   // TODO: ADD YOUR DATABASE URL
//   databaseURL: undefined
// });

// const authenticate = async (req, res, next) => {
//   if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
//     res.status(403).send('Unauthorized');
//     return;
//   }
//   const idToken = req.headers.authorization.split('Bearer ')[1];
//   try {
//     const decodedIdToken = await admin.auth().verifyIdToken(idToken);
//     req.user = decodedIdToken;
//     next();
//     return;
//   } catch(e) {
//     res.status(403).send('Unauthorized');
//     return;
//   }
// };

exports.TestTrigger = functions.https.onRequest((request, response) => {
//     corsHandler(request, response, async () => {
//     //response.send("test");
//     response.status(200).json({ data: request.body });
//    });
    cors(request, response, async () => {
        response.status(200).json({ data: request })
    });
});