import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import App from './App';
import reducer from './context/reducer';
import './index.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
const store = configureStore({
  reducer: reducer,
  middleware: [thunk],
});

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
