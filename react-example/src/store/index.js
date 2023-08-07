import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '../components/niceModal/reducer';

export const store = configureStore ({
  reducer: {
    modal: modalReducer,
    // 其他reducer
    // ...
  },
});