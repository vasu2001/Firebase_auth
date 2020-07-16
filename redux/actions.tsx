import {storeInterface, actionInterface, dispatchNames} from './utils';
import {Dispatch} from 'redux';
// import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firebase from 'firebase';

if (firebase.apps.length === 0)
  firebase.initializeApp({
    apiKey: 'AIzaSyB0-bel77kJwjEumjZBkZ8J1VTcj7X6EcQ',
    authDomain: 'react-native-auth-aba3a.firebaseapp.com',
    databaseURL: 'https://react-native-auth-aba3a.firebaseio.com',
    projectId: 'react-native-auth-aba3a',
    storageBucket: 'react-native-auth-aba3a.appspot.com',
    messagingSenderId: '677284630161',
    appId: '1:677284630161:web:5c635dc722a393265d3930',
    measurementId: 'G-X1Q3KELMXW',
  });

const signIn = (payload: object): actionInterface => {
  return {
    type: dispatchNames.signIn,
    payload,
  };
};

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

export const _SingUp = (dispatch: Dispatch) => async (
  email: string,
  password: string,
  name: string,
  callback: () => void,
): Promise<void> => {
  try {
    const userRes = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    console.log(userRes);

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
