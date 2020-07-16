export const dispatchNames = {
  signIn: 'SIGNIN',
  changeName: 'CHANGE_NAME',
  logOut: 'LOGOUT',
  changeProfile: 'CHANGE_PROFILE',
};

export interface storeInterface {
  isLoggedIn: boolean;
  user: {
    name: string;
    email: string;
    profilePhoto: string;
    userId: string;
  } | null;
}

export interface actionInterface {
  type: string;
  payload?: any;
}

export const firebaseConfig = {
  apiKey: 'AIzaSyB0-bel77kJwjEumjZBkZ8J1VTcj7X6EcQ',
  authDomain: 'react-native-auth-aba3a.firebaseapp.com',
  databaseURL: 'https://react-native-auth-aba3a.firebaseio.com',
  projectId: 'react-native-auth-aba3a',
  storageBucket: 'react-native-auth-aba3a.appspot.com',
  messagingSenderId: '677284630161',
  appId: '1:677284630161:web:5c635dc722a393265d3930',
  measurementId: 'G-X1Q3KELMXW',
};
