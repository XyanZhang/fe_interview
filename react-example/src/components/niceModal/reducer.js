import { createSlice } from '@reduxjs/toolkit'

// 通过redux 的store 去储存每个对话框的状态和参数，两个action分别是显示和隐藏对话框 hiding：用来处理关闭过程的动画
const modalReducer = {
  ADD_ONE: (state, action) => {
    state.value += 1;
  },
  SHOW_MODAL: (state, action) => {
    console.log(action)
    const { modalId, args } = action.payload;
    console.log(state[modalId])
    state[modalId] = args || true;
    console.log(state[modalId])
    state.hiding&&(state.hiding[modalId] = false);
    state.value += 1;
  },
  HIDE_MODAL: (state, action) => {
    const { modalId, force } = action.payload;
    if(force) {
      state[modalId] = false;
      state.hiding&&(state.hiding[modalId] = false);
    } else {
      state.hiding&&(state.hiding[modalId] = true);
    }
    state.value -= 1;
  }
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    hiding: false,
    value: 1,
  },
  reducers: modalReducer
})
console.log(modalSlice)
// Action creators are generated for each case reducer function
export const { SHOW_MODAL, HIDE_MODAL, ADD_ONE } = modalSlice.actions


export default modalSlice.reducer;