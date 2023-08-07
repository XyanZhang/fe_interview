import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function showModal(modalId, args) {
  console.log(modalId)
  console.log('showModal', modalId, args);
  return {
    type: 'SHOW_MODAL',
    payload: { modalId, args }
  }
}
function hideModal(modalId, force) {
  return {
    type: 'HIDE_MODAL',
    payload: { modalId, force }
  }
}

export const useNiceModal = (modalId) => {
  const dispatch = useDispatch();
  const show = useCallback((args) => dispatch(showModal(modalId, args)), [dispatch, modalId]);
  const hide = useCallback((force) => dispatch(hideModal(modalId, force)), [dispatch, modalId]);
  const args = useSelector(state => state[modalId]);
  const hiding = useSelector(state => state.hiding && state.hiding[modalId]);
  return { args, hiding, visible:!!args, show, hide };
}

// renderProps, 组件作为参数传入，返回一个新的组件
export const createNiceModal = (modalId, ModalComponent) => {
  return (props) => {
    const { visible, args } = useNiceModal(modalId);
    console.log( visible, args )
    if(!visible) return null;
    return <ModalComponent {...props} {...args} />
  }
}

export default function NiceModal({ id, children, ...rest }) {
  return <div
      id={id}
      {...rest}
    >
    <p>nice modal</p>
    {children}
  </div>
}