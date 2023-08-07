import { createSlice } from '@reduxjs/toolkit'

// 通过redux 的store 去储存每个对话框的状态和参数，两个action分别是显示和隐藏对话框 hiding：用来处理关闭过程的动画
const modalReducer = {
  SHOW_MODAL: (state, action) => {
    const { modalId, args } = action.payload;
    state[modalId] = args || true;
    state.hiding&&(state.hiding[modalId] = false);
  },
  HIDE_MODAL: (state, action) => {
    const { modalId, force } = action.payload;
    if(force) {
      state[modalId] = false;
      state.hiding&&(state.hiding[modalId] = false);
    } else {
      state.hiding&&(state.hiding[modalId] = true);
    }
  }
}

export const modalSlice = createSlice({
  name: 'my_modal',
  initialState: {
    hiding: false
  },
  reducers: modalReducer
})

// Action creators are generated for each case reducer function
export const { SHOW_MODAL, HIDE_MODAL } = modalSlice.actions


export default modalSlice.reducer;