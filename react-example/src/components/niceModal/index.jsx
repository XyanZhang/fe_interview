import React,{ useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NiceModal, { createNiceModal, useNiceModal } from './modal';
import { ADD_ONE } from './reducer';

const MyModal = createNiceModal("my_modal", () => {
  return (
    <NiceModal
      id="my_modal"
      title="My Modal"
    >
      Nice Modal
    </NiceModal>
  )
})


function NiceModalExample() {
  const modal = useNiceModal("my_modal");
  const value = useSelector(state => {
    console.log(state)
    // 注：这里的state是整个store的state，需要获取对应的reducer的state
    return state.modal.value
  });
  console.log(value)
  const dispatch = useDispatch();
  const addOne = useCallback(() => {
    dispatch(ADD_ONE())
  }, [dispatch])
  return (
    <>
      <button onClick={() => modal.show()}>
        show modal
      </button>
      <button onClick={() => modal.hide(true)}>
        hide modal
      </button>
      <button onClick={() => addOne()}>
        +1
      </button>
      <p>
        <span>{value}</span>
      </p>
      <MyModal />
    </>
  )
}

export default NiceModalExample