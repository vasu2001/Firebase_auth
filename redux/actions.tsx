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
