import {
  storeInterface,
  actionInterface,
  dispatchNames,
  firebaseConfig,
} from './utils';
import {Dispatch} from 'redux';
import {Platform} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import shortid from 'shortid';

// if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);

const signIn = (payload: storeInterface['user']): actionInterface => {
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

const changePhoto = (uri: string): actionInterface => ({
  type: dispatchNames.changePhoto,
  payload: {uri},
});

export const _SignIn = (dispatch: Dispatch) => async (
  email: string,
  password: string,
  callback: () => void,
): Promise<void> => {
  try {
    const userRes = await auth().signInWithEmailAndPassword(email, password);
    // .then((data) => console.log(data));
    console.log(userRes);

    const dataRes = await database()
      .ref('Users/' + userRes?.user?.uid)
      .once('value');
    console.log(dataRes.child('photoURL').exportVal());

    dispatch(
      signIn({
        userId: userRes?.user?.uid,
        email: userRes?.user?.email ?? '',
        name: dataRes.child('name').val(),
        profilePhoto: dataRes.child('photoURL').val()
          ? dataRes.child('photoURL').val()
          : null,
      }),
    );
  } catch (err) {
    console.log(err);
    callback();
  }
};

export const _SignUp = (dispatch: Dispatch) => async (
  email: string,
  password: string,
  name: string,
  callback: () => void,
): Promise<void> => {
  try {
    const userRes = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    // console.log(userRes);

    const ref = database().ref('Users/' + userRes?.user?.uid);
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
    callback();
  }
};

export const _ChangeName = (dispatch: Dispatch) => async (
  newName: string,
  callback: () => void,
  userId: string,
): Promise<void> => {
  try {
    await database().ref(`Users/${userId}/name`).set(newName);

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
    await auth().signOut();

    dispatch(logOut());
  } catch (err) {
    console.log(err);
  }

  callback();
};

export const _UploadProfile = (dispatch: Dispatch) => async (
  imagePath: string,
  userId: string,
  callback: () => void,
): Promise<void> => {
  try {
    const photoId = shortid.generate();

    const storageRef = storage().ref(`img/${photoId}`);
    await storageRef.putFile(imagePath);
    const urlRes = await storageRef.getDownloadURL();

    const databaseRef = database().ref('Users/' + userId);
    await databaseRef.child('photoURL').set(urlRes);

    dispatch(changePhoto(urlRes));
  } catch (err) {
    console.log(err);
  }
  callback();
};
