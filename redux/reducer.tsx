import {dispatchNames, storeInterface, actionInterface} from './utils';

const initialState: storeInterface = {isLoggedIn: false, user: null};

const MainReducer = (
  state: storeInterface = initialState,
  action: actionInterface,
): storeInterface => {
  console.log(action);

  switch (action.type) {
    case dispatchNames.signIn:
      return {
        isLoggedIn: true,
        user: action.payload,
      };

    case dispatchNames.changeName:
      let newState: storeInterface = {
        ...state,
      };
      newState.user ? (newState.user.name = action.payload.name) : null;
      return newState;

    case dispatchNames.logOut:
      return initialState;

    case dispatchNames.changePhoto:
      let newState2: storeInterface = {
        ...state,
      };
      newState2.user
        ? (newState2.user.profilePhoto = action.payload.uri)
        : null;
      return newState2;

    default:
      return state;
  }
};

export default MainReducer;
