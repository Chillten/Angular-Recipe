import * as AuthActions from './auth.actions';

export interface AuthState {
  token: string;
  authenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  authenticated: false
};


export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case (AuthActions.SIGHUP):
    case (AuthActions.SIGNIN):
      return {
        ...state,
        authenticated: true
      };
    case (AuthActions.LOGOUT):
      console.log('reducer logout');
      return {
        ...state,
        token: null,
        authenticated: false
      };
    case (AuthActions.SET_TOKEN):
      return {
        ...state,
        token: action.payload
      };
    default:
      return state;
  }
}
