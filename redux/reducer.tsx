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
    default:
      return state;
  }
};

export default MainReducer;
