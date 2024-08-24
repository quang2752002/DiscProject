import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
type ModalProps = {
  isOpen: boolean
  onClose: () => void
  onCreate?: () => void
  onUpdate?: () => void
  children: React.ReactNode
  update?: boolean
  noSubmitButton?: boolean
}
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '35%',
  },
}

const FormModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onCreate = () => {},
  onUpdate = () => {},
  children,
  update = false,
  noSubmitButton = false,
}) => {
  return (
    <div className="rounded shadow" style={{ zIndex: 10 }}>
      <Modal isOpen={isOpen} style={customStyles} contentLabel="Example Modal">
        <form>
          {children}

          <div className="d-flex justify-content-end">
            <button
              className="btn btn-outline-danger text-danger mx-2"
              onClick={() => {
                onClose()
              }}
            >
              Cancel
            </button>
            {!noSubmitButton && (
              <button
                type="button"
                className="btn btn-success border-0"
                style={{ backgroundColor: '#71DD37' }}
                onClick={() => {
                  !update ? onCreate() : onUpdate()
                }}
              >
                {!update ? 'Submit' : 'Update'}
              </button>
            )}
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default FormModal
