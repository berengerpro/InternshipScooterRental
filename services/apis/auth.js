import firebase from '../firebase'

const loginFirebase = async ({ email, password }) => {
  const response = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)

  return response
}

const logoutFirebase = async () => {
  return firebase.auth().signOut()
}

export default {
  loginFirebase,
  logoutFirebase
}
