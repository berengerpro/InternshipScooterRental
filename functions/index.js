const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.initUserCall = functions.https.onCall((data) => {
  const { email, name, uid } = data
  console.log(data)
  try {
    admin.firestore().collection('user').doc(uid).set({
      email,
      name,
      memberSince: new Date(),
      trips: 0,
      duration: 0,
      distance: 0
    })
  } catch (e) {
    console.log(e)
  }
})
