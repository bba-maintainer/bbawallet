import {createSlice} from '@reduxjs/toolkit';
import constants from '../config/constants';
import {IAppState} from '../types';

const initialState: IAppState = {
  theme: constants.THEME_LIGHT,
  session: {},
};

export const appSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    light: state => {
      state.theme = constants.THEME_LIGHT;
    },
    dark: state => {
      state.theme = constants.THEME_DARK;
    },
    setSession: (state, {payload}) => {
      state.session = payload;
    },
    resetDevice: state => {
      state.session = {};
    },
  },
});

export const {light, dark, setSession, resetDevice} = appSlice.actions;

export default appSlice.reducer;
