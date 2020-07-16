import {
  storeInterface,
  actionInterface,
  dispatchNames,
  firebaseConfig,
} from './utils';
import {Dispatch} from 'redux';
// import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firebase from 'firebase';

if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);

const signIn = (payload: object): actionInterface => {
  return {
    type: dispatchNames.signIn,
    payload,
  };
};

const changeName = (name: string): actionInterface => {
  return {
    type: dispatchNames.changeName,
    payload: {name},
  };
};

const logOut = (): actionInterface => ({type: dispatchNames.logOut});

export const _SignIn = (dispatch: Dispatch) => async (
  email: string,
  password: string,
  callback: () => void,
): Promise<void> => {
  try {
    const userRes = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    // console.log(userRes);

    const dataRes = await firebase
      .database()
      .ref('Users/' + userRes?.user?.uid)
      .once('value');
    // console.log(dataRes.child('photoURL').exportVal());

    dispatch(
      signIn({
        userId: userRes?.user?.uid,
        email: userRes?.user?.email,
        name: dataRes.child('name').exportVal(),
        profilePhoto: dataRes.child('photoURL').exportVal(),
      }),
    );
  } catch (err) {
    console.log(err);
  }

  callback();
};

export const _SignUp = (dispatch: Dispatch) => async (
  email: string,
  password: string,
  name: string,
  callback: () => void,
): Promise<void> => {
  try {
    const userRes = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    // console.log(userRes);

    const ref = firebase.database().ref('Users/' + userRes?.user?.uid);
    await ref.child('name').set(name);

    dispatch(
      signIn({
        userId: userRes?.user?.uid,
        email: email,
        name: name,
        profilePhoto: null,
      }),
    );
  } catch (err) {
    console.log(err);
  }

  callback();
};

export const _ChangeName = (dispatch: Dispatch) => async (
  newName: string,
  callback: () => void,
  userId: string,
): Promise<void> => {
  try {
    await firebase.database().ref(`Users/${userId}/name`).set(newName);

    dispatch(changeName(newName));
  } catch (err) {
    console.log(err);
  }

  callback();
};

export const _LogOut = (dispatch: Dispatch) => async (
  callback: () => void,
): Promise<void> => {
  try {
    await firebase.auth().signOut();

    dispatch(logOut());
  } catch (err) {
    console.log(err);
  }

  callback();
};
