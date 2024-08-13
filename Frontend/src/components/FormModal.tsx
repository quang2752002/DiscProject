import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
type ModalProps = {
  isOpen: boolean
  setModalIsOpen: (value: boolean) => void
}
const customStyles = {
  content: {
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '35%',
  },
}

const FormModal: React.FC<ModalProps> = ({ isOpen, setModalIsOpen }) => {
  const closeModal = () => {
    setModalIsOpen(false)
  }
  return (
    <div className="rounded shadow" style={{ zIndex: 10 }}>
      <Modal
        isOpen={isOpen}
        style={customStyles}
        contentLabel="Example Modal"
        className=""
      >
        <h4 className="text-center">New Disc</h4>
        <form>
          <div className="form-group mb-3">
            <label className="text-uppercase">Email address:</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mb-4">
            <label className="text-uppercase">Password:</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-outline-danger text-danger mx-2"
              onClick={() => {
                closeModal()
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-success border-0"
              style={{ backgroundColor: '#71DD37' }}
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default FormModal
