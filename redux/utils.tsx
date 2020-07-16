export const dispatchNames = {
  signIn: 'SIGNIN',
  changeName: 'CHANGE_NAME',
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
