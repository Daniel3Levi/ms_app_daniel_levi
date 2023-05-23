import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';

const middleware = [thunkMiddleware];

const store = configureStore({
  reducer: reducer,
  middleware: middleware,
});

export default store;
