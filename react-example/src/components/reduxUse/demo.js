import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'counter/incremented':
      return { ...state, value: state.value + 1 };
    case 'counter/decremented':
      return { ...state, value: state.value - 1 };
    default:
      return state;
  }
}

const store = configureStore ({
  reducer: counterReducer,
});

store.subscribe(() => console.log(store.getState()));

const incrementAction = { type: 'counter/incremented' }
store.dispatch(incrementAction);

const decrementAction = { type: 'counter/decremented' }
store.dispatch(decrementAction);