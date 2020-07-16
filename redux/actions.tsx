import {
  storeInterface,
  actionInterface,
  dispatchNames,
  firebaseConfig,
} from './utils';
import {Dispatch} from 'redux';
// import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firebase from 'firebase';
import {Platform} from 'react-native';
import atob from 'atob';

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

const changeProfile = (): actionInterface => ({
  type: dispatchNames.changeProfile,
  payload: {},
});

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
    callback();
  }
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

export const _UploadProfile = (dispatch: Dispatch) => async (
  image: any,
  callback: () => void,
): Promise<void> => {
  try {
    // const res = await firebase
    //   .storage()
    //   .ref('img/aa.jpg')
    //   .putString(data.data, 'base64', {contentType: data.type});
    // dispatch(logOut());

    const {uri} = image;
    // const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const filename = 'a/aa.jpg';
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

    const arrayBuffer = _base64ToArrayBuffer(image.data);

    // const file = fs.readFileSync(uri);

    // const task = await firebase.storage().ref(filename).putFile(uploadUri);

    // console.log(task);
    // console.log(res);
  } catch (err) {
    console.log(err);
  }

  callback();
};

function _base64ToArrayBuffer(base64: string) {
  var binary_string = atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}
