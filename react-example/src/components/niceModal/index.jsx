import React from 'react';
import NiceModal, { createNiceModal, useNiceModal } from './modal';

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

export default function NiceModalExample() {
  const modal = useNiceModal("my_modal");
  console.log(123)
  return (
    <>
      <button onClick={() => modal.show()}>
        show modal
      </button>
      <button onClick={() => modal.hide(true)}>
        hide modal
      </button>
      <MyModal />
    </>
  )
}