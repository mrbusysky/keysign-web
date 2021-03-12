import { Reducer } from 'redux';
import { AppInterface } from './types';
import * as actionTypes from './actionTypes';

const initalState: AppInterface = {
  isLoggedIn: false,
};

const AppReducer: Reducer<AppInterface> = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.APP_SET_LOGGED_IN:
      if (action.payload.isLoggedIn) return { ...state, isLoggedIn: true };
      return { ...state, isLoggedIn: false };
    default:
      return initalState;
  }
};

export default AppReducer;
