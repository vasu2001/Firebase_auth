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
      const newState: storeInterface = {
        ...state,
      };
      newState.user ? (newState.user.name = action.payload.name) : null;
      return newState;

    case dispatchNames.logOut:
      return initialState;
    default:
      return state;
  }
};

export default MainReducer;
